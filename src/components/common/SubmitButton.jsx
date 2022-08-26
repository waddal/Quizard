import React from 'react';
import styled from 'styled-components';

const SubmitButton = ({ handleNext, isChecked, selected }) => {
  return (
    <StyledButton onClick={handleNext} disabled={selected === null}>
      {isChecked === false ? 'check' : 'next'}
    </StyledButton>
  );
};

export default SubmitButton;

const StyledButton = styled.button`
  width: 25%;
  height: 25px;
  position: absolute;
  bottom: 25px;

  &:enabled {
    box-shadow: 0 0 3px 1px #fff, 0 0 8px 4px #f0f, 0 0 10px 5px #0ff;
    transition: ease 0.1s;
  }
`;
