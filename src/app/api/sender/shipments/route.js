import { connectToDatabase } from "@/lib/mongodb";
import { getAuthUser } from "@/lib/auth";
import Shipment from "@/lib/models/Shipment";

export async function GET(request) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "sender") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = request.nextUrl;
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 10;

    const query = { sender: user._id };
    if (status && status !== "All Shipments") {
      const statusMap = {
        "Active": { $in: ["accepted", "picked_up", "in_transit"] },
        "Pending Pickup": "accepted",
        "Completed": "delivered",
        "Cancelled": "cancelled",
      };
      if (statusMap[status]) query.status = statusMap[status];
    }

    const total = await Shipment.countDocuments(query);

    const allShipments = await Shipment.find({ sender: user._id })
      .select("status")
      .lean();

    const shipments = await Shipment.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("driver", "firstName lastName rating");

    const transformed = shipments.map((s) => ({
      ...s.toObject(),
      assignedDriver: s.driver
        ? {
            name: `${s.driver.firstName || ""} ${s.driver.lastName || ""}`.trim(),
            rating: s.driver.rating,
          }
        : null,
    }));

    return Response.json({
      shipments: transformed,
      allShipments,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== "sender") {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const body = await request.json();
    const { origin, destination, packageInfo, timing } = body;

    if (!origin?.city || !origin?.state) {
      return Response.json({ error: "Origin city and state are required" }, { status: 400 });
    }
    if (!destination?.city || !destination?.state) {
      return Response.json({ error: "Destination city and state are required" }, { status: 400 });
    }
    if (!packageInfo?.type || !packageInfo?.weight) {
      return Response.json({ error: "Package type and weight are required" }, { status: 400 });
    }
    if (!timing?.pickupDate) {
      return Response.json({ error: "Pickup date is required" }, { status: 400 });
    }

    const trackingId = `HHF-${Date.now().toString(36).toUpperCase()}`;

    const shipment = await Shipment.create({
      sender: user._id,
      trackingId,
      origin,
      destination,
      packageInfo,
      timing,
      notes: body.notes,
      pricing: body.pricing || { amount: 0 },
    });

    return Response.json({ shipment }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
