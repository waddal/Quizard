import { Routes, Route } from "react-router-dom";
import Splash from './components/Splash';
import Menu from "./components/Menu";
import Settings from './components/Settings';
import Quiz from "./components/Quiz";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  );
}

export default App;
