import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CustomerRegister() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        paymentDetails: ""
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register/customer", formData);
            setMessage(res.data.message || "Customer registered successfully!");
            setFormData({ name: "", email: "", password: "", paymentDetails: "" });
        } catch (err) {
            setMessage(err.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <Container style={{ maxWidth: "500px" }} className="mt-4">
            <h3>Customer Registration</h3>
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
                    <Form.Label>Payment Details</Form.Label>
                    <Form.Control
                        type="text"
                        name="paymentDetails"
                        value={formData.paymentDetails}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Register
                </Button>

                <p className="mt-3">
                    Already have an account? <Link to="/customer-login">Login here</Link>
                </p>

            </Form>
        </Container>
    );
}
