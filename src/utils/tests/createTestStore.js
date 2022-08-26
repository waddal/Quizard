import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducer from '../../state/reducers';

const createTestStore = (state) => createStore(reducer, state, applyMiddleware(thunk));

export default createTestStore;
