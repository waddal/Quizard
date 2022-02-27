import { Routes, Route } from "react-router-dom";
import Menu from './components/Menu';
import Splash from './components/Splash';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/menu" element={<Menu />} />
    </Routes>
  );
}

export default App;
