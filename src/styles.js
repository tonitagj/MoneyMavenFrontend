import styled, { keyframes } from "styled-components";  

/* ANIMATIONS */
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const scaleUp = keyframes`
  from { transform: scale(1); }
  to { transform: scale(1.05); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(27, 42, 73, 0.5); }
  50% { box-shadow: 0 0 20px rgba(27, 42, 73, 0.8); }
  100% { box-shadow: 0 0 5px rgba(27, 42, 73, 0.5); }
`;

/* GLOBAL CONTAINER */
export const Container = styled.div`
    min-height: 100vh;
    width: 100vw;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    background-color: #D4A056;
    color: white;
    text-align: center;
    overflow-x: hidden;
    position: relative;

    @media (max-width: 768px) {
        background-size: cover;
        padding: 10px;
    }

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;
    }

    > * {
        position: relative;
        z-index: 2;
    }
`;


/* HEADER */
export const HeaderContainer = styled.header`
    width: 100%;
    padding: 10px 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #f6f4f4;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    animation: ${fadeIn} 1s ease-in-out;

    @media (max-width: 768px) {
        flex-direction: column;
        padding: 15px;
    }

    //&:hover {
    //    background: linear-gradient(to right, #1B2A49, #112240);
    //}
`;

/* LOGO */
export const Logo = styled.img`
  width: 200px;
  height: auto;
  object-fit: contain;
  margin-left: 10px;
  margin-top: 10px;
    border-radius: 50px;
  animation: ${glow} 3s infinite alternate;

  @media (max-width: 768px) {
    width: 120px;
    margin: 0 auto;
  }
`;

/* NAVIGATION */
export const Nav = styled.nav`
  display: flex;
  gap: 15px;
  margin-right: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 10px;
    margin-top: 10px;
  }
`;

export const Button = styled.button`
  padding: 12px 22px;
  font-size: 1rem;
  font-weight: bold;
  background: #112240;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  color: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 14px rgba(59, 89, 152, 0.7);
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    font-size: 0.9rem;
  }
`;


/* HERO SECTION */
export const HeroContainer = styled.section`
    background: #112240;
    width: 90%;
    text-align: left;
    padding: 5%;

    animation: ${fadeIn} 1.2s ease-in-out;

    h1 {
        font-size: 2rem;
        margin: 0;

    }

    button {
        margin-top: 1rem;
        background-color: #64ffda;
        color: #0a192f;
        border: none;
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
        cursor: pointer;
        border-radius: 10px;
        transition: background-color 0.3s ease;


        &:hover {
            background-color: #52e0c4;
        }
    }
    
    
  p {
    font-size: 1.3rem;
    color: #AAB7C4;
    margin: 0;
  }
`;


/* MAIN CONTENT */
export const Main = styled.main`
  width: 90%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;
`;

/* SECTIONS */
export const Section = styled.section`
    background: #112240;
    padding: 35px;
    width: 100%;
    margin-bottom: 25px;
    box-shadow: 0 5px 12px rgba(255, 255, 255, 0.1);
    transition: transform 0.3s ease, background 0.3s ease;
    animation: ${fadeIn} 0.8s ease-in-out;

    h2 {
        font-size: 2.2rem;
        margin-bottom: 12px;
    }

    &:hover {
        background: linear-gradient(to right, #112240, #1B2A49);
        transform: scale(1.03);
        box-shadow: 0 8px 20px rgba(59, 89, 152, 0.5);
    }
`;

/* FEATURE CARDS */
export const FeatureCard = styled.div`
    color: white;
    padding: 22px;
    padding-top: 4em;
    padding-bottom: 4em;
    margin: 12px 0;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    display: flex;
    flex-wrap: nowrap;
    border-bottom: 1px solid white;

    h3 {
        font-size: 1.6rem;
    }
    
    .leftside{
        max-width: 70%;
    }

    section{
        text-align: left;
       
    }
   .leftSide{
        width: 60%;
    }
    
    .pictureHolder{
        display: flex;
        align-items: center; /* vertical center */
        justify-content: center;
    }
    
    img{
        width: auto;
        max-width: 40%;
    }
    

    .reversedRightSide{
        //width: 70%;
        text-align: right;
    }
    
    .reversedRightSide p{
        text-align: right;
    }
    

    .cardPicture {
        display: flex;
        align-items: center; /* vertical center */
        justify-content: center;
        max-width: 100%;
        height: auto;
        display: block;
        border-radius: 30px;
    }

`;


/* FAQ */
export const FAQContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const FAQItem = styled.div`
  background: #0F1D35;
  padding: 22px;
  border-radius: 12px;
  width: 80%;
  margin-bottom: 12px;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  h3 {
    font-size: 1.6rem;
  }

  p {
    font-size: 1rem;
    color: #AAB7C4;
    margin-top: 5px;
  }

  &:hover {
    transform: scale(1.07);
  }
`;

/* FOOTER */
export const FooterContainer = styled.footer`
  background: linear-gradient(to right, #112240, #1B2A49);
  transition: background 0.5s ease-in-out;
  padding: 30px;
  width: 100%;
  font-size: 1.3rem;
  text-align: center;
  margin-top: auto;
  max-width: 100%;
  box-sizing: border-box;
  font-weight: bold;
  animation: ${fadeIn} 1s ease-in-out;

  &:hover {
    background: linear-gradient(to right, #1B2A49, #112240);
  }
`;

export const AuthForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    background: rgba(255, 255, 255, 0.1);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    width: 100%;
    max-width: 400px;
`;