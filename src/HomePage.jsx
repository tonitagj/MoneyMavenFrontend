import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import { Container, Main } from "./styles";

export default function HomePage() {
    
  return (
    <Container>
      <Header />
      <Hero />
      <Main>
        <Features />
        <FAQ />
      </Main>
      <Footer />
    </Container>
  );
}
