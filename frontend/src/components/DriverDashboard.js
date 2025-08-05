import { useState, useEffect } from "react";
import { Container, Table, Button, Badge } from "react-bootstrap";
import axios from "axios";

export default function DriverDashboard() {
    const [bookings, setBookings] = useState([]);
   

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
        </Container>
    );
}
