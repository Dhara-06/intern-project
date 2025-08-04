import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const driverSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    experience: String,
    licenseNumber: String,
    vehicleInfo: String,
    availability: String,
    location: String
});

// Hash password before saving
driverSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

export default mongoose.model("Driver", driverSchema);
