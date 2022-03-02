import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const Quiz = (props) => {
  const { data } = props;
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState();
  const [choices, setChoices] = useState([]);
  const [selected, setSelected] = useState();
  const [check, setCheck] = useState(false);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);

  const api = data[questionIndex];

  const renderChoices = () => {
    for(let choice in api.answers){
      if(api.answers[choice] !== null){
        setChoices(choices => choices.concat(api.answers[choice]))
      }
    }
  } 

  const correctAnswer = () => {
    for(let ans in api.correct_answers){ 
      if(api.correct_answers[ans] === "true"){
        return ans
      }
    }
  };

  useEffect(() => {
    setChoices([]);
    renderChoices();
    setSelected(null);
    setAnswer(correctAnswer());
    setResult(null)
    setCheck(false)
    console.log('cheater!', answer);

  }, [questionIndex])

  const getClassName = (id) => {
    return (id = id === selected ? "_selected" : "");
  };

  const handleChoice = (id) => {
    selected === id ? setSelected(null) : setSelected(id);
  };

  const handleNext = () => {
    if(`answer_${selected}_correct` === answer){
      setCheck(!check);
      setResult('correct!');
    } else {
      setCheck(!check)
      setResult(`the correct answer is: unavailable lol`);
    }

    if (questionIndex < data.length - 1 && check) {
      if(result === "correct!"){
        setScore(score + 1);
      }
      setQuestionIndex(questionIndex + 1);
    }
  };

  return (
    <StyledQuiz>
      <Title>QUIZ</Title>
      <h5>Category: {api.category}</h5>
      <div>Score: {score} out of {questionIndex}/{data.length}</div>
      <Question>
        <div>{api.question}</div>
      </Question>
      {}
      <Answers>
        {choices.map((choice, idx) => {
          return (
            <div className={`answer${getClassName(idx)}`} onClick={() => handleChoice(idx)} selected={selected}>{choice}</div>
          )
        })}
      </Answers>
      <Button disabled={!selected} onClick={handleNext}>
        {check === false ? 'check' : 'next'}
      </Button>
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
  cursor:pointer;

  .answer {
    width: 100%;
    height: 20px;
    padding: 2px;
    margin: 2px;
    background-color: ${(props) => (props.selected ? "orange" : "#ffeaea")};

    &:hover {
      background-color: ${(props) => (props.selected ? "orange" : "#fcffea")};
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