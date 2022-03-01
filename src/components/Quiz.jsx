import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const StyledQuiz = styled.div`
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

const Question = styled.div`
`;

const Answers = styled.div``;

const Answer = styled.div`
  width:100%;
  height:20px;
  padding:2px;
  margin:2px;
  background-color: #ffeaea;

  &:hover {
    background-color: #fcffea;
  }
`;

const Quiz = (props) => {
  const { data } = props;
  const [isAnswered, setIsAnswered] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);

  const answers = data[questionIndex].answers;

  return (
    <StyledQuiz>
      <Title>QUIZ</Title>
        <h5>Category: {data[questionIndex].category}</h5>
      <Question>
        <div>{data[questionIndex].question}</div>
      </Question>
      <Answers>
      {/* {Object.keys(answers).map(answer => {
        return (
          <div>{answers}{answer}</div>
        )
      })} */}
      {answers.answer_a === null ? null : <Answer>{answers.answer_a}</Answer>}
      {answers.answer_b === null ? null : <Answer>{answers.answer_b}</Answer>}
      {answers.answer_c === null ? null : <Answer>{answers.answer_c}</Answer>}
      {answers.answer_d === null ? null : <Answer>{answers.answer_d}</Answer>}
      {answers.answer_e === null ? null : <Answer>{answers.answer_e}</Answer>}
      {answers.answer_f === null ? null : <Answer>{answers.answer_f}</Answer>}
      </Answers>
        <button>next</button>
    </StyledQuiz>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.quizReducer.data,
  };
};

export default connect(mapStateToProps, {})(Quiz);
