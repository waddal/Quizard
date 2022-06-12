import {
  SET_DATA,
  SET_CHECKED,
  ADD_INDEX,
  ADD_SCORE,
} from "../actions/quizActions.js";

const initialState = {
  data: {},
  category: "",
  question: "",
  score: 0,
  index: 0,
  isChecked: false,
  isFetching: false,
  isLoading: false,
  isSuccessful: false,
  isFailure: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case SET_CHECKED:
      return {
        ...state,
        isChecked: action.payload,
      };
    case ADD_INDEX:
      return {
        ...state,
        index: state.index + 1,
      };
    case ADD_SCORE:
      return {
        ...state,
        score: state.score + 1,
      };
    default:
      return state;
  }
};

export default reducer;
