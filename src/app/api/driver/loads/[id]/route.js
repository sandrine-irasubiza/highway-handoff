import { connectToDatabase } from "@/lib/mongodb";
import { requireAuth } from "@/lib/auth";
import Shipment from "@/lib/models/Shipment";

export async function GET(request, { params }) {
  try {
    const auth = await requireAuth("driver");
    if (auth.error) return Response.json({ error: auth.error }, { status: auth.status });

    const { id } = await params;
    await connectToDatabase();

    const shipment = await Shipment.findById(id).populate("sender", "firstName lastName company rating phone");

    if (!shipment) return Response.json({ error: "Not found" }, { status: 404 });

    return Response.json({ shipment });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
