export const SET_DATA = "SET_DATA";
export const ADD_SCORE = "ADD_SCORE";

export const setData = (data) => {
  return ({ type: SET_DATA, payload: data });
};
export const addScore = () => {
    console.log('addScore')
  return ({ type: ADD_SCORE });
};
