import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ For redirection
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container, Section, Button } from "./styles";
import { AuthForm, Input, SubmitButton, ErrorMsg } from "./styles/authStyles";

export default function UserProfile() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: "",
        lastname: "",
        email: "",
        birthday: "",
        country: "",
        nationality: "",
        phoneNumber: "",
        occupation: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false); // ✅ Toggle form mode

    const token = localStorage.getItem("token"); // ✅ Get token

    useEffect(() => {
        const fetchUserData = async () => {
            if (!token) {
                setError("User is not logged in.");
                navigate("/"); // ✅ Redirect to homepage if no token
                return;
            }

            try {
                const response = await axios.get("http://localhost:8080/user-profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUserData(response.data);
            } catch (err) {
                setError("Failed to fetch user data.");
                console.error("Error fetching user data:", err);
                localStorage.removeItem("token"); // ✅ Remove expired token
                navigate("/"); // ✅ Redirect to homepage
            }
        };

        fetchUserData();
    }, [navigate, token]);

    // ✅ Handle form changes
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    // ✅ Handle profile update
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await axios.put(
                "http://localhost:8080/update-profile",
                userData,
                { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
            );
            alert("Profile updated successfully! ✅");
            setEditMode(false); // ✅ Exit edit mode after update
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to update profile. Please try again.");
        }

        setLoading(false);
    };

    // ✅ Logout function
    const handleLogout = () => {
        localStorage.removeItem("token"); // ✅ Remove token
        navigate("/"); // ✅ Redirect to homepage
    };

    return (
        <Container>
            <Header />
            <Section>
                <h2>User Profile</h2>
                {error && <ErrorMsg>{error}</ErrorMsg>}

                {!editMode ? (
                    userData ? (
                        <>
                            <p><strong>Name:</strong> {userData.name}</p>
                            <p><strong>Lastname:</strong> {userData.lastname}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                            <p><strong>Birthday:</strong> {userData.birthday || "Not set"}</p>
                            <p><strong>Country of Residence:</strong> {userData.country || "Not set"}</p>
                            <p><strong>Nationality:</strong> {userData.nationality || "Not set"}</p>
                            <p><strong>Phone Number:</strong> {userData.phoneNumber || "Not set"}</p>
                            <p><strong>Occupation:</strong> {userData.occupation || "Not set"}</p>
                            <Button onClick={() => setEditMode(true)}>Edit Profile</Button> {/* ✅ Toggle Edit Mode */}
                            <Button onClick={handleLogout}>Logout</Button> {/* ✅ Logout Button */}
                        </>
                    ) : (
                        <p>Loading...</p>
                    )
                ) : (
                    <AuthForm onSubmit={handleUpdate}>
                        <Input type="text" name="name" value={userData.name} onChange={handleChange} placeholder="First Name" required />
                        <Input type="text" name="lastname" value={userData.lastname} onChange={handleChange} placeholder="Last Name" required />
                        <Input type="email" name="email" value={userData.email} onChange={handleChange} placeholder="Email" disabled />

                        <Input type="date" name="birthday" value={userData.birthday} onChange={handleChange} placeholder="Birthday" />
                        <Input type="text" name="country" value={userData.country} onChange={handleChange} placeholder="Country of Residence" />
                        <Input type="text" name="nationality" value={userData.nationality} onChange={handleChange} placeholder="Nationality" />
                        <Input type="tel" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
                        <Input type="text" name="occupation" value={userData.occupation} onChange={handleChange} placeholder="Occupation" />

                        <SubmitButton type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Save Changes"}
                        </SubmitButton>
                        <Button onClick={() => setEditMode(false)}>Cancel</Button> {/* ✅ Cancel Button */}
                    </AuthForm>
                )}
            </Section>
            <Footer />
        </Container>
    );
}
