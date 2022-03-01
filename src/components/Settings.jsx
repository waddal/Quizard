import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { BASE_URL, API_KEY } from "../constants";
import axios from "axios";
import * as yup from "yup";
import schema from "../validation/formSchema";
import categories from "../data/categories";
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setData } from '../actions/quizActions';

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

const Settings = props => {
  // const { setData } = props;
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);
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
        console.log('data: ', res.data);
        props.setData(res.data);
        navigate('/quiz')
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
      <Title>NEW QUIZ</Title>
      <Form onSubmit={handleSubmit}>
        <SettingsSection>
          <SettingTitle>Difficulty</SettingTitle>
          <label>
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
          </label>
        </SettingsSection>
        <SettingsSection>
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
                />{" "}
                {item} &nbsp;
              </label>
            );
          })}
        </SettingsSection>
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
            />
          </label>
        </SettingsSection>
        <br></br>
      </Form>
      <Button disabled={disabled} onClick={handleSubmit}>
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
  }
}

export default connect(mapStateToProps, {setData})(Settings);

/*
answers: {answer_a: '<cite title"value">Some Text Here</cite>', answer_b: '<cite title:"value">Some Text Here</cite>', answer_c: '<cite title="value">Some Text Here</cite>', answer_d: null, answer_e: null, …}
category: "Code"
correct_answer: "answer_a"
correct_answers: {answer_a_correct: 'false', answer_b_correct: 'false', answer_c_correct: 'true', answer_d_correct: 'false', answer_e_correct: 'false', …}
description: null
difficulty: "Easy"
explanation: null
id: 543
multiple_correct_answers: "false"
question: "What is cite tag in HTML5?"
tags: [{…}]
tip: null
*/

const StyledSettings = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid red;
  height: 100vh;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 2%;
`;

const Form = styled.form`
  width: 50%;
`;

const SettingsSection = styled.div`
  background-color: #dcdcdc;
  width: 100%;
  height: auto;
  padding: 3% 0%;
`;

const SettingTitle = styled.h2`
  font-size: 1.5rem;
`;

const Button = styled.button`
  /* width: 70px; */
  width: 50%;
  height: 50px;
`;

const Errors = styled.div``;
const Error = styled.div`
  color: red;
`;
