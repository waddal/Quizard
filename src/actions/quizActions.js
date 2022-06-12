export const SET_DATA = "SET_DATA";
export const SET_CHECKED = "SET_CHECKED";
export const SET_MESSAGE = "SET_MESSAGE";
export const SET_ANSWER_INDEX = "SET_ANSWER_INDEX";
export const ADD_SCORE = "ADD_SCORE";
export const ADD_INDEX = "ADD_INDEX";

export const setData = (data) => {
  return { type: SET_DATA, payload: data };
};

export const setChecked = (bool) => {
  return { type: SET_CHECKED, payload: bool };
};

export const setMessage = (string) => {
  return { type: SET_MESSAGE, payload: string };
};

export const setAnswerIndex = (index) => {
  return { type: SET_ANSWER_INDEX, payload: index };
};

export const addIndex = () => {
  return { type: ADD_INDEX };
};

export const addScore = () => {
  return { type: ADD_SCORE };
};
