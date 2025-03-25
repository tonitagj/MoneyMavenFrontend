import styled from "styled-components";

/* AUTH PAGE CONTAINER */
export const AuthContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(135deg, #0A192F, #1B2A49);
  color: white;
`;

/* AUTH FORM */
export const AuthForm = styled.form`
  background: #112240;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(255, 255, 255, 0.1);
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

/* FORM INPUT */
export const Input = styled.input`
  padding: 12px;
  border: 1px solid #3B5998;
  border-radius: 8px;
  font-size: 1rem;
  background: #1B2A49;
  color: white;
  outline: none;
  
  &::placeholder {
    color: #AAB7C4;
  }

  &:focus {
    border-color: #4A90E2;
    box-shadow: 0 0 8px rgba(74, 144, 226, 0.7);
  }
`;

/* SUBMIT BUTTON */
export const SubmitButton = styled.button`
  padding: 12px;
  background: linear-gradient(to right, #1E3A8A, #3B5998);
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  color: white;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background: linear-gradient(to right, #3B5998, #1E3A8A);
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(59, 89, 152, 0.7);
  }
`;

//Error Message at Login
export const ErrorMsg = styled.p`
  color: #ff4d4d;
  font-size: 0.9rem;
  margin: -10px 0 10px;
  text-align: left;
`;