import { FETCH_DATA } from "../actions/stateActions";
import { FETCH_SUCCESS } from "../actions/stateActions";

const initialState = {
  isFetching: false,
  isLoading: false,
  isSuccess: false,
  isFailure: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_DATA:
      return {
        isFetching: true,
        isLoading: true,
      };
    case FETCH_SUCCESS:
      return {
        isFetching: false,
        isLoading: false,
        isSuccess: true,
      };
    default:
      return state;
  }
};

export default reducer;
