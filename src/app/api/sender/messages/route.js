import { connectToDatabase } from "@/lib/mongodb";
import { getAuthUser } from "@/lib/auth";
import { Conversation, Message } from "@/lib/models/Message";

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "sender") {
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
