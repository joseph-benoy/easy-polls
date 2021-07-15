import React,{useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {useHistory} from 'react-router';
import Preview from '../preview/preview';
import axios from 'axios';
import PollSuccess from '../pollsuccess/pollsuccess';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import CModel from '../modal/modal'
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { FixedSizeList } from 'react-window';
import StarIcon from '@material-ui/icons/Star';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    //maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Edit = ()=>{
     const classes = useStyles();
       const [polls,setPolls] = useState([]);
       useEffect(()=>{
              axios.get("/poll/getall")
              .then((value)=>{
                     setPolls(value.data);
              })
              .catch((err)=>{
                     console.log(err.message);
              });
       },[]);
       const getRows = ()=>{
         let list = [];
         for(let i in polls){
              list.push(<p>{i}</p>);
         }
         return list;
       }
       return(
              <Grid container spacing={2}>
                     <Grid item xs={12}>
                            <Typography variant="h5">Polls</Typography>
                     </Grid>
                     <Grid item xs={12}>
                         <List component="nav" className={classes.root} aria-label="contacts">
                              {
                                   polls.map((value,index)=>(
                                        <ListItem button key={index}>
                                             <ListItemText primary={value.title} />
                                        </ListItem>
                                   ))
                              }
                         </List>                                 
                     </Grid>
              </Grid>
       );
}

export default Edit;