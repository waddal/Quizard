import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const Quiz = (props) => {
  const { data } = props;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [choices, setChoices] = useState([]);
  const [selected, setSelected] = useState();
  const [check, setCheck] = useState(false);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const api = data[questionIndex];

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

  let answerIndex = 0;
  const correctAnswer = () => {
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === "true") {
        return answerIndex;
      } else {
        answerIndex++;
      }
      return answerIndex;
    }
  };

  const getClassName = (id) => {
    return (id = id === selected ? "_selected" : "");
  };

  const handleChoice = (id) => {
    selected === id ? setSelected(null) : setSelected(id);

  };

  const handleNext = () => {
    if (selected === correctAnswer()) {
      setCheck(!check);
      setResult("correct!");
    } else {
      setCheck(!check);
      setResult(`the correct answer is option: ${answerIndex + 1}`);
    }

    if (questionIndex < data.length - 1 && check) {
      if (result === "correct!") {
        setScore(score + 1);
      }
      setQuestionIndex(questionIndex + 1);
    } else if (questionIndex + 1 === data.length && check) {
      if (result === "correct!") {
        setScore(score + 1);
      }
      navigate('/result')
    }
  };

  useEffect(() => {
    setChoices([]);
    renderChoices();
    renderAnswers();
    setSelected(null);
    setResult(null);
    setCheck(false);

  }, [questionIndex]);

  return (
    <StyledQuiz>
      <Title>QUIZ</Title>
      <h5>Category: {api.category}</h5>
      <div>
        Score: {score} out of {questionIndex}/{data.length}
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
              disabled={check}
            >
              {choice}
            </div>
          );
        })}
      </Answers>
      <Button onClick={handleNext}>{check === false ? "check" : "next"}</Button>
      {check && <div>{result}</div>}
    </StyledQuiz>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.quizReducer.data,
  };
};

export default connect(mapStateToProps, {})(Quiz);

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
    background-color: ${(props) => (props.selected ? `${theme => theme.accent}` : `${theme => theme.text}`)};

    &:hover {
      background-color: ${(props) => (props.selected ? "orange" : `${theme => theme.accent}`)};
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
