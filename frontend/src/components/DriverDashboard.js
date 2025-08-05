import { useState, useEffect } from "react";
import { Container, Table, Button, Badge, Modal } from "react-bootstrap";
import axios from "axios";

export default function DriverDashboard() {
    const [bookings, setBookings] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [feedbackData, setFeedbackData] = useState(null);
    const [modalTitle, setModalTitle] = useState("");

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/bookings/driver", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBookings(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const updateStatus = async (bookingId, status) => {
        try {
            await axios.put(`http://localhost:5000/api/bookings/${bookingId}/status`, { status });
            fetchBookings(); // Refresh list
        } catch (err) {
            console.error(err);
        }
    };

    const handleViewFeedback = async (booking) => {
        try {
            const res = await axios.get(`http://localhost:5000/api/feedback/booking/${booking._id}`);
            setFeedbackData(res.data);
            setModalTitle(`Feedback from ${res.data.customerId?.name || "Customer"}`);
        } catch (err) {
            setFeedbackData(null);
            setModalTitle("No Feedback Found");
        } finally {
            setShowModal(true);
        }
    };

    return (
        <Container className="mt-4">
            <h3>Driver Dashboard</h3>
            <Table bordered hover responsive>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Customer Email</th>
                        <th>Pickup</th>
                        <th>Destination</th>
                        <th>Time Slot</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 ? (
                        bookings.map((b) => (
                            <tr key={b._id}>
                                <td>{b.customerName}</td>
                                <td>{b.customerEmail}</td>
                                <td>{b.pickupLocation}</td>
                                <td>{b.destination}</td>
                                <td>{b.timeSlot}</td>
                                <td>
                                    <Badge bg={
                                        b.status === "Pending" ? "warning" :
                                            b.status === "Confirmed" ? "success" : "danger"
                                    }>
                                        {b.status}
                                    </Badge>
                                </td>
                                <td>
                                    {b.status === "Pending" && (
                                        <>
                                            <Button
                                                variant="success"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => updateStatus(b._id, "Confirmed")}
                                            >
                                                Accept
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => updateStatus(b._id, "Declined")}
                                            >
                                                Decline
                                            </Button>
                                        </>
                                    )}
                                    {b.status === "Confirmed" && (
                                        <Button
                                            variant="info"
                                            size="sm"
                                            className="mt-1"
                                            onClick={() => handleViewFeedback(b)}
                                        >
                                            View Feedback
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center">No bookings found</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {feedbackData ? (
                        <>
                            <p><strong>Rating:</strong> {feedbackData.rating} ⭐</p>
                            <p><strong>Comment:</strong></p>
                            <p>{feedbackData.comment || "No comment provided."}</p>
                        </>
                    ) : (
                        <p>No feedback has been submitted for this booking yet.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}
