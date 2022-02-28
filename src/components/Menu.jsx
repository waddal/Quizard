import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { BASE_URL, API_KEY } from "../constants";
import * as yup from 'yup';
import schema from '../validation/formSchema';
// import dotenv from "dotenv";
// dotenv.config({ path: ".env" });

const initialFormValues = {
  difficulty: "",
  category: "",
  mode: "",
};

const initialFormErrors = {
  difficulty: "",
  category: "",
  mode: "",
};

const initialDisabled = true;

const Menu = () => {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(initialDisabled);

  // useEffect(() => {
  //   axios
  //     .get(`${BASE_URL}${API_KEY}`)
  //     .then((res) => {
  //       console.log("request url:", `${BASE_URL}${API_KEY}`);
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const handleSubmit = (e) => {
    e.target.preventDefault();
    console.log("submit");
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
    schema.isValid(formValues)
    .then((valid) => {
        setDisabled(!valid);
    });
    }, [formValues]);

  return (
    <StyledMenu>
      <Title>SETTINGS</Title>
      <MenuList>
        <form onSubmit={handleSubmit}>
          <h2>Difficulty</h2>
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

          <h2>Category</h2>
          <label className="category">
            <input
              type="radio"
              name="category"
              id="code"
              value="code"
              checked={formValues.category === "code"}
              onChange={handleChange}
            />{" "}
            Code &nbsp;
          </label>
          <label className="category">
            <input
              type="radio"
              name="category"
              id="programming"
              value="programming"
              checked={formValues.category === "programming"}
              onChange={handleChange}
            />{" "}
            Programming &nbsp;
          </label>
          <label className="category">
            <input
              type="radio"
              name="category"
              id="devops"
              value="devops"
              checked={formValues.category === "devops"}
              onChange={handleChange}
            />{" "}
            DevOps &nbsp;
          </label>

          <h2>Mode</h2>
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
            sudden death
            <input
              type="radio"
              name="mode"
              value="suddendeath"
              checked={formValues.mode === "suddendeath"}
              onChange={handleChange}
            />
          </label>
          <br></br>
          <button disabled={disabled}>start</button>
        </form>
      </MenuList>
    </StyledMenu>
  );
};

export default Menu;

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

const StyledMenu = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  font-size: 4rem;
`;
const MenuList = styled.div``;
