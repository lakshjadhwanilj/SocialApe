import React, { useState } from 'react';
// MATERIAL UI
import CssBaseline from '@material-ui/core/CssBaseline';
import { Switch } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// CSS
import './App.css';

function App() {

  const [darkMode, setDarkMode] = useState(false);

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Switch checked={darkMode} color='primary' onChange={() => setDarkMode(!darkMode)} />
      <div>
        <h1>Hello World</h1>
      </div>
    </ThemeProvider>
  );
}

export default App;