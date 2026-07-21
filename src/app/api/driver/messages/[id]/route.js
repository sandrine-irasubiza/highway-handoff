import { connectToDatabase } from "@/lib/mongodb";
import { getAuthUser } from "@/lib/auth";
import { Conversation, Message } from "@/lib/models/Message";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const user = await getAuthUser();
    if (!user || user.role !== "driver") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const conversation = await Conversation.findOne({
      _id: id,
      participants: user._id,
    }).populate("participants", "firstName lastName role avatar");

    if (!conversation) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }

    const messages = await Message.find({ conversation: id })
      .sort({ createdAt: 1 })
      .populate("sender", "firstName lastName");

    return Response.json({ conversation, messages });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const user = await getAuthUser();
    if (!user || user.role !== "driver") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const conversation = await Conversation.findOne({
      _id: id,
      participants: user._id,
    });

    if (!conversation) {
      return Response.json({ error: "Conversation not found" }, { status: 404 });
    }

    const { text } = await request.json();
    if (!text || !text.trim()) {
      return Response.json({ error: "Message text is required" }, { status: 400 });
    }

    const message = await Message.create({
      conversation: conversation._id,
      sender: user._id,
      text: text.trim(),
    });

    await Conversation.findByIdAndUpdate(id, {
      lastMessage: text.trim(),
      lastMessageTime: new Date(),
    });

    return Response.json({ message }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
