import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import logo from "../assets/visual/github.png";

const Splash = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate("/menu");
  };

  return (
    <StyledSplash>
      <Title>Quizard</Title>
      <Button onClick={handleEnter}>ENTER</Button>
      <Social href="https://github.com/waddal/quizard" target="_blank">
        <Icon src={logo} alt="github" />
      </Social>
    </StyledSplash>
  );
};

export default Splash;

const StyledSplash = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin: 2%;
`;

const Button = styled.button`
  width: 140px;
  height: 50px;
  background-color: silver;
  margin: 1%;
  transition: all 0.4s ease-out;

  &:hover {
    background-color: #f4f6ed;
    box-shadow: 0 0 6px 3px #fff, 0 0 16px 8px #f0f, 0 0 20px 10px #0ff;
  }
`;

const Social = styled.a``;

const Icon = styled.img`
  height: 2rem;
  width: 2rem;
  margin: 2%;
  border-radius: 50%;
  background-color: white;

  &:hover {
    box-shadow: 0 0 4px 2px #0ff;
  }
`;
