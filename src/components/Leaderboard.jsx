import React from "react";
import styled from "styled-components";
import Screen from "./Screen";

const Leaderboard = () => {
  return (
    <Screen>
      <Header>
        <h1>Leaderboard!</h1>
        <Search></Search>
        <Filters>
          <Filter></Filter>
        </Filters>
      </Header>
      <ul>
        <li>
          #1<h2>Gandalf</h2>
        </li>
        <li>
          #2<h2>Mona</h2>
        </li>
        <li>
          #3<h2>Zepharo</h2>
        </li>
      </ul>
    </Screen>
  );
};

export default Leaderboard;

const Header = styled.header`
  width: 100%;
  height: 60px;
`;

const Search = styled.input``;
const Filters = styled.div``;
const Filter = styled.input``;
