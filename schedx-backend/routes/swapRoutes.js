import express from "express";
import auth from "../middleware/auth.js"; // ✅ FIXED: removed { }
import SwapRequest from "../models/SwapRequest.js";
import Event from "../models/Event.js";
import User from "../models/User.js";

const router = express.Router();

// ✅ POST /api/swap/request
router.post("/request", auth, async (req, res) => {
  try {
    const { mySlotId, theirSlotId } = req.body;

    const mySlot = await Event.findById(mySlotId);
    const theirSlot = await Event.findById(theirSlotId);

    if (!mySlot || !theirSlot)
      return res.status(404).json({ message: "Slot not found" });

    if (mySlot.status !== "SWAPPABLE" || theirSlot.status !== "SWAPPABLE")
      return res.status(400).json({ message: "Slots not swappable" });

    const swapRequest = new SwapRequest({
      fromUser: req.user.id,
      toUser: theirSlot.userId,
      mySlot: mySlotId,
      theirSlot: theirSlotId,
      status: "PENDING",
    });

    await swapRequest.save();

    mySlot.status = "SWAP_PENDING";
    theirSlot.status = "SWAP_PENDING";
    await mySlot.save();
    await theirSlot.save();

    res.json({ message: "Swap request created successfully" });
  } catch (err) {
    console.error("Error in swap request:", err);
    res.status(500).json({ message: "Error creating swap request" });
  }
});

// ✅ POST /api/swap/response/:id
router.post("/response/:id", auth, async (req, res) => {
  try {
    const { accept } = req.body;
    const swapRequest = await SwapRequest.findById(req.params.id)
      .populate("mySlot")
      .populate("theirSlot");

    if (!swapRequest)
      return res.status(404).json({ message: "Swap request not found" });

    if (swapRequest.status !== "PENDING")
      return res.status(400).json({ message: "Request already handled" });

    const mySlot = swapRequest.mySlot;
    const theirSlot = swapRequest.theirSlot;

    if (accept) {
      const tempUser = mySlot.userId;
      mySlot.userId = theirSlot.userId;
      theirSlot.userId = tempUser;
      mySlot.status = "BUSY";
      theirSlot.status = "BUSY";
      swapRequest.status = "ACCEPTED";
      await mySlot.save();
      await theirSlot.save();
    } else {
      mySlot.status = "SWAPPABLE";
      theirSlot.status = "SWAPPABLE";
      swapRequest.status = "REJECTED";
      await mySlot.save();
      await theirSlot.save();
    }

    await swapRequest.save();
    res.json({ message: `Swap ${accept ? "accepted" : "rejected"} successfully` });
  } catch (err) {
    console.error("Error in swap response:", err);
    res.status(500).json({ message: "Error responding to swap request" });
  }
});

// ✅ GET /api/swap (to view all incoming and outgoing requests)
router.get("/", auth, async (req, res) => {
  try {
    const incoming = await SwapRequest.find({ toUser: req.user.id })
      .populate("mySlot theirSlot fromUser toUser");
    const outgoing = await SwapRequest.find({ fromUser: req.user.id })
      .populate("mySlot theirSlot fromUser toUser");

    res.json({ incoming, outgoing });
  } catch (err) {
    console.error("Error fetching requests:", err);
    res.status(500).json({ message: "Error fetching requests" });
  }
});

export default router;
