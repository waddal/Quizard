import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Screen from "./Screen";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [filtered, setFilteredList] = useState([]);
  const navigate = useNavigate();
  const handleNavigateMenu = () => {
    navigate("/menu");
  };

  const handleSearchFilter = (e) => {
    const keyword = e.target.value;
    if (keyword !== "") {
      let filtered = leaderboard.filter((wizard) => {
        return wizard.name.toUpperCase().startsWith(keyword.toUpperCase());
      });
      setFilteredList(filtered);
    } else {
      setFilteredList(leaderboard);
    }
  };

  const handleModeFilter = (e) => {
    const keyword = e.target.value;
    if (keyword !== "All") {
      const filtered = leaderboard.filter((wizard) => {
        return wizard.mode === keyword;
      });
      setFilteredList(filtered);
    } else {
      setFilteredList(leaderboard);
    }
  };

  const handleDifficultyFilter = (e) => {
    const keyword = e.target.value;
    if (keyword !== "All") {
      const filtered = leaderboard.filter((wizard) => {
        return wizard.difficulty === keyword;
      });
      setFilteredList(filtered);
    } else {
      setFilteredList(leaderboard);
    }
  };

  const handleCategoryFilter = (e) => {
    const keyword = e.target.value;
    if (keyword !== "All") {
      const filtered = leaderboard.filter((wizard) => {
        return wizard.category === keyword;
      });
      setFilteredList(filtered);
    } else {
      setFilteredList(leaderboard);
    }
  };

  const sortLeaderboard = () => {
    let sorted = filtered.sort((a, b) => {
      return b.score - a.score;
    });
    setLeaderboard(sorted);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_DATABASE_URL}/api`)
      .then((res) => {
        setFilteredList(res.data);
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
            <Search
              type={"text"}
              placeholder={"Wizard"}
              onChange={handleSearchFilter}
            />
            <Filter
              type={"dropdown"}
              onChange={handleCategoryFilter}
              defaultValue="Category"
            >
              <option value="Category" disabled>
                Category
              </option>
              <option value="All">All</option>
              <option value="Any">Any</option>
              <option value="Bash">Bash</option>
              <option value="Code">Code</option>
              <option value="SQL">SQL</option>
              <option value="DevOps">DevOps</option>
              <option value="CMS">CMS</option>
              <option value="Linux">Linux</option>
              <option value="Docker">Docker</option>
            </Filter>
            <Filter
              type={"dropdown"}
              onChange={handleDifficultyFilter}
              defaultValue="Difficulty"
            >
              <option value="Difficulty" disabled>
                Difficulty
              </option>
              <option value="All">All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </Filter>
            <Filter
              type={"dropdown"}
              onChange={handleModeFilter}
              defaultValue="Mode"
            >
              <option value="Mode" disabled>
                Mode
              </option>
              <option value="All">All</option>
              <option value="5">Five</option>
              <option value="10">Ten</option>
              <option value="☠️">Sudden Death</option>
            </Filter>
            <button onClick={sortLeaderboard}>Sort</button>
          </Filters>
        </Header>
        <Board>
          {filtered.map((wizard, index) => {
            return (
              <BoardListing key={index}>
                <ListColumn type={"name"}>{wizard.name}</ListColumn>
                <ListColumn type={"category"}>{wizard.category}</ListColumn>
                <ListColumn type={"difficulty"}>{wizard.difficulty}</ListColumn>
                <ListColumn type={"mode"}>{wizard.mode}</ListColumn>
                <ListColumn type={"score"}>{wizard.score}</ListColumn>
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
  min-height: 90vh;
  width: 90vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: ${({ module }) => module && 0.5};
  background: ${({ theme }) => theme.body};
  padding: 20px;
  box-sizing: border-box;

  @media (min-width: 600px) {
    width: 60vw;
  }
`;

const Header = styled.header`
  text-align: center;
  width: 100%;
  height: auto;
  padding: 10px;
  box-sizing: border-box;
`;

const Title = styled.h1`
  font-size: 4vh;
  margin-bottom: 10px;

  @media (min-width: 600px) {
    font-size: 6vh;
  }
`;
const Filters = styled.div`
  button {
    margin-left: 5px;
  }
`;
const Search = styled.input`
  margin-right: 5px;
  width: 120px;
`;
const Filter = styled.select`
  text-align: center;
  width: 110px;
  margin-left: 5px;
`;
const Board = styled.ul`
  width: 90%;
  height: 100%;
  padding: 10px;
  overflow: scroll;

  li {
    margin: 5px 10px;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

const BoardListing = styled.li`
  display: flex;
  border-bottom: 1px solid gold;
  border-right: 1px solid gold;
  overflow: scroll;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

const ListColumn = styled.div`
  flex: 1;
  flex: ${({ type }) => type === "name" && 1.5};
  flex: ${({ type }) => type === "category" && 0.5};
  flex: ${({ type }) => type === "difficulty" && 0.5};
  flex: ${({ type }) => type === "mode" && 0.3};
  flex: ${({ type }) => type === "score" && 0.1};
  overflow: hidden;

  @media (max-width: 600px) {
    flex: ${({ type }) => type === "name" && 0.9};
    display: ${({ type }) => type === "category" && "none"};
    display: ${({ type }) => type === "difficulty" && "none"};
  }
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
  cursor: pointer;

  &:hover,
  &:focus {
    box-shadow: 0 0 3px 1px #fff, 0 0 8px 4px #f0f, 0 0 10px 5px #0ff;
    transition: ease 0.1s;
  }
`;
