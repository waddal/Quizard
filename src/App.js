import { Routes, Route } from "react-router-dom";
import Menu from './components/Menu';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Menu />} />
    </Routes>
  );
}

export default App;
