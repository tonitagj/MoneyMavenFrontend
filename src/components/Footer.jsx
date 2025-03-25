import React from "react";
import { FooterContainer } from "../styles";

export default function Footer() {
  return (
    <FooterContainer>
      <p>&copy; {new Date().getFullYear()} MoneyMaven. All rights reserved.</p>
    </FooterContainer>
  );
}
