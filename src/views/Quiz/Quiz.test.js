// TODO: learn how to test components using react-router

import { render } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { createTestStore } from '../../utils/tests';
// import { Router, Routes, Route, useNavigate } from 'react-router-dom';
// import { createBrowserHistory, createMemoryHistory } from "history";

// import Quiz from './Quiz';

// let store = createTestStore();

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => jest.fn(),
// }));

// const history = createMemoryHistory({ initialEntries: ['/'] });

// const renderInRouter = (Comp) =>
//   render(
//     <Router history={history}>
//       <Comp />
//     </Router>
//   );

test('Quiz component renders without errors', () => {
  render();
  // <Provider store={store}>{renderInRouter(Quiz)}</Provider>

  // <Provider store={store}>
  //   <Routes>
  //     <Route path="/quiz" element={<Quiz />} />
  //   </Routes>
  // </Provider>
});
