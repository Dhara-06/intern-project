import { useState, useEffect } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import PasswordInput from "../ui/PasswordInput";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export default function CustomerLogin() {
    const query = useQuery();
    const prefilledEmail = query.get("email") || "";

    const [email, setEmail] = useState(prefilledEmail);
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [variant, setVariant] = useState("info"); // alert variant
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (message) setMessage("");
    }, [email, password]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const res = await axios.post("http://localhost:5000/api/customers/login", { email, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("name", res.data.name);
            localStorage.setItem("email", email);
            setVariant("success");
            setMessage("Login successful! Redirecting...");
            setTimeout(() => {
                window.location.href = "/search-driver";
            }, 1500);
        } catch (err) {
            setVariant("danger");
            setMessage(err.response?.data?.error || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container style={{ maxWidth: "400px" }} className="mt-5 p-4 border rounded shadow-sm">
            <h3 className="mb-4 text-center">Customer Login</h3>
            {message && <Alert variant={variant}>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={loading}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <PasswordInput
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        disabled={loading}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    size="sm"
                    disabled={loading}
                    className="w-50 d-block mx-auto mb-3"
                >
                    {loading ? "Logging in..." : "Login"}
                </Button>
            </Form>

            <p className="text-center mb-0">
                New user?{" "}
                <Link to="/register-customer" className="text-decoration-none">
                    Register here
                </Link>
            </p>
        </Container>
    );
}
