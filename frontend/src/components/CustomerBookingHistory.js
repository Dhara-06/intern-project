import { useState, useEffect } from "react";
import { Container, Table, Badge, Button, Modal } from "react-bootstrap";
import axios from "axios";
import FeedbackForm from "./FeedbackForm";

export default function CustomerBookingHistory() {
    const [bookings, setBookings] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get("http://localhost:5000/api/bookings/customer", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBookings(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleOpenFeedback = (booking) => {
        setSelectedBooking(booking);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedBooking(null);
        setFeedbackMessage("");
    };

    return (
        <Container className="mt-4">
            <h3>My Booking History</h3>
            {feedbackMessage && (
                <div className="alert alert-success">{feedbackMessage}</div>
            )}
            <Table bordered hover responsive>
                <thead>
                    <tr>
                        <th>Driver Name</th>
                        <th>Driver Email</th>
                        <th>Pickup</th>
                        <th>Destination</th>
                        <th>Time Slot</th>
                        <th>Status</th>
                        <th>Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 ? (
                        bookings.map((b) => (
                            <tr key={b._id}>
                                <td>{b.driverId?.name || "N/A"}</td>
                                <td>{b.driverId?.email || "N/A"}</td>
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
                                    {b.status === "Confirmed" && (
                                        <Button variant="info" size="sm" onClick={() => handleOpenFeedback(b)}>
                                            Feedback
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No bookings found</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Feedback for {selectedBooking?.driverId?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedBooking && (
                        <FeedbackForm
                            bookingId={selectedBooking._id}
                            driverId={selectedBooking.driverId._id}
                            onClose={handleCloseModal}
                            setParentMessage={setFeedbackMessage}
                        />
                    )}
                </Modal.Body>
            </Modal>
        </Container>
    );
}
