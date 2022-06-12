import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  addIndex,
  addScore,
  setChecked,
  setMessage,
  setAnswerIndex,
} from "../actions/quizActions";

const Quiz = (props) => {
  const {
    data,
    index,
    score,
    message,
    answerIndex,
    isChecked,
    addIndex,
    addScore,
    setChecked,
    setMessage,
    setAnswerIndex,
  } = props;
  const [answers, setAnswers] = useState([]);
  const [choices, setChoices] = useState([]);
  const [selected, setSelected] = useState();
  const navigate = useNavigate();
  const api = data[index];

  const renderChoices = () => {
    for (let choice in api.answers) {
      if (api.answers[choice] !== null) {
        setChoices((choices) => choices.concat(api.answers[choice]));
      }
    }
  };

  const renderAnswers = () => {
    for (let answer in api.correct_answers) {
      setAnswers((answers) => answers.concat(api.correct_answers[answer]));
    }
  };

  const correctAnswer = () => {
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === "true") {
        setAnswerIndex(i);
        return answerIndex;
      }
      return answerIndex;
    }
  };

  const getClassName = (id) => {
    return (id = id === selected ? "_selected" : "");
  };

  const handleChoice = (id) => {
    selected === id ? setSelected(null) : setSelected(id);
    correctAnswer();
  };

  const handleNext = async () => {
    setChecked(true);
    (await selected) === answerIndex
      ? setMessage("Correct!")
      : setMessage(`the correct answer is option: ${answerIndex + 1}`);

    if (index < data.length - 1 && isChecked) {
      if (message === "Correct!") {
        addScore();
      }
      addIndex();
    } else if (index + 1 === data.length && isChecked) {
      if (message === "Correct!") {
        addScore();
      }
      navigate("/result");
    }
  };

  const reset = () => {
    setChoices([]);
    setAnswers([]);
    setSelected(null);
    setMessage(null);
    setChecked(false);
  };

  useEffect(() => {
    reset();
    renderChoices();
    renderAnswers();
  }, [index]);

  return (
    <StyledQuiz>
      <Title>QUIZ index:{index}</Title>
      <h5>Category: {api.category}</h5>
      <div>
        Score: {score} out of {index}/{data.length}
      </div>
      <Question>
        <div>{api.question}</div>
      </Question>
      {}
      <Answers>
        {choices.map((choice, idx) => {
          return (
            <div
              key={idx}
              className={`answer${getClassName(idx)}`}
              onClick={() => handleChoice(idx)}
              selected={selected}
              disabled={isChecked}
            >
              {choice}
            </div>
          );
        })}
      </Answers>
      <Button onClick={handleNext}>
        {isChecked === false ? "check" : "next"}
      </Button>
      {isChecked && <div>{message}</div>}
    </StyledQuiz>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.quizReducer.data,
    isChecked: state.quizReducer.isChecked,
    message: state.quizReducer.message,
    answerIndex: state.quizReducer.answerIndex,
    index: state.quizReducer.index,
    score: state.quizReducer.score,
  };
};

export default connect(mapStateToProps, {
  addIndex,
  addScore,
  setChecked,
  setMessage,
  setAnswerIndex,
})(Quiz);

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

const Question = styled.div``;

const Answers = styled.div`
  cursor: pointer;

  .answer {
    width: 100%;
    height: 20px;
    padding: 2px;
    margin: 2px;
    background-color: ${(props) =>
      props.selected
        ? `${(theme) => theme.accent}`
        : `${(theme) => theme.text}`};

    &:hover {
      background-color: ${(props) =>
        props.selected ? "orange" : `${(theme) => theme.accent}`};
    }
  }

  .answer_selected {
    width: 100%;
    height: 20px;
    padding: 2px;
    margin: 2px;
    background-color: orange;
  }
`;

const Button = styled.button`
  width: 25%;
  height: 25px;
`;
