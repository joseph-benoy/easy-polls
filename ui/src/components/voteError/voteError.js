import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Grid } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
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

export default function VoteError({title,description,expiry}) {
       const classes = useStyles();
       return (
              <div className={classes.root}>
                     <AppBar position="static">
                     <Toolbar>
                     <Typography variant="h6" className={classes.title}>
                            Easy Polls
                     </Typography>
                     </Toolbar>
                     </AppBar>
                     <Grid container style={{padding:"5vh",overflow:"hidden"}} spacing={2}>
                            <Grid item xs={12} container  justify="center">
                                   <Typography variant="h4">{title}</Typography>
                            </Grid>
                            <Grid item xs={12} container  justify="center">
                                   <Typography variant="h6">{description}</Typography>
                            </Grid>
                            <Grid item xs={12} container justify="center">
                                   <Typography variant="subtitle1">Poll expired on {new Date(expiry).toLocaleDateString('en-GB',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
                            </Grid>
                     </Grid>
              </div>
              );
}