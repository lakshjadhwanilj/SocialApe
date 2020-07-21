import React from 'react'
// MATERIAL UI
import { Avatar, Card, CardHeader, CardMedia, CardContent, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// CSS
import './Post.styles.css';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 500,
        margin: 'auto',
        marginBottom: 10
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    username: {
        display: 'inline',
        fontWeight: 'bold'
    },
    caption: {
        display: 'inline'
    }
}));

const Post = ({ username, caption, imageUrl }) => {
    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar alt={username} src='' />
                }
                title={username}
            />
            <CardMedia
                className={classes.media}
                image={imageUrl}
            />
            <CardContent>
                <Typography variant='subtitle1' className={classes.username}>{username} </Typography>
                <Typography variant='subtitle2' className={classes.caption}>{caption}</Typography>
            </CardContent>
        </Card>
    );
}

export default Post;