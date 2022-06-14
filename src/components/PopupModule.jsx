import React from 'react';
import styled from 'styled-components';

const PopupModule = ({headerText, handleModuleChoice}) => {
    return (
        <StyledModule>
            <Header>{headerText}</Header>
            <Button onClick={() => handleModuleChoice(true)}>Yes</Button>
            <Button onClick={() => handleModuleChoice(false)}>No</Button>
        </StyledModule>
    )
}

export default PopupModule;

const StyledModule = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #777575;
  border: 2px solid red;
  z-index: 1;
  opacity: 0.9;
`;

const Header = styled.header`
text-align: center;
  font-size: 1rem;
  padding-bottom: 15px;
  margin: 1%;
`;

const Button = styled.button`
  width: 70px;
  height: 25px;
  background-color: silver;
  margin: 0.5%;

  &:hover {
    background-color: #dd3309;
  }
`;