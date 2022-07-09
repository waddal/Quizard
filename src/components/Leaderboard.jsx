import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Screen from "./Screen";

const Leaderboard = () => {
  const [wizards, setWizards] = useState([]);
  const navigate = useNavigate();
  const handleNavigateMenu = () => {
    navigate("/menu");
  };

  useEffect(() => {
    axios
      .get("http://localhost:9090/api")
      .then((res) => {
        setWizards(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <Screen>
      <StyledLeaderboard>
        <Header>
          <Title>Leaderboard</Title>
          <Filters>
            <Search type={"text"} placeholder={"Wizard Name"} />
            <Filter type={"dropdown"}>
              <option value="Difficulty">Difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </Filter>
            <Filter type={"dropdown"}>
              <option value="Mode">Mode</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="SuddenDeath">Sudden Death</option>
            </Filter>
          </Filters>
        </Header>
        <Board>
          {wizards.map((wizard, index) => {
            return (
              <BoardListing key={index}>
                <ListColumn name>{wizard.name}</ListColumn>
                <ListColumn>{wizard.difficulty}</ListColumn>
                <ListColumn>{wizard.mode}</ListColumn>
                <ListColumn score>{wizard.score}</ListColumn>
              </BoardListing>
            );
          })}
        </Board>
        <ButtonContainer>
          <Button onPointerDown={handleNavigateMenu}>Main Menu</Button>
        </ButtonContainer>
      </StyledLeaderboard>
    </Screen>
  );
};

export default Leaderboard;

const StyledLeaderboard = styled.div`
  display: flex;
  flex-direction: column;
  height: 512px;
  width: clamp(600px, 650px, 90vw);
  background: ${({ theme }) => theme.body};
`;

const Header = styled.header`
  text-align: center;
  width: 100%;
  height: auto;
  padding: 10px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 10px;
`;
const Filters = styled.div``;
const Search = styled.input`
  margin-right: 10px;
`;
const Filter = styled.select`
  text-align: center;
  width: auto;
`;
const Board = styled.ul`
  padding: 10px;
  overflow: scroll;
  height: 300px;

  li {
    margin: 5px 10px;
  }
`;

const BoardListing = styled.li`
  display: flex;
  border-bottom: 1px solid gold;
  border-right: 1px solid gold;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

const ListColumn = styled.div`
  flex: 1;
  flex: ${({ name }) => name && 1.5};
  flex: ${({ score }) => score && 0.2};
`;

const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  width: 140px;
  height: 50px;
  background-color: "silver";

  &:hover,
  &:focus {
    box-shadow: 0 0 3px 1px #fff, 0 0 8px 4px #f0f, 0 0 10px 5px #0ff;
    transition: ease 0.1s;
  }
`;
