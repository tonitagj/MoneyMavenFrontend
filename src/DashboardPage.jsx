import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container, Section } from "./styles";
import { AuthContainer } from "./styles/authStyles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  const [monthlyData, setMonthlyData] = useState({});
  const [impulseData, setImpulseData] = useState({});
  const [dailyData, setDailyData] = useState({});
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [weeklyData, setWeeklyData] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const monthlyRes = await axios.get("https://moneymaven-3.onrender.com/dashboard/monthly-expenses", { headers });
        const impulseRes = await axios.get("https://moneymaven-3.onrender.com/dashboard/impulse-vs-necessity", { headers });
        const dailyRes = await axios.get(`https://moneymaven-3.onrender.com/dashboard/daily-expenses?month=${selectedMonth}&year=${selectedYear}`, { headers });
        const weeklyRes = await axios.get(`https://moneymaven-3.onrender.com/dashboard/weekly-expenses?month=${selectedMonth}&year=${selectedYear}`, { headers });


        setMonthlyData(monthlyRes.data);
        setImpulseData(impulseRes.data);
        setDailyData(dailyRes.data);
        setWeeklyData(weeklyRes.data);
      } catch (err) {
        console.error("Error loading dashboard data", err);
      }
    };

    fetchInitialData();
  }, [token, selectedMonth, selectedYear]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const headers = { Authorization: `Bearer ${token}` };
        const impulseRes = await axios.get("https://moneymaven-3.onrender.com/dashboard/impulse-vs-necessity", { headers });
        setImpulseData(impulseRes.data);
      } catch (err) {
        console.error("Live update failed", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [token]);

  const sortedDailyEntries = Object.entries(dailyData).sort(
    ([dateA], [dateB]) => new Date(dateA) - new Date(dateB)
  );

  const barData = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: "Monthly Expenses (€)",
        data: Object.values(monthlyData),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const pieData = {
    labels: Object.keys(impulseData),
    datasets: [
      {
        data: Object.values(impulseData),
        backgroundColor: ["#FF6384", "#4BC0C0"],
      },
    ],
  };

  const dailyLineData = {
    labels: sortedDailyEntries.map(([date]) => date),
    datasets: [
      {
        label: `Daily Expenses for ${selectedMonth}/${selectedYear}`,
        data: sortedDailyEntries.map(([_, value]) => value),
        fill: false,
        borderColor: "#8e44ad",
        tension: 0.3,
      },
    ],
  };

  const weeklyBarData = {
    labels: Object.keys(weeklyData).map(w => `Week ${w}`),
    datasets: [
      {
        label: "Weekly Expenses (€)",
        data: Object.values(weeklyData),
        backgroundColor: "#f39c12",
      },
    ],
  };
  

  return (
    <Container>
      <Header />
      <AuthContainer>
        <h2>📊 Dashboard</h2>

        <div style={{ marginBottom: "1.5rem" }}>
          <label style={{ marginRight: "1rem" }}>
            Month:
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))} style={{ marginLeft: "0.5rem" }}>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </label>

          <label>
            Year:
            <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} style={{ marginLeft: "0.5rem" }}>
              {[2023, 2024, 2025].map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>

        <Section>
          <h4>Monthly Spending Overview</h4>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <Bar data={barData} height={140} />
          </div>
        </Section>

        <Section>
          <h4>Impulse vs Necessity (Live)</h4>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <Pie data={pieData} height={120} />
          </div>
        </Section>

        <Section>
          <h4>Daily Expenses for {selectedMonth}/{selectedYear}</h4>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <Line data={dailyLineData} height={140} />
          </div>
        </Section>

        <Section>
          <h4>Weekly Expenses ({selectedMonth}/{selectedYear})</h4>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <Bar data={weeklyBarData} height={140} />
          </div>
        </Section>
      </AuthContainer>
      <Footer />
    </Container>
  );
}
