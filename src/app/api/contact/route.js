import { connectToDatabase } from "@/lib/mongodb";
import Contact from "@/lib/models/Contact";

export async function POST(request) {
  try {
    await connectToDatabase();
    const { name, email, phone, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const contact = await Contact.create({ name, email, phone, subject, message });

    return Response.json({ success: true, contact }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
