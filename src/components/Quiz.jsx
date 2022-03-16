import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addIndex, addScore } from '../actions/quizActions';

const Quiz = (props) => {
  const { data, index, score, addIndex, addScore } = props;
  const [answers, setAnswers] = useState([]);
  const [choices, setChoices] = useState([]);
  const [selected, setSelected] = useState();
  const [check, setCheck] = useState(false);
  const [result, setResult] = useState(null);
  const navigate = useNavigate();
  const api = data[index];
  let answerIndex = 0;


  const renderChoices = () => {
    for (let choice in api.answers) {
      if (api.answers[choice] !== null) {
        setChoices((choices) => choices.concat(api.answers[choice]));
      }
    }
  };

  const renderAnswers = () => {
    console.log('renderAnwsers')
    for (let answer in api.correct_answers) {
      setAnswers((answers) => answers.concat(api.correct_answers[answer]));
    }
  };

  const correctAnswer = () => {
    console.log('correctAnswer hit')
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
    console.log('correct answers = ', answers);
    console.log('answerIndex: ', answerIndex);
  };

  const handleNext = () => {
    if (selected === correctAnswer()) {
      setCheck(!check);
      setResult("correct!");
    } else {
      setCheck(!check);
      setResult(`the correct answer is option: ${answerIndex + 1}`);
    }

    if (index < data.length - 1 && check) {
      if (result === "correct!") {
        addScore();
      }
      addIndex();
    } else if (index + 1 === data.length && check) {
      if (result === "correct!") {
        addScore();
      }
      navigate('/result')
    }
  };

  useEffect(() => {
    setChoices([]);
    setAnswers([]);
    setSelected(null);
    setResult(null);
    setCheck(false);
    renderChoices();
    renderAnswers();
  }, [index]);

  return (
    <StyledQuiz>
      <Title>QUIZ</Title>
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
    index: state.quizReducer.index,
    score: state.quizReducer.score,
  };
};

export default connect(mapStateToProps, { addIndex, addScore })(Quiz);


/* STYLES */
/* STYLES */
/* STYLES */

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
