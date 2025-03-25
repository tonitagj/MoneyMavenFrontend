import React from "react";
import { Section, FAQContainer, FAQItem } from "../styles";

export default function FAQ() {
  return (
    <Section>
      <h2>Frequently Asked Questions</h2>
      <FAQContainer>
        <FAQItem>
          <h4>How does it work?</h4>
          <p>MoneyMaven helps you track your spending and set financial goals with ease.</p>
        </FAQItem>
        <FAQItem>
          <h4>Is my data secure?</h4>
          <p>Yes! We use bank-level encryption to keep your data safe.</p>
        </FAQItem>
        <FAQItem>
          <h4>Is MoneyMaven really free?</h4>
          <p>Yes! Our platform is 100% free with no hidden charges.</p>
        </FAQItem>
      </FAQContainer>
    </Section>
  );
}
