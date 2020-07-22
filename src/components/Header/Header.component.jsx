import React from 'react';
import { Link } from 'react-router-dom';
// FIREBASE
import { auth } from '../../firebase/firebase.utils';
// MATERIAL UI
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Switch, Paper, Typography, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness7Icon from '@material-ui/icons/Brightness7';
// CSS
import './Header.styles.css';

const useStyles = makeStyles(theme => ({
    root: {
        padding: 20,
        marginBottom: 10
    },
    title: {
        display: 'inline'
    }
}));

const Header = ({ currentTheme, isDarkMode, onClick, currentUser }) => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={currentTheme}>
            <CssBaseline />
            <Paper elevation={1} className={classes.root}>
                <Grid container direction='row' justify='space-between' alignItems='center'>
                    <Grid item>
                        <Typography variant='h5' className={classes.title}>SocialApe</Typography>
                    </Grid>
                    <Grid item>
                        <Grid component='label' container alignItems='center' spacing={1}>
                            <Grid item>
                                <Brightness7Icon />
                            </Grid>
                            <Grid item>
                                <Switch checked={isDarkMode} color='primary' onChange={onClick} />
                            </Grid>
                            <Grid item>
                                <Brightness2Icon />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid>
                        {
                            currentUser ?
                                <Button color='primary' variant='outlined' onClick={() => auth.signOut()}>
                                    <Typography variant='h5' className={classes.title}>SIGN OUT</Typography>
                                </Button> :
                                <Link className='link' to='/signupsignin'>
                                    <Typography variant='h6' className={classes.title}>SIGN IN</Typography>
                                </Link>
                        }
                    </Grid>
                </Grid>
            </Paper>
        </ThemeProvider>
    );
};

export default Header;