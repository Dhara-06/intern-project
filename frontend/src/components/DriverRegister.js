import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../ui/PasswordInput";

export default function DriverRegister() {
    const navigate = useNavigate();
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
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (message) setMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register/driver", formData);
            setMessage(res.data.message || "Driver registered successfully!");
            setTimeout(() => navigate(`/driver-login?email=${encodeURIComponent(formData.email)}`), 2000);
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container style={{ maxWidth: "500px" }} className="mt-5 p-4 border rounded shadow-sm">
            <h3 className="mb-4 text-center">Driver Registration</h3>
            {message && <Alert variant="info">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="driverName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="driverEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="driverPassword">
                    <Form.Label>Password</Form.Label>
                    <PasswordInput
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="driverExperience">
                    <Form.Label>Experience</Form.Label>
                    <Form.Control
                        type="text"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="driverLicenseNumber">
                    <Form.Label>License Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="driverVehicleInfo">
                    <Form.Label>Vehicle Info</Form.Label>
                    <Form.Control
                        type="text"
                        name="vehicleInfo"
                        value={formData.vehicleInfo}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="driverAvailability">
                    <Form.Label>Availability</Form.Label>
                    <Form.Control
                        type="text"
                        name="availability"
                        value={formData.availability}
                        onChange={handleChange}
                        disabled={loading}
                        placeholder="e.g., Morning, Evening, Weekends"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="driverLocation">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" size="md" disabled={loading} className="w-50 d-block mx-auto mb-3">
                    {loading ? "Registering..." : "Register"}
                </Button>
            </Form>

            <p className="text-center mb-0">
                Already registered?{" "}
                <Link to="/driver-login" className="text-decoration-none">
                    Login here
                </Link>
            </p>
        </Container>
    );
}
