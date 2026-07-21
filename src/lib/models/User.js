import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["sender", "driver"], required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String, required: true },
    avatar: String,
    // Sender-specific
    company: String,
    // Driver-specific
    carrierType: { type: String, enum: ["independent", "fleet", "heavy-haul"] },
    licenseNumber: String,
    vehicleInfo: {
      make: String,
      model: String,
      year: String,
      plate: String,
      capacity: Number,
    },
    rating: { type: Number, default: 0 },
    totalDeliveries: { type: Number, default: 0 },
    onTimeRate: { type: Number, default: 0 },
    totalDistance: { type: Number, default: 0 },
    earnings: { type: Number, default: 0 },
    isOnline: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.models.User || mongoose.model("User", userSchema);
