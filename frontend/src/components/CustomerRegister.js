import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../ui/PasswordInput";

export default function CustomerRegister() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        paymentDetails: ""
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
            const res = await axios.post("http://localhost:5000/api/auth/register/customer", formData);
            setMessage(res.data.message || "Customer registered successfully!");
            setTimeout(() => navigate(`/customer-login?email=${encodeURIComponent(formData.email)}`), 2000);
            setFormData({ name: "", email: "", password: "", paymentDetails: "" });
        } catch (err) {
            setMessage(err.response?.data?.error || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container style={{ maxWidth: "500px" }} className="mt-5 p-4 border rounded shadow-sm">
            <h3 className="mb-4 text-center">Customer Registration</h3>
            {message && <Alert variant="info">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="customerName">
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
                <Form.Group className="mb-3" controlId="customerEmail">
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
                <Form.Group className="mb-3" controlId="customerPassword">
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
                <Form.Group className="mb-3" controlId="customerPaymentDetails">
                    <Form.Label>Payment Details</Form.Label>
                    <Form.Control
                        type="text"
                        name="paymentDetails"
                        value={formData.paymentDetails}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </Form.Group>
                <Button variant="primary" type="submit" size="sm" disabled={loading} className="w-50 d-block mx-auto mb-3">
                    {loading ? "Registering..." : "Register"}
                </Button>
            </Form>

            <p className="text-center mb-0">
                Already have an account?{" "}
                <Link to="/customer-login" className="text-decoration-none">
                    Login here
                </Link>
            </p>
        </Container>
    );
}
