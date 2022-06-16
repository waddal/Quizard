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
  resetGame,
} from "../actions/quizActions";
import { fetchSuccess } from "../actions/stateActions";
import Answers from "./Answers";
import PopupModule from "./PopupModule";

const Quiz = ({
  data,
  index,
  score,
  message,
  mode,
  answerIndex,
  isChecked,
  addIndex,
  addScore,
  setChecked,
  setMessage,
  setAnswerIndex,
  resetGame,
  fetchSuccess,
}) => {
  const [answers, setAnswers] = useState([]);
  const [choices, setChoices] = useState([]);
  const [selected, setSelected] = useState();
  const [module, setModule] = useState(false);
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

  const handleAnswerCheck = () => {
    let correct;

    answers.forEach((ans, index) => {
      if (ans === "true") {
        correct = index;
      }
    });

    setAnswerIndex(correct);
  };

  const handleChoice = (id) => {
    selected === id ? setSelected(null) : setSelected(id);
    handleAnswerCheck();
  };

  const handleNext = () => {
    setChecked(true);
    selected === answerIndex
      ? setMessage("Correct!")
      : setMessage(`the correct answer is option: ${answerIndex + 1}`);

    if (mode === "Sudden Death" && isChecked && message !== "Correct!") {
      console.log("dead");
      navigate("/result");
    }

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

  const handlePopupModule = (bool) => {
    setModule(!module);
    bool && navigate("/menu");
  };

  const reset = () => {
    setChoices([]);
    setAnswers([]);
    setSelected(null);
    setMessage(null);
    setChecked(false);
  };

  useEffect(() => {
    fetchSuccess();
    resetGame();
  }, []);

  useEffect(() => {
    reset();
    renderChoices();
    renderAnswers();
  }, [index]);

  return (
    <StyledQuiz>
      {module && (
        <PopupModule
          headerText="Are you sure you want to quit?"
          handlePopupModule={handlePopupModule}
        />
      )}
      <BorderWrap>
        <QuizContainer module={module}>
          <QuitButton onClick={() => handlePopupModule(false)}>X</QuitButton>
          <Question>{api.question}</Question>
          <Answers
            choices={choices}
            handleChoice={handleChoice}
            selected={selected}
          />
          <Category>Category: {api.category}</Category>
          <Score>Score: {score}</Score>
          <Index>
            {index}/{data.length}
          </Index>
          <SubmitButton onClick={handleNext} disabled={selected === null}>
            {isChecked === false ? "check" : "next"}
          </SubmitButton>
          <Message>{isChecked && <div>{message}</div>}</Message>
        </QuizContainer>
      </BorderWrap>
    </StyledQuiz>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.quizReducer.data,
    isChecked: state.quizReducer.isChecked,
    message: state.quizReducer.message,
    mode: state.quizReducer.mode,
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
  resetGame,
  fetchSuccess,
})(Quiz);

const StyledQuiz = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const BorderWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  background: linear-gradient(to right, red, purple);
`;

const QuizContainer = styled.div`
  height: 512px;
  width: clamp(600px, 650px, 90vw);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  opacity: ${({ module }) => module && 0.5};
  background: ${({ theme }) => theme.body};
`;

const QuitButton = styled.div`
  position: absolute;
  top: 6px;
  right: 10px;
  font-weight: 909;
  color: purple;
  border: none;
  background: transparent;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;

const Category = styled.h5`
  position: absolute;
  bottom: 5px;
  left: 8px;
`;

const Score = styled.div`
  position: absolute;
  top: 5px;
  left: 8px;
`;

const Index = styled.div`
  position: absolute;
  bottom: 5px;
  right: 8px;
`;

const Question = styled.div`
  text-align: center;
  line-height: 1.2;
  position: absolute;
  top: 70px;
  padding: 20px;
`;

const SubmitButton = styled.button`
  width: 25%;
  height: 25px;
  position: absolute;
  bottom: 25px;

  &:enabled {
    box-shadow: 0 0 3px 1px #fff, 0 0 8px 4px #f0f, 0 0 10px 5px #0ff;
    transition: ease 0.1s;
  }
`;

const Message = styled.div`
  font-size: 0.5rem;
  color: red;
  text-align: center;
  position: absolute;
  bottom: 3.5px;
`;
