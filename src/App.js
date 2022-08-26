import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './themes/GlobalStyles';
import { lightTheme, darkTheme } from './themes/Themes';
import { Splash } from './views/Splash';
import { Menu } from './views/Menu';
import { Settings } from './views/Settings';
import { Quiz } from './views/Quiz';
import { Result } from './views/Result';
import { Leaderboard } from './views/Leaderboard';

function App() {
  const [theme, setTheme] = useState('dark');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/menu" element={<Menu theme={theme} themeToggler={themeToggler} />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
