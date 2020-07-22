import React, { useState, useEffect } from 'react';
// FIREBASE
import { firestore } from '../../firebase/firebase.utils';
// MATERIAL UI
import { makeStyles } from '@material-ui/core/styles';
// COMPONENTS
import Post from '../Post/Post.component';

const useStyles = makeStyles({
    root: {
        width: '100%'
    }
});

const PostsContainer = props => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        firestore.collection('posts').onSnapshot(snapshot => {
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
                        username={post.username}
                        caption={post.caption}
                        imageUrl={post.imageUrl}
                    />
                )
            }
        </div>
    );
};

export default PostsContainer;