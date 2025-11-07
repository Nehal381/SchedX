import mongoose from "mongoose";

const swapRequestSchema = new mongoose.Schema({
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  mySlot: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  theirSlot: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
  status: {
    type: String,
    enum: ["PENDING", "ACCEPTED", "REJECTED"],
    default: "PENDING",
  },
});

const SwapRequest = mongoose.model("SwapRequest", swapRequestSchema);
export default SwapRequest;
