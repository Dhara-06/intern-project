import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <Container className="text-center mt-5">
            <h1>Welcome to Acting Driver Service</h1>
            <p>Find reliable drivers for your travel needs.</p>
            <Button as={Link} to="/search-driver" variant="primary" className="m-2">
                Search Driver
            </Button>
            <Button as={Link} to="/register-driver" variant="success" className="m-2">
                Become a Driver
            </Button>
        </Container>
    );
}
