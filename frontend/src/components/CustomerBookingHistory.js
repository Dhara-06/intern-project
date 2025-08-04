import { useState, useEffect } from "react";
import { Container, Table, Badge } from "react-bootstrap";
import axios from "axios";

export default function CustomerBookingHistory() {
    const [bookings, setBookings] = useState([]);

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

    return (
        <Container className="mt-4">
            <h3>My Booking History</h3>
            <Table bordered hover responsive>
                <thead>
                    <tr>
                        <th>Driver Name</th>
                        <th>Pickup</th>
                        <th>Destination</th>
                        <th>Time Slot</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.length > 0 ? (
                        bookings.map((b) => (
                            <tr key={b._id}>
                                <td>{b.driverId?.name || "N/A"}</td>
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
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No bookings found</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
}
