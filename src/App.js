import React, { useState } from 'react';
// COMPONENTS
import Header from './components/Header/Header.component';
import PostsContainer from './components/PostsContainer/PostsContainer.component';
// MATERIAL UI
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// CSS
import './App.css';

function App() {

  const [darkMode, setDarkMode] = useState(true);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
    },
  });

  const handleChange = () => setDarkMode(!darkMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header currentTheme={theme} isDarkMode={darkMode} onClick={handleChange} />
      <PostsContainer />
    </ThemeProvider>
  );
}

export default App;