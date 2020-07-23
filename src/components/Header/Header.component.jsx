import React from 'react';
import { Redirect } from 'react-router-dom';
// FIREBASE
import { auth } from '../../firebase/firebase.utils';
// MATERIAL UI
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Switch, Paper, Typography, Grid, Button, Box } from '@material-ui/core';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles(theme => ({
    root: {
        padding: 15,
        marginBottom: 10,
        position: 'sticky',
        top: 0,
        zIndex: 1
    },
    title: {
        display: 'inline',
        fontFamily: 'Satisfy'
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
                            <Box component={Grid} item display={{ xs: 'none', sm: 'block' }}>
                                <Brightness7Icon />
                            </Box>
                            <Grid item>
                                <Switch checked={isDarkMode} color='primary' onChange={onClick} />
                            </Grid>
                            <Box component={Grid} item display={{ xs: 'none', sm: 'block' }}>
                                <Brightness2Icon />
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid>
                        {
                            currentUser ?
                                <Button onClick={() => auth.signOut()}>
                                    LOG OUT
                                </Button> :
                                <Button onClick={() => <Redirect to='/signupsignin' />}>
                                    SIGN IN
                                </Button>
                        }
                    </Grid>
                </Grid>
            </Paper>
        </ThemeProvider>
    );
};

export default Header;