export const SET_DATA = "SET_DATA";
export const SET_CATEGORY = "SET_CATEGORY";
export const SET_MODE = "SET_MODE";
export const SET_CHECKED = "SET_CHECKED";
export const SET_MESSAGE = "SET_MESSAGE";
export const SET_ANSWER_INDEX = "SET_ANSWER_INDEX";
export const ADD_SCORE = "ADD_SCORE";
export const ADD_INDEX = "ADD_INDEX";
export const RESET_GAME = "RESET_GAME";

export const setData = (data) => {
  return { type: SET_DATA, payload: data };
};

export const setCategory = (string) => {
  return { type: SET_CATEGORY, payload: string };
};

export const setMode = (string) => {
  return { type: SET_MODE, payload: string };
};

export const setChecked = (bool) => {
  return { type: SET_CHECKED, payload: bool };
};

export const setMessage = (string) => {
  return { type: SET_MESSAGE, payload: string };
};

export const setAnswerIndex = (index) => {
  console.log('setActionIndex: ', index);
  return { type: SET_ANSWER_INDEX, payload: index };
};

export const addIndex = () => {
  return { type: ADD_INDEX };
};

export const addScore = () => {
  return { type: ADD_SCORE };
};

export const resetGame = () => {
  return { type: RESET_GAME };
};