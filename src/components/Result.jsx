import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Result = ({ category, data, mode, score }) => {
  const navigate = useNavigate();
  const [categoryLabel] = useState(`${category}`);
  const [difficultyLabel] = useState(`${data[0].difficulty}`);
  const [modeLabel, setModeLabel] = useState("");
  const [scoreLabel] = useState(
    `You answered ${score} out of ${data.length} questions!`
  );
  const [titleLabel] = useState("Alakazam!");

  useEffect(() => {
    mode === "Sudden Death"
      ? setModeLabel("Sudden Death")
      : setModeLabel(`${mode} of ${mode}`);
  }, []);

  const handleNavigateMenu = () => {
    navigate("/menu");
  };

  return (
    <StyledResult>
      <Title>{titleLabel}</Title>
      <Results>
        <Message></Message>
        <Score>{scoreLabel}</Score>
        <Category>{categoryLabel}</Category>
        <Difficulty>{difficultyLabel}</Difficulty>
        <Mode>{modeLabel}</Mode>
      </Results>
      <Button onPointerDown={handleNavigateMenu}>Main Menu</Button>
    </StyledResult>
  );
};

const mapStateToProps = (state) => {
  return {
    category: state.quizReducer.category,
    data: state.quizReducer.data,
    mode: state.quizReducer.mode,
    score: state.quizReducer.score,
  };
};

export default connect(mapStateToProps, {})(Result);

const StyledResult = styled.div`
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

const Results = styled.div``;
const Message = styled.div``;
const Score = styled.div``;
const Category = styled.div``;
const Difficulty = styled.div``;
const Mode = styled.div``;

const Button = styled.button`
  width: 140px;
  height: 50px;
  background-color: silver;
  margin: 0.5%;

  &:hover {
    background-color: #f4f6ed;
  }
`;
