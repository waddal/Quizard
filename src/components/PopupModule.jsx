import React from "react";
import styled from "styled-components";

const PopupModule = ({ headerText, handlePopupModule }) => {
  return (
    <StyledModule>
      <Header>{headerText}</Header>
      <Button onClick={() => handlePopupModule(true)}>Yes</Button>
      <Button onClick={() => handlePopupModule(false)}>No</Button>
    </StyledModule>
  );
};

export default PopupModule;

const StyledModule = styled.div`
  height: 30%;
  width: 30%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.body};
  border: 2px solid red;
  position: absolute;
  z-index: 1;
`;

const Header = styled.header`
  text-align: center;
  font-size: 1rem;
  padding: 15px;
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
