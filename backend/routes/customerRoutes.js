
import express from 'express';
import Customer from '../models/Customer.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
const router = express.Router();

dotenv.config();
// POST /api/customer/login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const customer = await Customer.findOne({ email });
        if (!customer) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Create JWT Token
        const token = jwt.sign(
            { id: customer._id, role: "customer", name: customer.name,email: customer.email },
            process.env.JWT_SECRET, // replace with env var
            { expiresIn: "1d" }
        );

        res.json({
            token,
            role: "customer",
            name: customer.name,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

export default router;
