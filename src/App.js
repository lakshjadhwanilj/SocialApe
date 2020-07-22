import React, { useState, useEffect } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
// FIREBASE
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
// COMPONENTS
import Header from './components/Header/Header.component';
import SignUpSignIn from './components/SignUpSignIn/SignUpSignIn.component';
import PostsContainer from './components/PostsContainer/PostsContainer.component';
// MATERIAL UI
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// CSS
import './App.css';

function App() {

  // DARK MODE
  const [darkMode, setDarkMode] = useState(true);
  const theme = createMuiTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#90caf9'
      },
      secondary: {
        main: '#f48fb1'
      }
    },
  });
  const handleChange = () => setDarkMode(!darkMode)

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        });
      }
      setCurrentUser(userAuth);
    });
    return () => unsubscribe();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        currentTheme={theme}
        currentUser={currentUser}
        isDarkMode={darkMode}
        onClick={handleChange}
      />
      <Switch>
        <Route exact path='/' render={() =>
          currentUser ? (<PostsContainer />) : (<Redirect to='/signupsignin' />)}
        />
        <Route exact path='/signupsignin' render={() =>
          currentUser ? (<Redirect to='/' />) : (<SignUpSignIn />)}
        />
      </Switch>
      {/* <SignUpSignIn /> */}
      {/* <PostsContainer /> */}
    </ThemeProvider>
  );
}

export default App;