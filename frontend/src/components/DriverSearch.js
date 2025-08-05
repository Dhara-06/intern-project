import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Card, Badge } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaCar, FaCalendarCheck, FaMapMarkerAlt, FaIdCard, FaStar } from "react-icons/fa";

export default function DriverSearch() {
    const [location, setLocation] = useState("");
    const [availability, setAvailability] = useState("");
    const [drivers, setDrivers] = useState([]);
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get("http://localhost:5000/api/drivers/search", {
                params: { location, availability }
            });
            setDrivers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleBook = (driverId, driverName) => {
        navigate("/booking", { state: { driverId, driverName } });
    };

    const fetchAll = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/drivers/getAll");
            setDrivers(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchAll();
    }, []);

    return (
        <Container className="mt-4">
            <h3 className="mb-4">Search Drivers</h3>
            <Form onSubmit={handleSearch} className="mb-4">
                <Row className="g-2">
                    <Col md={3} sm={12}>
                        <Form.Control
                            placeholder="Enter Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </Col>
                    <Col md={3} sm={12}>
                        <Form.Control
                            placeholder="Enter Availability (e.g., Morning)"
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                        />
                    </Col>
                    <Col md={2} sm={12}>
                        <Button type="submit" className="w-50" variant="primary">Search</Button>
                    </Col>
                </Row>
            </Form>

            <Row>
                {drivers.length > 0 ? (
                    drivers.map((driver) => (
                        <Col md={4} sm={6} xs={12} key={driver._id} className="mb-4">
                            <Card className="shadow-sm h-100">
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="text-primary fs-4 mb-3">{driver.name}</Card.Title>

                                    <div className="mb-2 d-flex align-items-center text-muted">
                                        <FaStar className="me-2 text-warning" />
                                        <span><strong>Experience: </strong>{driver.experience} years</span>
                                    </div>

                                    <div className="mb-2 d-flex align-items-center text-muted">
                                        <FaIdCard className="me-2" />
                                        <span><strong>License: </strong>{driver.licenseNumber}</span>
                                    </div>

                                    <div className="mb-2 d-flex align-items-center text-muted">
                                        <FaCar className="me-2" />
                                        <span><strong>Vehicle: </strong>{driver.vehicleInfo}</span>
                                    </div>

                                    <div className="mb-2 d-flex align-items-center">
                                        <Badge pill bg="success" className="me-2">
                                            <FaCalendarCheck className="mb-1" /> {driver.availability}
                                        </Badge>
                                        <Badge pill bg="info" className="d-flex align-items-center">
                                            <FaMapMarkerAlt className="mb-1 me-1" /> {driver.location}
                                        </Badge>
                                    </div>
                                    <div className="mb-2 d-flex align-items-center text-muted">
                                    <FaStar className="me-2 text-warning" />
                                    <span><strong>Rating: </strong>{driver.avgRating || "0.0"} (<strong>Reviewer: </strong>{driver.totalReviews || 0})</span>
                                    </div>



                                    <Button
                                        variant="success"
                                        size="sm"
                                        onClick={() => handleBook(driver._id, driver.name)}
                                        className="mt-auto w-25 align-self-end"
                                    >
                                        Book Now
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col>
                        <p className="text-center text-muted">No drivers found. Try different search criteria.</p>
                    </Col>
                )}
            </Row>
        </Container>
    );
}
