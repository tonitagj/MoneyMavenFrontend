import React from "react";
import { Section, FeatureCard } from "../styles";

export default function Features() {
  return (
    <Section>
      <h2>Why Choose MoneyMaven?</h2>
      <FeatureCard>
        <h3>📊 Smart Budgeting</h3>
        <p>Set and track your financial goals easily.</p>
      </FeatureCard>
      <FeatureCard>
        <h3>💰 Expense Tracking</h3>
        <p>See where your money is going in real time.</p>
      </FeatureCard>
      <FeatureCard>
        <h3>🔒 Secure & Private</h3>
        <p>Your data is encrypted and protected.</p>
      </FeatureCard>
    </Section>
  );
}
