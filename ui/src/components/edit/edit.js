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
const Edit = ()=>{
       const [polls,setPolls] = useState([]);
       useState(()=>{
              axios.get("/poll/getall")
              .then((value)=>{
                     setPolls(value);
              })
              .catch((err)=>{
                     console.log(err.message);
              });
       },[]);
       return(
              <Grid container spacing={2}>
                     <Grid item xs={12}>
                            <Typography variant="h5">Polls</Typography>
                     </Grid>
                     <Grid item xs={12}>
                            {
                                   polls.map((value,index)=>(
                                          <p>{index}</p>
                                   ))
                            }
                     </Grid>
              </Grid>
       );
}

export default Edit;