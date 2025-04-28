import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "./styles";
import { AuthContainer, AuthForm, Input, SubmitButton, ErrorMsg } from "./styles/authStyles";

export default function FinancialProfilePage() {
  const [formData, setFormData] = useState({
    monthlyIncome: "",
    rent: "",
    insurance: "",
    transport: "",
    subscriptions: "",
    others: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("https://moneymaven-3.onrender.com/financial-profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setFormData({
          monthlyIncome: response.data.monthlyIncome || "",
          rent: response.data.rent || "",
          insurance: response.data.insurance || "",
          transport: response.data.transport || "",
          subscriptions: response.data.subscriptions || "",
          others: response.data.others || "",
        });
      } catch (err) {
        console.error("Error loading financial profile", err);
        setError("❌ Could not load financial profile.");
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    setError("");
    setSuccess("");
  };

  const validateForm = () => {
    let errors = {};
    const numberFields = ["monthlyIncome", "rent", "insurance", "transport", "subscriptions", "others"];

    numberFields.forEach((field) => {
      const value = formData[field];
      if (value === "") {
        errors[field] = "This field is required!";
      } else if (isNaN(value)) {
        errors[field] = "Please enter a valid number!";
      } else if (parseFloat(value) < 0) {
        errors[field] = "Value cannot be negative!";
      }
    });

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const numericData = Object.fromEntries(
        Object.entries(formData).map(([key, val]) => [key, parseFloat(val)])
      );

      await axios.put("https://moneymaven-3.onrender.com/financial-profile", numericData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setSuccess("✅ Profile updated successfully!");
    } catch (err) {
      console.error("Error updating financial profile", err);
      setError("❌ Failed to update financial data.");
    }

    setLoading(false);
  };

  return (
    <Container>
      <Header />
      <AuthContainer>
        <h2>Update Your Financial Profile</h2>
        <AuthForm onSubmit={handleSubmit}>
          {/* Monthly Income */}
          <label htmlFor="monthlyIncome">Monthly Income (€)</label>
          <Input
            id="monthlyIncome"
            type="number"
            name="monthlyIncome"
            placeholder="e.g. 3000"
            value={formData.monthlyIncome}
            onChange={handleChange}
          />
          {fieldErrors.monthlyIncome && <ErrorMsg>{fieldErrors.monthlyIncome}</ErrorMsg>}

          {/* Rent */}
          <label htmlFor="rent">Rent (€)</label>
          <Input
            id="rent"
            type="number"
            name="rent"
            placeholder="e.g. 900"
            value={formData.rent}
            onChange={handleChange}
          />
          {fieldErrors.rent && <ErrorMsg>{fieldErrors.rent}</ErrorMsg>}

          {/* Insurance */}
          <label htmlFor="insurance">Insurance (€)</label>
          <Input
            id="insurance"
            type="number"
            name="insurance"
            placeholder="e.g. 250"
            value={formData.insurance}
            onChange={handleChange}
          />
          {fieldErrors.insurance && <ErrorMsg>{fieldErrors.insurance}</ErrorMsg>}

          {/* Transport */}
          <label htmlFor="transport">Transport (€)</label>
          <Input
            id="transport"
            type="number"
            name="transport"
            placeholder="e.g. 120"
            value={formData.transport}
            onChange={handleChange}
          />
          {fieldErrors.transport && <ErrorMsg>{fieldErrors.transport}</ErrorMsg>}

          {/* Subscriptions */}
          <label htmlFor="subscriptions">Subscriptions (€)</label>
          <Input
            id="subscriptions"
            type="number"
            name="subscriptions"
            placeholder="e.g. 30"
            value={formData.subscriptions}
            onChange={handleChange}
          />
          {fieldErrors.subscriptions && <ErrorMsg>{fieldErrors.subscriptions}</ErrorMsg>}

          {/* Others */}
          <label htmlFor="others">Other Fixed Costs (€)</label>
          <Input
            id="others"
            type="number"
            name="others"
            placeholder="e.g. 50"
            value={formData.others}
            onChange={handleChange}
          />
          {fieldErrors.others && <ErrorMsg>{fieldErrors.others}</ErrorMsg>}

          {/* General error/success messages */}
          {error && <ErrorMsg>{error}</ErrorMsg>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Profile"}
          </SubmitButton>
        </AuthForm>
      </AuthContainer>
      <Footer />
    </Container>
  );
}
