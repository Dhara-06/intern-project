import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Customer from "../models/Customer.js";
import Driver from "../models/Driver.js";
import dotenv from "dotenv";


dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET

router.post("/register/customer", async (req, res) => {
    try {
        const { name, email, password, paymentDetails } = req.body;
        const customer = new Customer({ name, email, password, paymentDetails });
        await customer.save();
        res.json({ message: "Customer registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Driver Registration
router.post("/register/driver", async (req, res) => {
    try {
        const { name, email, password, experience, licenseNumber, vehicleInfo, availability, location } = req.body;
        const driver = new Driver({ name, email, password, experience, licenseNumber, vehicleInfo, availability, location });
        await driver.save();
        res.json({ message: "Driver registered successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/customer/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const customer = await Customer.findOne({ email });
        if (!customer) return res.status(400).json({ error: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, customer.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: customer._id, role: "customer" , email: customer.email }, JWT_SECRET, { expiresIn: "1d" });
        res.json({ token, role: "customer", id: customer._id, name: customer.name });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Driver Login
router.post("/driver/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const driver = await Driver.findOne({ email });
        if (!driver) return res.status(400).json({ error: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, driver.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign({ id: driver._id, role: "driver" }, JWT_SECRET, { expiresIn: "1d" });
        res.json({ token, role: "driver", id: driver._id, name: driver.name });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
