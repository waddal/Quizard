import { SET_DATA } from '../actions/quizActions.js';

const initialState = {
  data: {},
  category: "",
  question: "",
  answers: {},
  correct_answers: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      console.log('quizReducer was here');
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;