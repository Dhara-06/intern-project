import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    customerName: String,
    customerEmail: String,
    driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
    pickupLocation: String,
    destination: String,
    timeSlot: String,
    status: { type: String, default: "Pending" } // Pending, Confirmed, Declined
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
