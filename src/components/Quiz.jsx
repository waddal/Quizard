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

const Question = styled.div``;

const Answers = styled.div`
  .answer {
    width: 100%;
    height: 20px;
    padding: 2px;
    margin: 2px;
    background-color: ${props => props.selected ? 'orange' : '#ffeaea' };

    &:hover {
      background-color: ${props => props.selected ? 'orange' : '#fcffea' };
    }
  }

  .answer_selected {
    width: 100%;
    height: 20px;
    padding: 2px;
    margin: 2px;
    background-color: orange
  }
`;

const Answer = styled.div`
  width: 100%;
  height: 20px;
  padding: 2px;
  margin: 2px;
  background-color: ${props => props.selected ? 'orange' : '#ffeaea' };

  &:hover {
    background-color: ${props => props.selected ? 'orange' : '#fcffea' };
  }
`;

const Quiz = (props) => {
  const { data } = props;
  const [selected, setSelected] = useState();
  const [questionIndex, setQuestionIndex] = useState(0);

  const api = data[questionIndex];

  const getClassName = (id) => {
    return id = id === selected ? '_selected' : '';
  }

  const handleAnswer = (id) => {
    selected === id ? setSelected(null) : setSelected(id);
    // setSelected(!selected);
    console.log(id);
  }

  const handleNext = () => {
    if(questionIndex < data.length - 1){
    setQuestionIndex(questionIndex + 1)
    } else {
      return <h1>no futher for you</h1>
    }
  }

  return (
    <StyledQuiz>
      <Title>QUIZ</Title>
      <h5>Category: {api.category}</h5>
      <Question>
        <div>{api.question}</div>
      </Question>
      <Answers>
        {/* Find a way to dry this code one day... */}
        {/* {Object.keys(answers).map(answer => {
        return (
          <div>{answers}{answer}</div>
        )
      })} */}
        {api.answers.answer_a && <div className={`answer${getClassName(1)}`} onClick={() => handleAnswer(1)} selected={selected}>{api.answers.answer_a}</div>}
        {api.answers.answer_b && <div className={`answer${getClassName(2)}`} onClick={() => handleAnswer(2)} selected={selected}>{api.answers.answer_b}</div>}
        {api.answers.answer_c && <div className={`answer${getClassName(3)}`} onClick={() => handleAnswer(3)} selected={selected}>{api.answers.answer_c}</div>}
        {api.answers.answer_d && <div className={`answer${getClassName(4)}`} onClick={() => handleAnswer(4)} selected={selected}>{api.answers.answer_d}</div>}
        {api.answers.answer_e && <div className={`answer${getClassName(5)}`} onClick={() => handleAnswer(5)} selected={selected}>{api.answers.answer_e}</div>}
        {api.answers.answer_f && <div className={`answer${getClassName(6)}`} onClick={() => handleAnswer(6)} selected={selected}>{api.answers.answer_f}</div>}
      </Answers>
      <button disabled={!selected} onClick={handleNext}>next</button>
    </StyledQuiz>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.quizReducer.data,
  };
};

export default connect(mapStateToProps, {})(Quiz);
