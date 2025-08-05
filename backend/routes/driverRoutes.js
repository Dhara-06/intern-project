import express from "express";
import Driver from "../models/Driver.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router = express.Router();
import dotenv from "dotenv";

dotenv.config();
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

router.get("/getAll", async (req, res) => {
    try {
        const drivers = await Driver.find();
        res.json(drivers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const driver = await Driver.findOne({ email });
        if (!driver) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, driver.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Create JWT Token
        const token = jwt.sign(
            { id: driver._id, role: "driver", name: driver.name },
            process.env.JWT_SECRET, // replace with env var
            { expiresIn: "1d" }
        );

        res.json({
            token,
            role: "driver",
            name: driver.name,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
