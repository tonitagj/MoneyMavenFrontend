import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Used for redirection
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AuthContainer, AuthForm, Input, SubmitButton, ErrorMsg } from "./styles/authStyles";
import { Container } from "./styles";

export default function LoginPage() {
    const navigate = useNavigate(); // ✅ Navigate to user profile after login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ Validate Form
    const validateForm = () => {
        let newErrors = {};

        if (!email.trim()) newErrors.email = "Email is required!";
        else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email format!";

        if (!password.trim()) newErrors.password = "Password is required!";
        else if (password.length < 6) newErrors.password = "Password must be at least 6 characters!";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // ✅ Returns true if no errors
    };

    // ✅ Handle Login
    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError("");
        setLoading(true);

        if (validateForm()) {
            try {
                const response = await axios.post(
                    "http://localhost:8080/login", 
                    { email, password }, 
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true, // ✅ Allows cookies (if used)
                    }
                );

                if (response.status === 200) {
                    localStorage.setItem("token", response.data.token); // ✅ Store JWT Token
                    navigate("/user-profile"); // ✅ Redirect to user profile after login
                }
            } catch (error) {
                console.error("Login error:", error);

                if (error.response) {
                    setServerError(error.response.data || "Login failed! ❌ Invalid credentials.");
                } else {
                    setServerError("Server not responding. Please try again later.");
                }
            }
        }

        setLoading(false);
    };

    return (
        <Container>
            <Header />
            <AuthContainer>
                <h2>Login to MoneyMaven</h2>

                {serverError && <ErrorMsg>{serverError}</ErrorMsg>} {/* ✅ Show backend error */}

                <AuthForm onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}

                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {errors.password && <ErrorMsg>{errors.password}</ErrorMsg>}

                    <SubmitButton type="submit" disabled={loading}>
                        {loading ? "Logging in..." : "Login"}
                    </SubmitButton>
                </AuthForm>
            </AuthContainer>
            <Footer />
        </Container>
    );
}
