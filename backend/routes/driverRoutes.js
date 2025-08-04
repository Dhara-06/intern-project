import express from "express";
import Driver from "../models/Driver.js";

const router = express.Router();

// Search drivers by location & availability
router.get("/search", async (req, res) => {
    try {
        const { location, availability } = req.query;

        // Build filter dynamically
        let filter = {};
        if (location) filter.location = { $regex: location, $options: "i" };
        if (availability) filter.availability = { $regex: availability, $options: "i" };

        const drivers = await Driver.find(filter);
        res.json(drivers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
