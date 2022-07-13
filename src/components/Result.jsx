import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const Result = ({ name, category, data, mode, score }) => {
  const navigate = useNavigate();
  const [categoryLabel] = useState(`${category}`);
  const [difficultyLabel] = useState(`${data[0].difficulty}`);
  const [modeLabel, setModeLabel] = useState(mode);
  const [scoreLabel] = useState(
    `You answered ${score} out of ${data.length} questions!`
  );
  const [titleLabel, setTitleLabel] = useState("Alakazam!");

  const generateTitle = () => {
    if (mode === "5") {
      if (score < 3) {
        setTitleLabel("Back to the books...");
      } else if (score > 3) {
        setTitleLabel("A true wizard of the 5!");
      } else {
        setTitleLabel("You did fairly well.");
      }
    }

    if (mode === "10") {
      if (score <= 3) {
        setTitleLabel("You must trust yourself. Trust your own strength..");
      } else if (score >= 5) {
        setTitleLabel("You must talk to yourself a lot.");
      } else if (score >= 8) {
        setTitleLabel("Alakazam!");
      }
    }

    if (mode === "Sudden Death") {
      if (score < 2) {
        setTitleLabel(
          "Death is just another path.. one that we all must take."
        );
      } else if (score <= 3) {
        setTitleLabel("Brave... but unrefined!");
      } else if (score >= 5) {
        setTitleLabel("Fearless!.. and quite bright.");
      } else if (score >= 10) {
        setTitleLabel("Intrepid AND intelligent! Impressive!");
      } else if (score >= 15) {
        setTitleLabel("Impeccable!");
      }
    }
  };

  const generateMode = () => {
    if (mode !== "Sudden Death") {
      mode === "10" ? setModeLabel("Ten") : setModeLabel("Five");
    }
  };

  const submission = {
    name: name,
    mode: mode === "Sudden Death" ? "☠️" : mode,
    difficulty: data[0].difficulty,
    category: category,
    score: score,
  };

  const handleSubmission = (submission) => {
    axios
      .post("http://localhost:9090/api", submission)
      .then(() => {
        navigate("/leaderboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    generateMode();
    generateTitle();
  }, []);

  const handleNavigateMenu = () => {
    navigate("/menu");
  };

  return (
    <StyledResult>
      <Title>{titleLabel}</Title>
      <Name>{name}</Name>
      <Score>{scoreLabel}</Score>
      <BorderWrap>
        <Results>
          <Label>Category:</Label>
          <Text>{categoryLabel}</Text>
          <Label>Difficulty:</Label>
          <Text>{difficultyLabel}</Text>
          <Label>Mode:</Label>
          <Text>{modeLabel}</Text>
        </Results>
      </BorderWrap>
      <ButtonContainer>
        <Button onPointerDown={handleNavigateMenu}>Main Menu</Button>
        <Button leaderboard onPointerDown={() => handleSubmission(submission)}>
          Submit Score
        </Button>
      </ButtonContainer>
    </StyledResult>
  );
};

const mapStateToProps = (state) => {
  return {
    name: state.quizReducer.name,
    category: state.quizReducer.category,
    data: state.quizReducer.data,
    mode: state.quizReducer.mode,
    score: state.quizReducer.score,
  };
};

export default connect(mapStateToProps)(Result);

const StyledResult = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  cursor: default;
`;

const Title = styled.h1`
  font-size: 2rem;
`;

const Name = styled.h3`
  font-size: 1.6rem;
  font-weight: 909;
  margin: 3%;
  animation: glow 1s ease-in-out infinite alternate;
  transform: translateZ(0);
  @keyframes glow {
    from {
      text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073,
        0 0 40px #e60073, 0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
    }
    to {
      text-shadow: 0 0 20px #fff, 0 0 30px #ff4da6, 0 0 40px #ff4da6,
        0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6, 0 0 80px #ff4da6;
    }
  }
`;

const Score = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 2%;
`;

const BorderWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  background: linear-gradient(to right, red, purple);
  margin-bottom: 2%;
`;

const Results = styled.div`
  min-width: 236px;
  padding: 20px;
  background: ${({ theme }) => theme.body};
  text-align: left;

  @media (min-width: 600px) {
    width: 40vw;
  }
`;

const Label = styled.h3`
  color: orange;
`;

const Text = styled.h3`
  margin-bottom: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Button = styled.button`
  width: 140px;
  height: 50px;
  background-color: ${({ leaderboard }) => (leaderboard ? "gold" : "silver")};
  margin: 0.5%;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${({ leaderboard }) =>
      leaderboard ? "#ffe74b" : "#f4f6ed"};
    box-shadow: 0 0 3px 1px #fff, 0 0 8px 4px #f0f, 0 0 10px 5px #0ff;
    transition: ease 0.1s;
  }
`;
