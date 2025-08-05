import express from "express";
import Feedback from "../models/Feedback.js";
import { protect } from "../middleware/authMiddleware.js"; // Assuming this exists to protect routes

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { bookingId, driverId, rating, comment } = req.body;


  try {
    const feedback = new Feedback({
      bookingId,
      driverId,
      customerId: req.user.id, 
      rating,
      comment
    });
    await feedback.save();
    res.json({ message: "Feedback submitted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
