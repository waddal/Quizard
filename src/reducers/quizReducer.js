import {
  SET_DATA,
  SET_CATEGORY,
  SET_MODE,
  SET_CHECKED,
  SET_MESSAGE,
  SET_ANSWER_INDEX,
  ADD_INDEX,
  ADD_SCORE,
  RESET_GAME,
} from "../actions/quizActions.js";

const initialState = {
  data: {},
  category: "",
  mode: "",
  message: "",
  score: 0,
  index: 0,
  answerIndex: 0,
  isChecked: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case SET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };
    case SET_MODE:
      return {
        ...state,
        mode: action.payload,
      };
    case SET_CHECKED:
      return {
        ...state,
        isChecked: action.payload,
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload,
      };
    case SET_ANSWER_INDEX:
      return {
        ...state,
        answerIndex: action.payload,
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
    case RESET_GAME:
      return {
        ...state,
        index: state.index = 0,
        score: state.score = 0,
      };
    default:
      return state;
  }
};

export default reducer;
