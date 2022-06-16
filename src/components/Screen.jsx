import React from "react";
import styled from "styled-components";

const Screen = ({ children, wrapStyle = 1 }) => {
  return (
    <StyledScreen>
      {wrapStyle === 1 && <Wrap1>{children}</Wrap1>}
      {wrapStyle === 2 && <Wrap2>{children}</Wrap2>}
      {wrapStyle === 3 && <Wrap3>{children}</Wrap3>}
    </StyledScreen>
  );
};

export default Screen;

const StyledScreen = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
`;

const Wrap1 = styled(Wrap)`
  background: linear-gradient(to right, #20f2dd, purple);
`;

const Wrap2 = styled(Wrap)`
  background: linear-gradient(to right, #f6bc34, purple);
`;

const Wrap3 = styled(Wrap)`
  background: linear-gradient(to right, #fd5518, purple);
`;
