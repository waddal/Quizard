import { SET_DATA, ADD_INDEX, ADD_SCORE } from "../actions/quizActions.js";

const initialState = {
  data: {},
  category: "",
  question: "",
  answers: {},
  correct_answers: {},
  score: 0,
  index: 0,
  isFetching: false,
  isLoading: false,
  isSuccessful: false,
  isFailure: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      console.log("reducer: set data");
      return {
        ...state,
        data: action.payload,
      };
    case ADD_INDEX:
      console.log("reducer: add index");
      return {
        ...state,
        score: state.index + 1,
      };
    case ADD_SCORE:
      console.log("reducer: add score");
      return {
        ...state,
        score: state.score + 1,
      };
    default:
      return state;
  }
};

export default reducer;
