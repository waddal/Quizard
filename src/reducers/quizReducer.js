const initialState = {
  id: 0,
  answers: {},
  category: "",
  correct_answers: {},
  question: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUESTION:
      return {
        ...state,
        question: state.question,
      };
    default:
      return state;
  }
};
