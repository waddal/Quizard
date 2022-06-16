import React from "react";
import styled from "styled-components";

const Answers = ({ choices, handleChoice, selected }) => {
  const getClassName = (id) => {
    return (id = id === selected ? "_selected" : "");
  };

  return (
    <StyledAnswers>
      {choices.map((choice, idx) => {
        return (
          <button
            key={idx}
            className={`answer${getClassName(idx)}`}
            onFocus={() => handleChoice(idx)}
            selected={selected}
          >
            {choice}
          </button>
        );
      })}
    </StyledAnswers>
  );
};

export default Answers;

const StyledAnswers = styled.div`
  width: 80%;
  height: 60%;
  padding: 0px 20px;
  position: absolute;
  top: 150px;

  .answer {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 20px;
    padding: 2px;
    margin: 4px 0px;
    color: ${({ theme }) => theme.text};
    border: 1px solid purple;
    background: transparent;
    cursor: pointer;
  }

  .answer_selected {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 20px;
    padding: 2px;
    margin: 4px 0px;
    border: 1px solid grey;
    background-color: orange;
    cursor: pointer;
  }
`;
