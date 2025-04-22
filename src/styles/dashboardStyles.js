// src/styles/dashboardStyles.js
import styled from "styled-components";

export const DashboardContainer = styled.div`
  max-width: 900px;
  margin: auto;
  padding: 2rem;
`;

export const ChartSection = styled.div`
  margin: 3rem 0;
`;

export const ChartTitle = styled.h4`
  margin-bottom: 1rem;
  font-weight: 600;
`;

export const FilterRow = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 2rem;
  margin-bottom: 2rem;

  label {
    font-weight: 500;

    select {
      margin-left: 0.5rem;
      padding: 0.3rem;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
  }
`;
