import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container, Section } from "./styles";
import { AuthForm, Input, ErrorMsg, SubmitButton } from "./styles/authStyles";

export default function DailyExpensesPage() {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    itemName: "",
    price: "",
    type: "NECESSITY",
    emotionAfterPurchase: "HAPPY",
    emotionAtRegistration: "PROUD"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const token = localStorage.getItem("token");
  const today = new Date().toISOString().split("T")[0];

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
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.itemName.trim()) errors.itemName = "Item name is required!";
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

    const payload = { ...formData, date: today };

    try {
      await axios.post("http://localhost:8080/expenses", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      setFormData({
        itemName: "",
        price: "",
        type: "NECESSITY",
        emotionAfterPurchase: "HAPPY",
        emotionAtRegistration: "PROUD"
      });
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
      <Section style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2>Track Daily Expenses</h2>

        <AuthForm onSubmit={handleSubmit} style={{ maxWidth: "400px", width: "100%" }}>
          <label htmlFor="itemName">Expense Name</label>
          <Input
            type="text"
            name="itemName"
            id="itemName"
            placeholder="e.g., Coffee"
            value={formData.itemName}
            onChange={handleChange}
          />
          {fieldErrors.itemName && <ErrorMsg>{fieldErrors.itemName}</ErrorMsg>}

          <label htmlFor="price">Amount (€)</label>
          <Input
            type="number"
            name="price"
            id="price"
            placeholder="e.g., 12.99"
            value={formData.price}
            onChange={handleChange}
          />
          {fieldErrors.price && <ErrorMsg>{fieldErrors.price}</ErrorMsg>}

          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            value={formData.type}
            onChange={handleChange}
            style={{ padding: "12px", borderRadius: "10px", marginBottom: "15px", width: "100%" }}
          >
            <option value="NECESSITY">Necessity</option>
            <option value="IMPULSE">Impulse</option>
          </select>

          <label htmlFor="emotionAfterPurchase">Emotion After Purchase</label>
          <select
            name="emotionAfterPurchase"
            id="emotionAfterPurchase"
            value={formData.emotionAfterPurchase}
            onChange={handleChange}
            style={{ padding: "12px", borderRadius: "10px", marginBottom: "15px", width: "100%" }}
          >
            <option value="HAPPY">HAPPY</option>
            <option value="GUILTY">GUILTY</option>
            <option value="SATISFIED">SATISFIED</option>
            <option value="SPONTANEOUS">SPONTANEOUS</option>
            <option value="PRESSURED">PRESSURED</option>
            <option value="INDIFFERENT">INDIFFERENT</option>
          </select>

          <label htmlFor="emotionAtRegistration">Emotion at Registration</label>
          <select
            name="emotionAtRegistration"
            id="emotionAtRegistration"
            value={formData.emotionAtRegistration}
            onChange={handleChange}
            style={{ padding: "12px", borderRadius: "10px", marginBottom: "15px", width: "100%" }}
          >
            <option value="PROUD">PROUD</option>
            <option value="REFLECTIVE">REFLECTIVE</option>
            <option value="REGRETFUL">REGRETFUL</option>
            <option value="NEUTRAL">NEUTRAL</option>
            <option value="UNCERTAIN">UNCERTAIN</option>
            <option value="SURPRISED">SURPRISED</option>
          </select>

          {fieldErrors.type && <ErrorMsg>{fieldErrors.type}</ErrorMsg>}
          {error && <ErrorMsg>{error}</ErrorMsg>}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Saving..." : "Add Expense"}
          </SubmitButton>
        </AuthForm>

        <h3 style={{ marginTop: "40px" }}>Today's Expenses</h3>

        {expenses.length === 0 ? (
          <p>No expenses yet today.</p>
        ) : (
          <div style={{ overflowX: "auto", maxWidth: "500px", width: "100%" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px", textAlign: "left" }}>
              <thead>
                <tr style={{ backgroundColor: "#f0f4ff" }}>
                  <th style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>Item</th>
                  <th style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>Price (€)</th>
                  <th style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>Type</th>
                </tr>
              </thead>
              <tbody>
                {expenses.map((item, index) => (
                  <tr key={item.id || `${item.itemName}-${index}`}>
                    <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{item.itemName}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{item.price.toFixed(2)}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>{item.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>
      <Footer />
    </Container>
  );
}
