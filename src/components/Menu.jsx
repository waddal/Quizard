import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { connect } from "react-redux";
import useSound from "use-sound";

import tuneSfx from "../assets/audio/tune.mp3";
import popSfx from "../assets/audio/pop.mp3";

const Menu = ({ theme, themeToggler }) => {
  const [settings, setSettings] = useState(true);
  const [musicOn, setMusicOn] = useState(false);
  const [tune, exposedData] = useSound(tuneSfx);
  const [pop] = useSound(popSfx, { volume: 0.03 });
  const navigate = useNavigate();

  const handleSettings = () => {
    setSettings(!settings);
  };

  const toggleMusic = () => {
    //if music is off, turn it on and set musicOn state var to true
    if (!musicOn) {
      setMusicOn(true);
      tune();
      console.log("PLAY");
    } else {
      setMusicOn(false);
      exposedData.stop();
      console.log("STOP");
    }
  };

  return (
    <StyledMenu>
      <Title>Menu</Title>
      {settings ? (
        <>
          <NewGameButton
            onClick={() => navigate("/settings")}
            onMouseOver={pop}
          >
            New Game
          </NewGameButton>
          <LeaderboardButton
            onMouseOver={pop}
            onClick={() => navigate("/leaderboard")}
          >
            Leaderboard
          </LeaderboardButton>
        </>
      ) : (
        <>
          <ThemeButton onClick={themeToggler} onMouseOver={pop} theme={theme}>
            Theme
          </ThemeButton>
          <MusicButton onClick={toggleMusic} onMouseOver={pop}>
            Music
          </MusicButton>
        </>
      )}
      <SettingsButton
        onClick={handleSettings}
        onMouseOver={pop}
        settings={settings}
      >
        Settings
      </SettingsButton>
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
  transition: ease 0.1s;

  &:hover,
  &:focus {
    box-shadow: 0 0 3px 1px #fff, 0 0 8px 4px #f0f, 0 0 10px 5px #0ff;
    transition: ease 0.1s;
  }
`;
//MAIN MENU
const NewGameButton = styled(Button)`
  background-color: #98ea75;
  box-shadow: 0 0 2px 1px #0ff;

  &:hover {
    background-color: #6be338;
  }
`;

const LeaderboardButton = styled(Button)`
  background-color: #eada75;

  &:hover {
    background-color: #ffe74b;
  }
`;

const SettingsButton = styled(Button)`
  background-color: ${(props) =>
    props.settings === true ? "#ff678a" : "#fc537a"};
  box-shadow: ${(props) =>
    props.settings === false ? "0 0 2px 1px #0ff" : null};

  &:hover {
    background-color: #fc537a;
  }
`;

//SETTINGS
const ThemeButton = styled(Button)`
  color: ${(props) => (props.theme === "light" ? "white" : "black")};
  background-color: ${(props) =>
    props.theme === "light" ? "#3b3b3b" : "#e5e5e5"};

  &:hover {
    background-color: ${(props) =>
      props.theme === "light" ? "black" : "white"};
  }
`;
const MusicButton = styled(Button)`
  background-color: #9d75f9;

  &:hover {
    background-color: #8a5bf7;
  }
`;
