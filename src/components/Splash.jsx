import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
        <Icon src={"#"} alt="github"></Icon>
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
  margin:2%;
`;

const Button = styled.button`
  width: 140px;
  height: 50px;
  background-color: silver;
  margin: 1%;

  &:hover {
    background-color: #f4f6ed;
  }
`;

const Social = styled.a``;

const Icon = styled.img`
  height: 2rem;
  width: 2rem;
  padding: 5px;
  margin: 2%;
`;
