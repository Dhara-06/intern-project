import express from "express";
import Booking from "../models/Booking.js";
import Driver from "../models/Driver.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create booking
router.post("/", async (req, res) => {
    try {
        const { customerName, customerEmail, driverId, pickupLocation, destination, timeSlot } = req.body;

        const driver = await Driver.findById(driverId);
        if (!driver) return res.status(404).json({ error: "Driver not found" });

        const booking = new Booking({ customerName, customerEmail, driverId, pickupLocation, destination, timeSlot });
        await booking.save();

        res.json({ message: "Booking request sent!", booking });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Driver confirm/decline booking
router.put("/:id/status", async (req, res) => {
    try {
        const { status } = req.body; // Confirmed or Declined
        const booking = await Booking.findByIdAndUpdate(req.params.id, { status }, { new: true });
        res.json(booking);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get bookings for a specific driver
router.get("/driver/:driverId", async (req, res) => {
    try {
        const bookings = await Booking.find({ driverId: req.params.driverId }).populate("driverId", "name email");
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get bookings for logged-in driver
router.get("/driver", protect, async (req, res) => {
    if (req.user.role !== "driver") {
        return res.status(403).json({ error: "Access denied" });
    }
    try {
        const bookings = await Booking.find({ driverId: req.user.id }).populate("driverId", "name email");
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Get bookings for logged-in customer
router.get("/customer", protect, async (req, res) => {
    if (req.user.role !== "customer") {
        return res.status(403).json({ error: "Access denied" });
    }
    try {
        const bookings = await Booking.find({ customerEmail: req.user.email })
            .populate("driverId", "name email");
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




export default router;
