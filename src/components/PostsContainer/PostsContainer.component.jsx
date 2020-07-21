import React, { useState } from 'react';
// MATERIAL UI
// import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// COMPONENTS
import Post from '../Post/Post.component';

const useStyles = makeStyles({
    root: {
        width: '100%'
    }
});

const PostsContainer = props => {

    const [posts, setPosts] = useState([
        {
            username: 'lakshjadhwanilj',
            caption: 'React is the best JavaScript library!',
            imageUrl: 'https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/fGWjtyQtG4JE7UXgaPAN'
        },
        {
            username: 'testuser',
            caption: 'Love Coding!',
            imageUrl: 'https://cdn.auth0.com/blog/illustrations/reactjs.png'
        }
    ]);

    const classes = useStyles();

    return (
        <div className={classes.root}>
            {
                posts.map(post =>
                    <Post
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