import { useState, useEffect } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function Booking() {
    const { state } = useLocation();
    const driverId = state?.driverId || "";
    const driverName = state?.driverName || "";
    const loggedInEmail = localStorage.getItem("email") ;
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        customerName: "",
        customerEmail: "",
        pickupLocation: "",
        destination: "",
        timeSlot: ""
    });

    useEffect(() => {
        setFormData(prev => ({ ...prev, customerEmail: loggedInEmail }));
    }, [loggedInEmail]);

    const handleChange = (e) => {
        if (e.target.name === "customerEmail") return;
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token=localStorage.getItem("token");
            const res = await axios.post("http://localhost:5000/api/bookings", {
                ...formData,
                driverId
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
            setMessage(res.data.message);
            setFormData({
                customerName: "",
                customerEmail: "",
                pickupLocation: "",
                destination: "",
                timeSlot: ""
            });
        } catch (err) {
            setMessage(err.response?.data?.error || "Booking failed");
        }
    };

    return (
        <Container style={{ maxWidth: "500px" }} className="mt-4">
            <h3>Book Driver: <span className="text-primary">{driverName}</span></h3>
            {message && <Alert variant="info">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="customerEmail"
                        value={formData.customerEmail}
                        // onChange={handleChange}
                        required
                        readOnly
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Pickup Location</Form.Label>
                    <Form.Control
                        name="pickupLocation"
                        value={formData.pickupLocation}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Destination</Form.Label>
                    <Form.Control
                        name="destination"
                        value={formData.destination}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Time Slot</Form.Label>
                    <Form.Control
                        name="timeSlot"
                        value={formData.timeSlot}
                        onChange={handleChange}
                        placeholder="e.g., 10:00 AM"
                        required
                    />
                </Form.Group>
                <Button variant="success" type="submit" className="w-100">
                    Confirm Booking
                </Button>
            </Form>
        </Container>
    );
}
