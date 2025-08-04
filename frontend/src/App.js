import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import NavbarComponent from "./components/NavbarComponent";
import Home from "./components/Home";
import CustomerRegister from "./components/CustomerRegister";
import DriverRegister from "./components/DriverRegister";
import DriverSearch from "./components/DriverSearch";
import Booking from "./components/Booking";
import Feedback from "./components/Feedback";
import DriverDashboard from "./components/DriverDashboard";
import CustomerLogin from "./components/CustomerLogin";
import CustomerBookingHistory from "./components/CustomerBookingHistory";
import DriverLogin from "./components/DriverLogin";

function App() {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-customer" element={<CustomerRegister />} />
        <Route path="/register-driver" element={<DriverRegister />} />
        <Route path="/search-driver" element={<DriverSearch />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/driver-dashboard" element={<DriverDashboard />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/customer-history" element={<CustomerBookingHistory />} />
        <Route path="/driver-login" element={<DriverLogin />} />
      </Routes>
    </Router>
  );
}

export default App;
