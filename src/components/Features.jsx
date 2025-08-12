import React from "react";
import { Section, FeatureCard } from "../styles";
import smartBudgeting from "../assets/smartBudgeting.jpg";
import expenseTracking from "../assets/expense-tracking.jpeg";
import safePrivate from "../assets/safe-private.jpg";

export default function Features() {
  return (
    <Section>
      <h2>Why Choose MoneyMaven?</h2>
      <FeatureCard>

          <section className="leftSide">
              <h3>Smart Budgeting</h3>
              <p>Set and track your financial goals easily. Smart Budgeting helps you plan your spending and saving with clarity.
                  Easily set financial goals and track your progress in real time.
                  Stay in control of your money and make confident financial decisions.</p>
          </section>
          <section className="pictureHolder ">
              <img src={smartBudgeting} className="cardPicture"></img>
          </section>


      </FeatureCard>
        <FeatureCard>
                <section className="pictureHolder">
                    <img src={expenseTracking} className="cardPicture"></img>
                </section>
                <section className="reversedRightSide">
                    <h3>Expense Tracking</h3>
                    <p>See where your money is going in real time.</p>
                </section>
        </FeatureCard>
        <FeatureCard>
            <section className="leftSide">
                <h3>Secure & Private</h3>
                <p>Your data is encrypted and protected.</p>
            </section>
            <section className="pictureHolder">
                <img src={safePrivate} className="cardPicture"></img>
            </section>


        </FeatureCard>
    </Section>
  );

}