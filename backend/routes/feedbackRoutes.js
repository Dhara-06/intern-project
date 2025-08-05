import express from "express";
import Feedback from "../models/Feedback.js";
import Booking from "../models/Booking.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add feedback (customer only)
router.post("/", protect, async (req, res) => {
    try {
        if (req.user.role !== "customer") {
            return res.status(403).json({ error: "Access denied" });
        }

        const { bookingId, rating, comment } = req.body;

        const booking = await Booking.findById(bookingId);
        if (!booking || booking.customerEmail !== req.user.email) {
            return res.status(404).json({ error: "Booking not found or unauthorized" });
        }

        const existing = await Feedback.findOne({ bookingId });
        if (existing) {
            return res.status(400).json({ error: "Feedback already submitted for this booking." });
        }

        const feedback = new Feedback({
            bookingId,
            customerId: req.user.id,
            driverId: booking.driverId,
            rating,
            comment,
        });

        await feedback.save();
        res.status(201).json({ message: "Feedback submitted", feedback });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get feedback for a specific driver
router.get("/driver/:driverId", async (req, res) => {
    try {
        const feedbacks = await Feedback.find({ driverId: req.params.driverId }).populate("customerId", "name");
        res.json(feedbacks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get("/booking/:bookingId", async (req, res) => {
    try {
        const feedback = await Feedback.findOne({ bookingId: req.params.bookingId })
            .populate("customerId", "name email");
        
        if (!feedback) return res.status(404).json({ message: "No feedback found" });

        res.json(feedback);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
