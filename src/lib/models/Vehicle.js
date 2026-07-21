import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    driver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    year: String,
    plate: { type: String, required: true },
    capacity: Number,
    maxWeight: { type: Number, default: 0 },
    dimensions: {
      length: { type: Number, default: 0 },
      width: { type: Number, default: 0 },
      height: { type: Number, default: 0 },
    },
    fuelLevel: { type: Number, default: 100 },
    engineHealth: { type: Number, default: 100 },
    lastMaintenance: Date,
    nextMaintenanceKm: Number,
    status: {
      type: String,
      enum: ["active", "maintenance", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Vehicle || mongoose.model("Vehicle", vehicleSchema);
