import { combineReducers } from 'redux';

import quizReducer from './quizReducer';
import stateReducer from './stateReducer';

const rootReducer = combineReducers({
  quizReducer,
  stateReducer,
});

export default rootReducer;
