import MenuIcon from '@material-ui/icons/Menu';
import { AppBar, Toolbar, IconButton, Typography, Button, makeStyles } from '@material-ui/core';
import { classes } from 'istanbul-lib-coverage';
import React from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function AppHeader() {

    const classes = useStyles({});

    return (
        <AppBar position="static" >
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    My Work List
                </Typography>
            </Toolbar>
        </AppBar >
    )
} 