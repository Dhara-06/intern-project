import { Navbar, Nav, Container, Button, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

export default function AppNavbar() {
    const navigate = useNavigate();
    const role = localStorage.getItem("role");
    const name = localStorage.getItem("name");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/"); // Redirect to home/login
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Acting Driver Service
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!role && (
                            <>
                                <NavDropdown title="Register" id="register-dropdown">
                                    <NavDropdown.Item as={Link} to="/register-customer">Customer Register</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/register-driver">Driver Register</NavDropdown.Item>
                                </NavDropdown>

                                <Nav.Link as={Link} to="/customer-login">Customer Login</Nav.Link>
                                <Nav.Link as={Link} to="/driver-login">Driver Login</Nav.Link>
                            </>
                        )}

                        {role === "customer" && (
                            <>
                                <Nav.Link as={Link} to="/search-driver">Search Drivers</Nav.Link>
                                <Nav.Link as={Link} to="/customer-history">Booking History</Nav.Link>
                            </>
                        )}

                        {role === "driver" && (
                            <>
                                <Nav.Link as={Link} to="/driver-dashboard">Driver Dashboard</Nav.Link>
                            </>
                        )}
                    </Nav>

                    {role && (
                        <div className="d-flex align-items-center">
                            <span className="text-white me-3">
                                Welcome, {name}
                            </span>
                            <Button variant="outline-light" onClick={handleLogout}>
                                Logout
                            </Button>
                        </div>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
