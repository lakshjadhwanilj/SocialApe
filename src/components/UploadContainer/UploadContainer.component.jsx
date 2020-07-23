import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// FIREBASE
import firebase from 'firebase';
import { auth, storage, firestore } from '../../firebase/firebase.utils';
// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Grid, } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        maxWidth: 500,
        margin: 'auto',
        textAlign: 'center',
        justifyContent: 'center',
        // alignItems: 'center'
    },
    input: {
        width: '95%',
        margin: 10
    }
});

const UploadContainer = props => {

    const classes = useStyles();

    const [currentUser, setCurrentUser] = useState(null);
    const [caption, setCaption] = useState();
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleCaptionChange = e => setCaption(e.target.value);

    const handleImageChange = e => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                setCurrentUser(userAuth.email);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleSubmit = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            'state_changed',
            (snapShot) => {
                // progress function
                const progress = Math.round(
                    (snapShot.bytesTransferred / snapShot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (err) => {
                // error function
                console.error(err);
                alert(err.message);
            },
            () => {
                // complete function
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        // post image inside firestore
                        firestore.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            email: currentUser
                        });
                        setProgress(0);
                        setCaption('');
                        setImage(null);
                    })
            }
        )
    };

    return (
        <div>
            <Grid container direction='column' className={classes.container}>
                <Grid item>
                    <TextField
                        className={classes.input}
                        name='caption'
                        value={caption}
                        onChange={handleCaptionChange}
                        label='Caption'
                        multiline
                    />
                </Grid>
                <Grid item>
                    <input accept="image/*" className={classes.input} type="file" onChange={handleImageChange} />
                </Grid>
                <Grid item>
                    <progress value={progress} className={classes.input} max='100' />
                </Grid>
                <Grid item>
                    <Grid container justify='space-around'>
                        <Grid item>
                            <Button variant='contained' color='primary' onClick={handleSubmit} disabled={!image}>
                                Upload
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant='contained' color='secondary'>
                                <Link to='/'>Go Back</Link>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default UploadContainer;