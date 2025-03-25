import React from "react";
import { HeaderContainer, Nav, Logo, Button } from "../styles";
import { Link } from "react-router-dom";
import logo from "../assets/logo6.png"; // ✅ Update with your actual logo path

export default function Header() {
  const isLoggedIn = !!localStorage.getItem("token"); // ✅ Check if user is logged in

  return (
    <HeaderContainer>
      <Logo src={logo} alt="MoneyMaven Logo" />
      <Nav>
        {/* ✅ Homepage button (always visible) */}
        <Link to="/">
          <Button>Home</Button>
        </Link>

        {isLoggedIn ? (
          // ✅ Navbar for Logged-In Users
          <>
            <Link to="/user-profile">
              <Button>Profile</Button>
            </Link>
            <Link to="/expenses">
              <Button>Tracker</Button>
            </Link>
            <Link to="/dashboard">
              <Button>Dashboard</Button>
            </Link>
          </>
        ) : (
          // ✅ Navbar for Guests (Before Login)
          <>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/registration">
              <Button>Get Started</Button>
            </Link>
          </>
        )}
      </Nav>
    </HeaderContainer>
  );
}
