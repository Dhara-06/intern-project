import { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useNavigation } from "react-router-dom";

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

    const fetchAll=async()=>{
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
            <h3>Search Drivers</h3>
            <Form onSubmit={handleSearch} className="mb-4">
                <Row>
                    <Col md={5} sm={12} className="mb-2">
                        <Form.Control
                            placeholder="Enter Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </Col>
                    <Col md={5} sm={12} className="mb-2">
                        <Form.Control
                            placeholder="Enter Availability (e.g., Morning)"
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value)}
                        />
                    </Col>
                    <Col md={2} sm={12}>
                        <Button type="submit" className="w-100">Search</Button>
                    </Col>
                </Row>
            </Form>

            <Row>
                {drivers.length > 0 ? (
                    drivers.map((driver) => (
                        <Col md={4} sm={6} xs={12} key={driver._id} className="mb-3">
                            <Card>
                                <Card.Body>
                                    <Card.Title>{driver.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Experience:</strong> {driver.experience} <br />
                                        <strong>License:</strong> {driver.licenseNumber} <br />
                                        <strong>Vehicle:</strong> {driver.vehicleInfo} <br />
                                        <strong>Availability:</strong> {driver.availability} <br />
                                        <strong>Location:</strong> {driver.location}
                                        <Button
                                            variant="success"
                                            size="sm"
                                            onClick={() => handleBook(driver._id, driver.name)}
                                        >
                                            Book Now
                                        </Button>

                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p>No drivers found. Try different search criteria.</p>
                )}
            </Row>
        </Container>
    );
}
