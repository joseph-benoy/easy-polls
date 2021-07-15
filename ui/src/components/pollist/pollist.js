import React,{useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core';
import {useHistory} from 'react-router';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import VisibilityIcon from '@material-ui/icons/Visibility';











const useStyles = makeStyles((theme) => ({
       root: {
         width: '100%',
         backgroundColor: theme.palette.background.paper,
       },
     }));
const PollList = ()=>{
       const classes = useStyles();
       const history = useHistory();
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
       const editPollHandler = (slag)=>{
              history.push("/dashboard/polls/edit/"+slag);
      }
       return (
              <>
              <Grid item xs={12}>
                            <Typography variant="h5">Polls</Typography>
                     </Grid>
                     <Grid item xs={12}>
                         <List component="nav" className={classes.root} aria-label="contacts">
                              {
                                   polls.map((value,index)=>(
                                        <ListItem button key={value.slag} onClick={()=>{editPollHandler(value.slag)}}>
                                             <ListItemText  primary={value.title} />
                                             <ListItemIcon>
                                                       {value.views}
                                                       <VisibilityIcon style={{marginLeft:"3vw"}} fontSize="small"/>
                                             </ListItemIcon>
                                        </ListItem>
                                   ))
                              }
                         </List>                                 
                     </Grid>
                     </>
       );
}

export default React.memo(PollList);