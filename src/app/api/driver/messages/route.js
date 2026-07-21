import { connectToDatabase } from "@/lib/mongodb";
import { getAuthUser } from "@/lib/auth";
import { Conversation, Message } from "@/lib/models/Message";

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "driver") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const conversations = await Conversation.find({ participants: user._id })
      .populate("participants", "firstName lastName role avatar")
      .populate("shipment", "trackingId origin destination")
      .sort({ lastMessageTime: -1 });

    const convIds = conversations.map((c) => c._id);
    const lastMessages = await Message.aggregate([
      { $match: { conversation: { $in: convIds } } },
      { $sort: { createdAt: -1 } },
      { $group: { _id: "$conversation", text: { $first: "$text" } } },
    ]);
    const lastMsgMap = {};
    for (const lm of lastMessages) {
      lastMsgMap[lm._id.toString()] = lm.text;
    }

    const result = conversations.map((conv) => {
      const other = conv.participants.find((p) => p._id.toString() !== user._id.toString());
      return {
        _id: conv._id,
        otherUser: other,
        shipment: conv.shipment,
        lastMessage: lastMsgMap[conv._id.toString()] || conv.lastMessage,
        lastMessageTime: conv.lastMessageTime,
      };
    });

    return Response.json({ conversations: result });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "driver") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();
    const { receiverId, text, shipmentId } = await request.json();

    if (!receiverId || !text || !text.trim()) {
      return Response.json({ error: "Receiver and message text are required" }, { status: 400 });
    }

    let conversation = await Conversation.findOne({
      participants: { $all: [user._id, receiverId] },
      ...(shipmentId ? { shipment: shipmentId } : {}),
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [user._id, receiverId],
        shipment: shipmentId || undefined,
      });
    }

    const message = await Message.create({
      conversation: conversation._id,
      sender: user._id,
      text: text.trim(),
    });

    await Conversation.findByIdAndUpdate(conversation._id, {
      lastMessage: text.trim(),
      lastMessageTime: new Date(),
    });

    return Response.json({ message, conversation }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
