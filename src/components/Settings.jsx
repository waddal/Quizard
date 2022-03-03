import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BASE_URL, API_KEY } from "../constants";
import axios from "axios";
import * as yup from "yup";
import schema from "../validation/formSchema";
import categories from "../data/categories";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setData } from "../actions/quizActions";
import useSound from "use-sound";
import popSfx from "../assets/audio/pop.mp3";

// import dotenv from "dotenv";
// dotenv.config({ path: ".env" });

const initialFormValues = {
  mode: "",
  category: "",
  difficulty: "",
};

const initialFormErrors = {
  mode: "",
  category: "",
  difficulty: "",
};

const initialDisabled = true;

const Settings = (props) => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
  const [pop] = useSound(popSfx, { volume: 0.01 });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit!");
    axios
      .get(`${BASE_URL}${API_KEY}`, {
        params: {
          limit: `${formValues.mode}`,
          category:
            `${formValues.category}` === "Any" ? "" : `${formValues.category}`,
          difficulty: `${formValues.difficulty}`,
        },
      })
      .then((res) => {
        console.log("data: ", res.data);
        props.setData(res.data);
        navigate("/quiz");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    yup
      .reach(schema, name)
      .validate(value)
      .then(() => {
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    schema.isValid(formValues).then((valid) => {
      setDisabled(!valid);
    });
  }, [formValues]);

  return (
    <StyledSettings>
      <Title>SETTINGS</Title>
      <Form onSubmit={handleSubmit}>
        <SettingsSection>
          <SettingTitle>Mode</SettingTitle>
          <label className="modeSelect">
            {" "}
            5
            <input
              type="radio"
              name="mode"
              id="5"
              value="5"
              checked={formValues.mode === "5"}
              onChange={handleChange}
              onMouseOver={pop}
            />
          </label>
          <label className="modeSelect">
            {" "}
            10
            <input
              type="radio"
              name="mode"
              value="10"
              checked={formValues.mode === "10"}
              onChange={handleChange}
              onMouseOver={pop}
            />
          </label>
          <label className="modeSelect">
            {" "}
            ☠️
            <input
              type="radio"
              name="mode"
              value="20"
              checked={formValues.mode === "20"}
              onChange={handleChange}
              onMouseOver={pop}
            />
          </label>
        </SettingsSection>
        <SettingsSection>
          <SettingTitle>Difficulty</SettingTitle>
          <label className="modeSelect">
            {" "}
            easy
            <input
              type="radio"
              name="difficulty"
              id="easy"
              value="easy"
              checked={formValues.difficulty === "easy"}
              onChange={handleChange}
              onMouseOver={pop}
            />
          </label>
          <label className="difficultySelect">
            {" "}
            medium
            <input
              type="radio"
              name="difficulty"
              value="medium"
              checked={formValues.difficulty === "medium"}
              onChange={handleChange}
              onMouseOver={pop}
            />
          </label>
          <label className="difficultySelect">
            {" "}
            hard
            <input
              type="radio"
              name="difficulty"
              value="hard"
              checked={formValues.difficulty === "hard"}
              onChange={handleChange}
              onMouseOver={pop}
            />
          </label>
          {/* <label>
            <select
              name="difficulty"
              value={formValues.difficulty}
              onChange={handleChange}
            >
              <option value=""> -- </option>
              <option value="easy"> easy </option>
              <option value="medium"> medium </option>
              <option value="hard"> hard </option>
            </select>
          </label> */}
        </SettingsSection>
        <CategorySection>
          <SettingTitle>Category</SettingTitle>
          {categories.map((item, idx) => {
            return (
              <label key={idx}>
                <input
                  type="radio"
                  name="category"
                  id={item}
                  value={item}
                  checked={formValues.category === item}
                  onChange={handleChange}
                  onMouseOver={pop}
                />{" "}
                {item} &nbsp;
              </label>
            );
          })}
        </CategorySection>
        <br></br>
      </Form>
      <Button disabled={disabled} onClick={handleSubmit} onMouseOver={pop}>
        start
      </Button>
      <Errors>
        <Error>{formErrors.difficulty}</Error>
        <Error>{formErrors.category}</Error>
        <Error>{formErrors.mode}</Error>
      </Errors>
    </StyledSettings>
  );
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

export default connect(mapStateToProps, { setData })(Settings);

const StyledSettings = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 2%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 50%;
  padding-right: 2%;
`;

const SettingTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const SettingsSection = styled.div`
  /* background-color: ${({ theme }) => theme.accent}; */
  width: 100%;
  height: auto;
  padding: 3% 2%;

  label {
    flex: 1;
    cursor: pointer;
  }
`;

const CategorySection = styled.div`
  /* background-color: ${({ theme }) => theme.accent}; */
  width: 100%;
  height: auto;
  padding: 3% 2%;

  label {
    flex: 1;
    cursor: pointer;
  }
`;

const Button = styled.button`
  width: 50%;
  height: 50px;
`;

const Errors = styled.div``;
const Error = styled.div`
  color: red;
`;
