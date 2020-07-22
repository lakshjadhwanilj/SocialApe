import React, { useState, useEffect } from 'react';
// FIREBASE
import { auth, createUserProfileDocument, signInWithGoogle } from '../../firebase/firebase.utils';
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

const SignUp = props => {

    const classes = useStyles();

    const [signUpContent, setSignUpContent] = useState({
        email: '',
        displayName: '',
        password: '',
        confirmPassword: ''
    });

    const { email, displayName, password, confirmPassword } = signUpContent;

    const handleSubmit = async e => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Passwords don\'t match');
            return;
        }
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await createUserProfileDocument(user, { displayName });
            setSignUpContent({
                email: '',
                displayName: '',
                password: '',
                confirmPassword: ''
            });
        } catch (err) {
            console.error(err);
        }

    }

    const handleChange = e => {
        const { name, value } = e.target;
        setSignUpContent({
            ...signUpContent,
            [name]: value
        });
    };

    return (
        <Paper className={classes.paper}>
            <h2>Sign Up</h2>
            <p>Sign up to the app!</p>
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
                            name='displayName'
                            value={displayName}
                            onChange={handleChange}
                            label='Display Name' />
                    </Grid>
                    <Grid item>
                        <TextField
                            name='password'
                            value={password}
                            onChange={handleChange}
                            label='Password' />
                    </Grid>
                    <Grid item>
                        <TextField
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={handleChange}
                            label='Confirm Password' />
                    </Grid>
                    <Grid item>
                        <Button variant='contained' color='primary' type='submit'>
                            SIGN UP
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

export default SignUp;