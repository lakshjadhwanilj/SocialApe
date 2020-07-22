import React, { useState } from 'react';
// FIREBASE
import { auth, signInWithGoogle } from '../../firebase/firebase.utils';
// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button, Grid, TextField } from '@material-ui/core';

const useStyles = makeStyles({
    paper: {
        padding: 20,
        width: 500,
        textAlign: 'center'
    },
    formContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        margin: 10
    },
    inputfield: {
        width: '95%'
    }
});

const SignIn = props => {

    const classes = useStyles();

    const [signInContent, setSignInContent] = useState({
        email: '',
        password: ''
    });

    const { email, password } = signInContent;

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            await auth.signInWithEmailAndPassword(email, password);
            setSignInContent({
                email: '',
                password: ''
            });
        } catch (err) {
            console.error(err);
        }
    }

    const handleChange = e => {
        const { name, value } = e.target;
        setSignInContent({
            ...signInContent,
            [name]: value
        });
    };

    return (
        <Paper className={classes.paper}>
            <h2>Sign In</h2>
            <p>Sign in to the app!</p>
            <Grid container direction='column' className={classes.formContainer}>
                <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                    <Grid item className={classes.input}>
                        <TextField
                            className={classes.inputfield}
                            name='email'
                            value={email}
                            onChange={handleChange}
                            label='Email' />
                    </Grid>
                    <Grid item className={classes.input}>
                        <TextField
                            className={classes.inputfield}
                            name='password'
                            value={password}
                            onChange={handleChange}
                            label='Password' />
                    </Grid>
                    <Grid item>
                        <Grid container className={classes.formContainer}>
                            <Grid item className={classes.input}>
                                <Button variant='contained' color='primary' type='submit'>
                                    SIGN IN
                                </Button>
                            </Grid>
                            <Grid item className={classes.input}>
                                <Button variant='contained' color='secondary' onClick={signInWithGoogle} >
                                    SIGN IN with Google
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Paper>
    );
};

export default SignIn;