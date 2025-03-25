import React from "react";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import UserProfile from "./UserProfile";
import RegistrationPage from "./RegistrationPage";
import { Routes, Route } from "react-router-dom";
import DailyExpensesPage from "./DailyExpensesPage";

function App() {
  <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}></div>

  return (

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/expenses" element={<DailyExpensesPage />} />
      </Routes>
    
  );
}

export default App;
