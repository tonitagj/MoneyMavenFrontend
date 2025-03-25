import styled from "styled-components";

export const ProfileContainer = styled.section`
    text-align: center;
    width: 100%;
    max-width: 600px;
    margin: 30px auto;
`;

export const ProfileCard = styled.div`
    background: #0F1D35;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 14px rgba(59, 89, 152, 0.7);
    }
`;

export const ProfileInfo = styled.div`
    p {
        font-size: 1.2rem;
        color: #AAB7C4;
        margin-bottom: 12px;
    }
`;

export const ProfileActions = styled.div`
    margin-top: 20px;
`;
