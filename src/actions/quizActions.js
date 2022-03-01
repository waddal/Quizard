export const SET_DATA = "SET_DATA";

export const setData = (data) => {
    console.log('quizActions hit', data)
  return ({ type: SET_DATA, payload: data });
};
