import { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
export default function CustomerLogin() {
    const query=useQuery();
    const prefilledEmail=query.get("email")||"";
    const [email, setEmail] = useState(prefilledEmail);
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:5000/api/customers/login", { email, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("email", email);
            setMessage("Login successful!");
            window.location.href = "/search-driver";
        } catch (err) {
            setMessage(err.response?.data?.error || "Login failed");
        }
    };

    return (
        <Container style={{ maxWidth: "400px" }} className="mt-4">
            <h3>Customer Login</h3>
            {message && <Alert variant="info">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">Login</Button>
            </Form>
        </Container>
    );
}
