import React, { useState, useEffect } from 'react';
// FIREBASE
import firebase from 'firebase';
import { auth, firestore } from '../../firebase/firebase.utils';
// MATERIAL UI
import { Avatar, Card, CardHeader, CardMedia, CardContent, Typography, TextField, Button, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 500,
        margin: 'auto',
        marginBottom: 10
    },
    media: {
        height: 0,
        paddingTop: '100%',
    },
    email: {
        display: 'inline',
        fontWeight: 'bold'
    },
    caption: {
        display: 'inline'
    },
    commentContainer: {
        width: '100%',
        display: 'flex'
    },
    inputField: {
        flex: 2
    }
}));

const Post = ({ postId, email, caption, imageUrl }) => {

    const classes = useStyles();
    const [currentUser, setCurrentUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                setCurrentUser(userAuth.email);
            }
        });
    });

    useEffect(() => {
        let unsubscribe;
        if (postId) {
            unsubscribe = firestore
                .collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp', 'desc')
                .onSnapshot(snapShot => {
                    setComments(snapShot.docs.map(doc => doc.data()));
                });
        }
        return () => unsubscribe();
    }, [postId]);

    const postComment = e => {
        e.preventDefault();
        firestore.collection('posts')
            .doc(postId)
            .collection('comments')
            .add({
                text: comment,
                email: currentUser,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            });
        setComment('');
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar alt={email} src='/' />
                }
                title={email}
            />
            <CardMedia
                className={classes.media}
                image={imageUrl}
            />
            <CardContent>
                <Typography variant='subtitle1' className={classes.email}>{email} </Typography>
                <Typography variant='subtitle2' className={classes.caption}>{caption}</Typography>
                {
                    comments.map(comment =>
                        <Box>
                            <Typography variant='subtitle1' className={classes.email}>{comment.email} </Typography>
                            <Typography variant='subtitle2' className={classes.caption}>
                                {comment.text}
                            </Typography>
                        </Box>
                    )
                }
                <form noValidate autoComplete='off'>
                    <Box className={classes.commentContainer}>
                        <TextField
                            className={classes.inputField}
                            type='text'
                            placeholder='Enter a comment'
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        />
                        <Button
                            color='primary'
                            disabled={!comment}
                            type='submit'
                            onClick={postComment}
                        >
                            Post
                    </Button>
                    </Box>
                </form>
            </CardContent>
        </Card>
    );
}

export default Post;