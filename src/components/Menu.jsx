import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";

const Menu = (props) => {
  const [settings, setSettings] = useState(false);
  const [music, setMusic] = useState(false);
  const { theme, themeToggler } = props;
  const navigate = useNavigate();

  const handleSettings = () => {
    setSettings(!settings);
  };

  const handleMusic = () => {
    setMusic(!music);
  };

  useEffect(() => {
    setSettings(true);
  }, [])

  return (
    <StyledMenu>
      <Title>Menu</Title>
      {settings ? (
        <>
          <Button onClick={() => navigate("/settings")}>New Game</Button>
          <Button>Hiscores</Button>
          <Button onClick={handleSettings}>Settings</Button>
        </>
      ) : (
        <>
          <Button onClick={themeToggler}>Theme</Button>
          <Button>Music</Button>
          <Button onClick={handleSettings}>Settings</Button>
        </>
      )}
    </StyledMenu>
  );
};

const mapStateToProps = (state) => {
  return {
    title: state.title,
  };
};

export default connect(mapStateToProps, {})(Menu);

const StyledMenu = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin: 1%;
`;

const Button = styled.button`
  width: 140px;
  height: 50px;
  background-color: silver;
  margin: 0.5%;

  &:hover {
    background-color: #f4f6ed;
  }
`;
