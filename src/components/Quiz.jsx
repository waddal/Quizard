import React from "react";
import styled from "styled-components";

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

const Questions = styled.div`
  display:flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

const Quiz = () => {
  return (
    <StyledQuiz>
      <Title>QUIZ</Title>
      <Questions>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <button>next</button>
      </Questions>
    </StyledQuiz>
  );
};

export default Quiz;
