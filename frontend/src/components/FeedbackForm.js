import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

export default function FeedbackForm({ bookingId, driverId, onClose, setParentMessage }) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [message, setMessage] = useState("");
    const[variant,setVariant] = useState("info");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await axios.post("http://localhost:5000/api/feedback", {
                bookingId,
                rating,
                comment
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setVariant("success");
            setMessage("Feedback submitted!");
            if(setParentMessage) {
                setParentMessage("Feedback submitted!");
            }
            setRating(5);
            setComment("");
            if (onClose) onClose(); // close modal
        } catch (err) {
            setVariant("danger");
            setMessage(err.response?.data?.error || "Error submitting feedback");
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {message && <Alert variant={variant}>{message}</Alert>}
            <Form.Group className="mb-2">
                <Form.Label>Rating (1-5)</Form.Label>
                <Form.Control
                    type="number"
                    min="1"
                    max="5"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className="mb-2">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={2}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </Form.Group>

            <Button type="submit" variant="primary" size="sm" className="w-100">Submit</Button>
        </Form>
    );
}
