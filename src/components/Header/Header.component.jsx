import React from 'react';
// MATERIAL UI
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Switch, Paper, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// CSS
import './Header.styles.css';

const useStyles = makeStyles(theme => ({
    root: {
        padding: 20,
        marginBottom: 10,
        
    },
    title: {
        display: 'inline'
    }
}));

const Header = props => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={props.currentTheme}>
            <CssBaseline />
            <Paper elevation={1} className={classes.root}>
                <Grid container direction='row' justify='space-between' alignItems='center'>
                    <Grid item>
                    <Typography variant='h5' className={classes.title}>SocialApe</Typography>
                    </Grid>
                    <Grid item>
                    <Switch checked={props.isDarkMode} color='primary' onChange={props.onClick} />
                    </Grid>
                </Grid>
            </Paper>
        </ThemeProvider>
    );
};

export default Header;