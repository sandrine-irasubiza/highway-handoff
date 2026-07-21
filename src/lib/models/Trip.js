import mongoose from "mongoose";

const waypointSchema = new mongoose.Schema(
  {
    city: { type: String, required: true },
    state: { type: String, required: true },
    arrivalTime: Date,
    departureTime: Date,
    status: {
      type: String,
      enum: ["pending", "arrived", "departed"],
      default: "pending",
    },
  },
  { _id: false }
);

const tripSchema = new mongoose.Schema(
  {
    driver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    origin: { city: String, state: String },
    destination: { city: String, state: String },
    waypoints: [waypointSchema],
    date: Date,
    status: {
      type: String,
      enum: ["scheduled", "in_progress", "completed", "cancelled"],
      default: "scheduled",
    },
    earnings: { type: Number, default: 0 },
    distance: { type: Number, default: 0 },
    packages: { type: Number, default: 0 },
    shipment: { type: mongoose.Schema.Types.ObjectId, ref: "Shipment" },
    capacityAvailable: { type: Number, default: 0 },
  },
  { timestamps: true }
);

tripSchema.index({ driver: 1, date: -1 });
tripSchema.index({ "origin.city": 1, "destination.city": 1 });

export default mongoose.models.Trip || mongoose.model("Trip", tripSchema);
