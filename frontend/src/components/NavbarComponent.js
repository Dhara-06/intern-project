import { Navbar, Nav, Container, Button, NavDropdown, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaUserPlus, FaUser, FaCar, FaHistory, FaSignOutAlt, FaTachometerAlt, FaUsers } from "react-icons/fa";

export default function AppNavbar() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/"); 
    };

    return (
        <Navbar bg="primary" variant="dark" expand="lg" sticky="top" className="shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold fs-4">
                    <FaCar className="mb-1 me-2" /> Acting Driver Service
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!role && (
                            <>
                                <NavDropdown title={<><FaUserPlus className="mb-1 me-1" /> Register</>} id="register-dropdown" menuVariant="light">
                                    <NavDropdown.Item as={Link} to="/register-customer" className="fw-semibold">
                                        <FaUser className="me-2" /> Customer Register
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/register-driver" className="fw-semibold">
                                        <FaUsers className="me-2" /> Driver Register
                                    </NavDropdown.Item>
                                </NavDropdown>

                                <Nav.Link as={Link} to="/customer-login" className="fw-medium">
                                    <FaUser className="me-2" /> Customer Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/driver-login" className="fw-medium">
                                    <FaCar className="me-2" /> Driver Login
                                </Nav.Link>
                            </>
                        )}

                        {role === "customer" && (
                            <>
                                <Nav.Link as={Link} to="/search-driver" className="fw-medium">
                                    <FaCar className="me-2" /> Search Drivers
                                </Nav.Link>
                                <Nav.Link as={Link} to="/customer-history" className="fw-medium">
                                    <FaHistory className="me-2" /> Booking History
                                </Nav.Link>
                            </>
                        )}

                        {role === "driver" && (
                            <Nav.Link as={Link} to="/driver-dashboard" className="fw-medium">
                                <FaTachometerAlt className="me-2" /> Driver Dashboard
                            </Nav.Link>
                        )}
                    </Nav>

                    {role && (
                        <div className="d-flex align-items-center">
                            <Badge bg="light" text="primary" className="me-3 text-capitalize fs-6" style={{ minWidth: "90px", textAlign: "center" }}>
                                Welcome, {name}
                            </Badge>

                            <Button variant="light" size="sm" onClick={handleLogout} className="fw-semibold d-flex align-items-center">
                                <FaSignOutAlt className="me-2" /> Logout
                            </Button>
                        </div>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
