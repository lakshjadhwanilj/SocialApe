import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// FIREBASE
import { firestore } from '../../firebase/firebase.utils';
// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
// COMPONENTS
import Post from '../Post/Post.component';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    floatingIcon: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed'
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));

const PostsContainer = props => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        firestore.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })));
        });
    }, []);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            {
                posts.map(({ id, post }) =>
                    <Post
                        key={id}
                        postId={id}
                        email={post.email}
                        caption={post.caption}
                        imageUrl={post.imageUrl}
                    />
                )
            }
            <Fab
                variant='extended'
                color='secondary'
                size='small'
                className={classes.floatingIcon}
            >
                <AddIcon className={classes.extendedIcon} />
                <Link to='/upload'>New Post</Link>
            </Fab>
        </div>
    );
};

export default PostsContainer;