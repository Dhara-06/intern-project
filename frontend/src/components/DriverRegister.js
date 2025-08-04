import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";

export default function DriverRegister() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        experience: "",
        licenseNumber: "",
        vehicleInfo: "",
        availability: "",
        location: ""
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register/driver", formData);
            setMessage(res.data.message || "Driver registered successfully!");
            setFormData({
                name: "",
                email: "",
                password: "",
                experience: "",
                licenseNumber: "",
                vehicleInfo: "",
                availability: "",
                location: ""
            });
        } catch (err) {
            setMessage(err.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <Container style={{ maxWidth: "500px" }} className="mt-4">
            <h3>Driver Registration</h3>
            {message && <Alert variant="info">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Experience</Form.Label>
                    <Form.Control
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>License Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Vehicle Info</Form.Label>
                    <Form.Control
                        type="text"
                        name="vehicleInfo"
                        value={formData.vehicleInfo}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Availability</Form.Label>
                    <Form.Control
                        type="text"
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        placeholder="e.g., Morning, Evening, Weekends"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="success" type="submit" className="w-100">
                    Register
                </Button>
            </Form>
        </Container>
    );
}
