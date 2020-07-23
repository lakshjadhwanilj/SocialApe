import React, { useState } from 'react';
// FIREBASE
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils';
// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Button, Grid, TextField } from '@material-ui/core';

const useStyles = makeStyles({
    paper: {
        padding: 20,
        width: 500,
        textAlign: 'center'
    },
    input: {
        margin: 10
    },
    inputfield: {
        width: '95%'
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
            <p>Sign up to SocialApe!</p>
            <Grid container direction='column' className={classes.formContainer}>
                <form noValidate autoComplete='off' onSubmit={handleSubmit}>
                    <Grid item className={classes.input}>
                        <TextField
                            type='email'
                            className={classes.inputfield}
                            name='email'
                            value={email}
                            onChange={handleChange}
                            label='Email' />
                    </Grid>
                    <Grid item className={classes.input}>
                        <TextField
                            type='password'
                            className={classes.inputfield}
                            name='password'
                            value={password}
                            onChange={handleChange}
                            label='Password' />
                    </Grid>
                    <Grid item className={classes.input}>
                        <TextField
                            type='password'
                            className={classes.inputfield}
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={handleChange}
                            label='Confirm Password' />
                    </Grid>
                    <Grid item className={classes.input}>
                        <Button variant='contained' color='primary' type='submit' className={classes.inputfield}>
                            SIGN UP
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </Paper>
    );
};

export default SignUp;