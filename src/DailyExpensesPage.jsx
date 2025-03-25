import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container, Section } from "./styles";
import { AuthForm, Input, ErrorMsg, SubmitButton } from "./styles/authStyles";
import { Button } from "./styles";

export default function DailyExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    itemName: "",
    price: "",
    type: "NECESSITY"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({}); // ✅ Einzelne Feld-Fehler

  const token = localStorage.getItem("token");
  const today = new Date().toISOString().split("T")[0];

  console.log("JWT token:", token);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/expenses/" + today, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setExpenses(response.data);
    } catch (err) {
      console.error("Failed to load expenses", err);
      setError("Failed to load expenses.");
    }
  };

  useEffect(() => {
    if (!token) return;
    fetchExpenses();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" }); // ✅ Fehler zurücksetzen beim Tippen
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.itemName.trim()) {
      errors.itemName = "Item name is required!";
    }

    if (!formData.price || isNaN(formData.price)) {
      errors.price = "Valid price is required!";
    } else if (Number(formData.price) <= 0) {
      errors.price = "Price must be greater than zero!";
    }

    if (!["NECESSITY", "IMPULSE"].includes(formData.type)) {
      errors.type = "Invalid expense type!";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const payload = {
      ...formData,
      date: today
    };

    try {
      await axios.post("http://localhost:8080/expenses", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      setFormData({ itemName: "", price: "", type: "NECESSITY" });
      fetchExpenses();
    } catch (err) {
      console.error("Failed to submit expense", err);
      setError("Failed to submit expense.");
    }

    setLoading(false);
  };

  return (
    <Container>
      <Header />
      <Section>
        <h2>Track Daily Expenses</h2>

        <AuthForm onSubmit={handleSubmit}>
          <Input
            type="text"
            name="itemName"
            placeholder="Expense Name"
            value={formData.itemName}
            onChange={handleChange}
          />
          {fieldErrors.itemName && <ErrorMsg>{fieldErrors.itemName}</ErrorMsg>}

          <Input
            type="number"
            name="price"
            placeholder="Amount (e.g., 12.99)"
            value={formData.price}
            onChange={handleChange}
          />
          {fieldErrors.price && <ErrorMsg>{fieldErrors.price}</ErrorMsg>}

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            style={{ padding: "12px", borderRadius: "10px", marginBottom: "15px" }}
          >
            <option value="NECESSITY">Necessity</option>
            <option value="IMPULSE">Impulse</option>
          </select>
          {fieldErrors.type && <ErrorMsg>{fieldErrors.type}</ErrorMsg>}

          {error && <ErrorMsg>{error}</ErrorMsg>}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Saving..." : "Add Expense"}
          </SubmitButton>
        </AuthForm>

        <h3 style={{ marginTop: "30px" }}>Today's Expenses</h3>
        {expenses.length === 0 ? (
          <p>No expenses yet today.</p>
        ) : (
          <ul style={{ textAlign: "left", listStyle: "none", padding: 0 }}>
            {expenses.map((item, index) => (
              <li key={item.id || `${item.itemName}-${index}`}>
                <strong>{item.itemName}</strong> – €{item.price.toFixed(2)} ({item.type})
              </li>
            ))}
          </ul>
        )}
      </Section>
      <Footer />
    </Container>
  );
}
