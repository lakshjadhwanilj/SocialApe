import React, { useState } from 'react';
// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Fade, Button, Grid, Typography } from '@material-ui/core';
import BackDrop from '@material-ui/core/Backdrop';
// COMPONENTS
import SignUp from './SignUp.component';
import SignIn from './SignIn.component';

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        minHeight: '18.25rem',
        margin: 'auto',
        justifyContent: 'center'
    },
    textContainer: {
        textAlign: 'center',
        marginBottom: 10,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // maxWidth: 500
    }
});

const SignUpSignIn = props => {

    const classes = useStyles();

    const [openSignUpModal, setOpenSignUpModal] = useState(false);
    const [openSignInModal, setOpenSignInModal] = useState(false);

    return (
        <div>
            <Grid className={classes.root} container direction='column' >
                <Grid className={classes.textContainer} item>
                    <Typography variant='h6'>Welcome to SocialApe!</Typography>
                    <Typography variant='subtitle2'>Sign Up / Sign In Now to join fellow Apes!🐒</Typography>
                </Grid>
                <Grid container direction='row' justify='space-around' alignItems='center'>
                    <Grid item>
                        <Button variant='contained' color='primary' onClick={() => setOpenSignUpModal(true)}>
                            Sign Up
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant='contained' color='primary' onClick={() => setOpenSignInModal(true)}>
                            Sign In
                        </Button>
                    </Grid>
                </Grid>
            </Grid>


            <Modal
                className={classes.modal}
                open={openSignUpModal}
                onClose={() => setOpenSignUpModal(false)}
                closeAfterTransition
                BackdropComponent={BackDrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openSignUpModal}>
                    <SignUp />
                </Fade>
            </Modal>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openSignInModal}
                onClose={() => setOpenSignInModal(false)}
                closeAfterTransition
                BackdropComponent={BackDrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openSignInModal}>
                    <SignIn />
                </Fade>
            </Modal>
        </div>
    );
};

export default SignUpSignIn;