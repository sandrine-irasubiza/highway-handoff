import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: "Conversation", required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    status: { type: String, enum: ["sent", "delivered", "read"], default: "sent" },
  },
  { timestamps: true }
);

const conversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    lastMessage: String,
    lastMessageTime: Date,
    shipment: { type: mongoose.Schema.Types.ObjectId, ref: "Shipment" },
  },
  { timestamps: true }
);

export const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);
export const Conversation =
  mongoose.models.Conversation || mongoose.model("Conversation", conversationSchema);
