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
            <Grid container direction='column' alignItems='center' justify='space-around' spacing={4}>
                <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                    <Grid item>
                        <TextField
                            name='email'
                            value={email}
                            onChange={handleChange}
                            label='Email' />
                    </Grid>
                    <Grid item>
                        <TextField
                            name='password'
                            value={password}
                            onChange={handleChange}
                            label='Password' />
                    </Grid>
                    <Grid item>
                        <Button variant='contained' color='primary' type='submit'>
                            SIGN IN
                        </Button>
                        <Button variant='contained' color='secondary' onClick={signInWithGoogle} >
                            SIGN UP with Google
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </Paper>
    );
};

export default SignIn;