import express from "express";
import auth from "../middleware/auth.js";
import Event from "../models/Event.js";

const router = express.Router();

// ✅ Create Event
router.post("/", auth, async (req, res) => {
  try {
    const { title, startTime, endTime } = req.body;
    const event = new Event({
      title,
      startTime,
      endTime,
      userId: req.user.id,
      status: "BUSY",
    });
    await event.save();
    res.json(event);
  } catch (err) {
    console.error("Error creating event:", err);
    res.status(500).json({ message: "Error creating event" });
  }
});

// ✅ Get all events of a user
router.get("/", auth, async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user.id });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Error fetching events" });
  }
});

// ✅ Update an event (for making swappable)
router.put("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Error updating event" });
  }
});

// ✅ Marketplace Route (see other users' swappable events)
router.get("/marketplace", auth, async (req, res) => {
  try {
    console.log("📥 /marketplace hit by user:", req.user.id);
    const events = await Event.find({
      status: "SWAPPABLE",
      userId: { $ne: req.user.id },
    });
    console.log("📤 Marketplace events fetched:", events);
    res.json(events);
  } catch (err) {
    console.error("❌ Marketplace error:", err);
    res.status(500).json({ message: "Error fetching marketplace" });
  }
});

export default router;
