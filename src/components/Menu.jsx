import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import useSound from 'use-sound';
import tuneSfx from '../assets/audio/tune.mp3';
import popSfx from '../assets/audio/pop.mp3';

const Menu = (props) => {
  const [settings, setSettings] = useState(false);
  const [tune] = useSound(tuneSfx);
  const [pop] = useSound(popSfx, {volume: 0.01});
  const { theme, themeToggler } = props;
  const navigate = useNavigate();

  const handleSettings = () => {
    setSettings(!settings);
  };

  useEffect(() => {
    setSettings(true);
  }, [])

  return (
    <StyledMenu>
      <Title>Menu</Title>
      {settings ? (
        <>
          <Button onClick={() => navigate("/settings")} onMouseOver={pop}>New Game</Button>
          <Button onMouseOver={pop}>Hiscores</Button>
          <Button onClick={handleSettings} onMouseOver={pop}>Settings</Button>
        </>
      ) : (
        <>
          <Button onClick={themeToggler} onMouseOver={pop}>Theme</Button>
          <Button onClick={tune} onMouseOver={pop}>Music</Button>
          <Button onClick={handleSettings} onMouseOver={pop}>Settings</Button>
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
