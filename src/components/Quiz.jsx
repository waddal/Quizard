import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

const Quiz = (props) => {
  const { data } = props;
  const [selected, setSelected] = useState();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState();
  const api = data[questionIndex];
  console.log(answer);
  
  const correctAnswer = () => {
    for(let ans in api.correct_answers){ 
      if(api.correct_answers[ans] === "true"){
        return ans
      }
    }
  };

  useEffect(() => {
    setSelected(null);
    setAnswer(correctAnswer());
  }, [questionIndex])

  const getClassName = (id) => {
    return (id = id === selected ? "_selected" : "");
  };

  const handleChoice = (id) => {
    selected === id ? setSelected(null) : setSelected(id);
  };

  const handleNext = () => {
    if(`answer_${selected}_correct` === answer){
      console.log('right!');
    } else {
      console.log('wrong!');
    }

    if (questionIndex < data.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else {
      console.log('you shall not pass')
    }
  };

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
        )})} */}
        {api.answers.answer_a && <div className={`answer${getClassName('a')}`} onClick={() => handleChoice('a')} selected={selected}>{api.answers.answer_a}</div>}
        {api.answers.answer_b && <div className={`answer${getClassName('b')}`} onClick={() => handleChoice('b')} selected={selected}>{api.answers.answer_b}</div>}
        {api.answers.answer_c && <div className={`answer${getClassName('c')}`} onClick={() => handleChoice('c')} selected={selected}>{api.answers.answer_c}</div>}
        {api.answers.answer_d && <div className={`answer${getClassName('d')}`} onClick={() => handleChoice('d')} selected={selected}>{api.answers.answer_d}</div>}
        {api.answers.answer_e && <div className={`answer${getClassName('e')}`} onClick={() => handleChoice('e')} selected={selected}>{api.answers.answer_e}</div>}
        {api.answers.answer_f && <div className={`answer${getClassName('f')}`} onClick={() => handleChoice('f')} selected={selected}>{api.answers.answer_f}</div>}
      </Answers>
      <Button disabled={!selected} onClick={handleNext}>
        next
      </Button>
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