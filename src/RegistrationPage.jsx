import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
    AuthContainer, 
    AuthForm, 
    Input, 
    SubmitButton, 
    ErrorMsg 
} from "./styles/authStyles";
import { Container } from "./styles";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RegistrationPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        lastname: "",
        email: "",
        birthday: "",
        country: "",
        nationality: "",
        phoneNumber: "",
        occupation: "",
        password: "",
        confirmPassword: "",
    });
    
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [serverError, setServerError] = useState("");  
    const [loading, setLoading] = useState(false);

    // ✅ Validate Form Function
    const validateForm = () => {
        let newErrors = {};

        if (!formData.fullName.trim()) newErrors.fullName = "Full name is required!";
        if (!formData.lastname.trim()) newErrors.lastname = "Lastname is required!";
        if (!formData.email.trim()) newErrors.email = "Email is required!";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format!";
        
        if (!formData.birthday.trim()) newErrors.birthday = "Birthday is required!";
        else if (!/^\d{4}-\d{2}-\d{2}$/.test(formData.birthday)) newErrors.birthday = "Invalid date format (YYYY-MM-DD)!";

        if (!formData.country.trim()) newErrors.country = "Country of residence is required!";
        if (!formData.nationality.trim()) newErrors.nationality = "Nationality is required!";

        if (!formData.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required!";
        else if (!/^\+?[0-9\s-]{8,15}$/.test(formData.phoneNumber)) newErrors.phoneNumber = "Invalid phone number format!";

        if (!formData.occupation.trim()) newErrors.occupation = "Occupation is required!";

        if (!formData.password.trim()) newErrors.password = "Password is required!";
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters!";

        if (formData.confirmPassword !== formData.password) newErrors.confirmPassword = "Passwords do not match!";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ✅ Handle Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage("");
        setServerError("");
        setLoading(true);

        if (validateForm()) {
            try {
                const response = await axios.post(
                    "http://localhost:8080/registration",
                    {
                        name: formData.fullName,
                        lastname: formData.lastname,
                        email: formData.email,
                        birthday: formData.birthday,
                        country: formData.country,
                        nationality: formData.nationality,
                        phoneNumber: formData.phoneNumber,
                        occupation: formData.occupation,
                        password: formData.password
                    },
                    {
                        headers: { "Content-Type": "application/json" },
                        withCredentials: true
                    }
                );

                if (response.status === 201) {
                    setSuccessMessage("🎉 Registration successful! Redirecting to login...");
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                }
            } catch (error) {
                console.error("Error registering:", error);

                if (error.response) {
                    if (error.response.status === 409) {
                        setServerError("❌ This email is already in use. Please use a different email.");
                    } else {
                        setServerError(error.response.data || "Registration failed! ❌");
                    }
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
                <h2>Register for MoneyMaven</h2>

                {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
                {serverError && <ErrorMsg>{serverError}</ErrorMsg>}

                <AuthForm onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                    {errors.fullName && <ErrorMsg>{errors.fullName}</ErrorMsg>}

                    <Input
                        type="text"
                        placeholder="Lastname"
                        value={formData.lastname}
                        onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                    />
                    {errors.lastname && <ErrorMsg>{errors.lastname}</ErrorMsg>}

                    <Input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}

                    <Input
                        type="date"
                        placeholder="Birthday (YYYY-MM-DD)"
                        value={formData.birthday}
                        onChange={(e) => setFormData({ ...formData, birthday: e.target.value })}
                    />
                    {errors.birthday && <ErrorMsg>{errors.birthday}</ErrorMsg>}

                    <Input
                        type="text"
                        placeholder="Country of Residence"
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    />
                    {errors.country && <ErrorMsg>{errors.country}</ErrorMsg>}

                    <Input
                        type="text"
                        placeholder="Nationality"
                        value={formData.nationality}
                        onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                    />
                    {errors.nationality && <ErrorMsg>{errors.nationality}</ErrorMsg>}

                    <Input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    />
                    {errors.phoneNumber && <ErrorMsg>{errors.phoneNumber}</ErrorMsg>}

                    <Input
                        type="text"
                        placeholder="Occupation"
                        value={formData.occupation}
                        onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                    />
                    {errors.occupation && <ErrorMsg>{errors.occupation}</ErrorMsg>}

                    <Input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    {errors.password && <ErrorMsg>{errors.password}</ErrorMsg>}

                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    />
                    {errors.confirmPassword && <ErrorMsg>{errors.confirmPassword}</ErrorMsg>}

                    <SubmitButton type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </SubmitButton>
                </AuthForm>
            </AuthContainer>
            <Footer />
        </Container>
    );
}
