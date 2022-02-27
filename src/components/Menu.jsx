import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { BASE_URL, API_KEY } from "../constants";
// import dotenv from "dotenv";
// dotenv.config({ path: ".env" });

const Menu = () => {
  
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

  return (
    <StyledMenu>
      <Header>SETTINGS</Header>
      <MenuList>
        <MenuItem>Difficulty</MenuItem>
        <MenuItem>Category</MenuItem>
        <MenuItem>Questions</MenuItem>
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


const StyledMenu = styled.div``;
const Header = styled.div``;
const MenuList = styled.div``;
const MenuItem = styled.div``;
