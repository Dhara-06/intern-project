import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String
}, { timestamps: true });

export default mongoose.model("Feedback", feedbackSchema);
