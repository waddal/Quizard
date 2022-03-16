import { SET_DATA } from "../actions/quizActions.js";

const initialState = {
  isFetching: false,
  isLoading: false,
  isSuccessful: false,
  isFailure: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      console.log("state: FETCHING");
      return {
        isFetching: true,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default reducer;
