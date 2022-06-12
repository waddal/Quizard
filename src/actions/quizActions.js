export const SET_DATA = "SET_DATA";
export const SET_CHECKED = "SET_CHECKED";
export const ADD_SCORE = "ADD_SCORE";
export const ADD_INDEX = "ADD_INDEX";

export const setData = (data) => {
  return { type: SET_DATA, payload: data };
};

export const setChecked = (bool) => {
  return { type: SET_CHECKED, payload: bool };
};

export const addIndex = () => {
  return { type: ADD_INDEX };
};

export const addScore = () => {
  return { type: ADD_SCORE };
};
