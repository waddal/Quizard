import React from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Result = ({ category, data, mode, score }) => {
  const navigate = useNavigate();
  console.log(data);
  return (
    <StyledResult>
      <Title>Alakazam!</Title>
      <Results>
        <Message></Message>
        <Score>You answered {score} out of {data.length} questions!</Score>
        <Category>{category}</Category>
        <Difficulty>{data[0].difficulty}</Difficulty>
        <Mode>{mode} of {mode}</Mode>
      </Results>
      <Button onClick={() => navigate("/menu")}>Main Menu</Button>
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
