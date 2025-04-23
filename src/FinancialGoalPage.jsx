import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "./styles";
import { AuthContainer, AuthForm, Input, SubmitButton, ErrorMsg } from "./styles/authStyles";

export default function FinancialGoalPage() {
  const token = localStorage.getItem("token");

  const [targetAmount, setTargetAmount] = useState("");
  const [availableAmount, setAvailableAmount] = useState(0);
  const [goalReached, setGoalReached] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [goalHistory, setGoalHistory] = useState([]);

  // Fetch current goal and available money
  useEffect(() => {
    const fetchGoalData = async () => {
      try {
        const res = await axios.get("https://moneymavenfrontend-4.onrender.com/financial-goal", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data) {
          const target = res.data.targetAmount || 0;
          const available = res.data.availableAmount || 0;

          setTargetAmount(target);
          setAvailableAmount(available);
          setGoalReached(res.data.goalReached || false);

          // 🎯 Dynamic message based on progress
          if (available >= target && target > 0) {
            setMessage("🎉 Congrats! You've reached your savings goal!");
          } else if (available >= 0.75 * target) {
            setMessage("⏳ You're on your way! Just a little more to go!");
          } else if (available >= 0.5 * target) {
            setMessage("💡 Halfway there! Keep pushing!");
          } else if (target > 0) {
            setMessage("📉 You've spent quite a bit—try to hold back a bit more.");
          } else {
            setMessage("");
          }
        }
      } catch (err) {
        console.error("Error loading goal data:", err);
        setError("❌ Could not load financial goal info.");
      }
    };

    const fetchGoalHistory = async () => {
        try {
          const res = await axios.get("https://moneymavenfrontend-4.onrender.com/goal-history", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setGoalHistory(res.data);
        } catch (err) {
          console.error("Failed to load goal history", err);
        }
      };

    fetchGoalData();
    fetchGoalHistory();
  }, [token]);

  // Handle submit of new/updated goal
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await axios.post(
        "https://moneymavenfrontend-4.onrender.com/financial-goal",
        { targetAmount: parseFloat(targetAmount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("✅ Goal saved successfully!");
    } catch (err) {
      console.error("Error saving goal:", err);
      setError("❌ Failed to save goal.");
    }

    setLoading(false);
  };

  return (
    <Container>
      <Header />

      <AuthContainer>
        <h2>Set Your Monthly Savings Goal</h2>

        <AuthForm onSubmit={handleSubmit}>
          <Input
            type="number"
            placeholder="e.g., 200"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
          />

          {error && <ErrorMsg>{error}</ErrorMsg>}
          {message && (
            <p style={{ color: goalReached ? "green" : "#3498db", fontWeight: "bold" }}>{message}</p>
          )}

          <SubmitButton type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Goal"}
          </SubmitButton>
        </AuthForm>

        <div style={{
          marginTop: "2rem",
          background: "#f2f2f2",
          padding: "1.5rem",
          borderRadius: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}>
          <h4>💰 Available this month: <span style={{ color: "#2ecc71" }}>€{availableAmount.toFixed(2)}</span></h4>
          <h4>🎯 Target goal: <span style={{ color: "#3498db" }}>€{targetAmount || "–"}</span></h4>
        </div>

        {goalHistory.length > 0 && (
          <div style={{ marginTop: "2rem" }}>
            <h3>📅 Goal History</h3>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
              <thead>
                <tr style={{ background: "#dbe9f4", textAlign: "left" }}>
                  <th style={{ padding: "10px" }}>Month</th>
                  <th style={{ padding: "10px" }}>Target (€)</th>
                  <th style={{ padding: "10px" }}>Available (€)</th>
                  <th style={{ padding: "10px" }}>Achieved</th>
                </tr>
              </thead>
              <tbody>
                {goalHistory.map((entry, index) => (
                  <tr key={index} style={{ borderTop: "1px solid #ccc" }}>
                    <td style={{ padding: "10px" }}>{entry.month} / {entry.year}</td>
                    <td style={{ padding: "10px" }}>€{entry.targetAmount.toFixed(2)}</td>
                    <td style={{ padding: "10px" }}>€{entry.availableAmount.toFixed(2)}</td>
                    <td style={{ padding: "10px" }}>
                      {entry.achieved ? "✅" : "❌"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AuthContainer>

      <Footer />
    </Container>
  );
}
