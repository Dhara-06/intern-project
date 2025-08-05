import { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

export default function PasswordInput({ value, onChange, disabled, name, placeholder, required }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <InputGroup>
            <Form.Control
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                disabled={disabled}
                name={name}
                placeholder={placeholder}
                required={required}
            />
            <Button
                variant="outline-secondary"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1} // prevents button from getting focus on tab key
            >
                {showPassword ? "Hide" : "Show"}
            </Button>
        </InputGroup>
    );
}
