import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


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

export default function Vote() {
  const classes = useStyles();
  const [title,setTitle] = useState('');
  const [description,setDescription] = useState('');
  const [options,setOptions] = useState([]);
  const [expiry,setExpiry] = useState('');
  const [views,setViews] = useState('');
  const [choosen,setChoosen] = useState('');
       useEffect(()=>{
              axios.get(`/vote/${window.location.href.split("/").slice(-1)}`)
              .then((value)=>{
                     console.log(value.data);
                     setTitle(value.data.title);
                     setOptions(value.data.options);
                     setDescription(value.data.description);
                     setExpiry(value.data.expiry);
                     setViews(value.data.views);
              })
              .catch((err)=>{
                     console.log(err.message);
              })
       },[]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Easy Polls
          </Typography>
        </Toolbar>
      </AppBar>
      <Grid container style={{padding:"5vh",overflow:"hidden"}}>
              <Grid item xs={12}>
                     <Typography variant="h4">{title}</Typography>
              </Grid>
              <Grid item xs={12}>
                     <Typography variant="h6">{description}</Typography>
              </Grid>
              <Grid item xs={12}>
                     <FormControl component="fieldset">
                            <RadioGroup aria-label="gender" name="gender1" >
                                   {
                                          options.map((value)=>(
                                                 <FormControlLabel key={value} value={value} control={<Radio />} label={value} />
                                          ))
                                   }
                            </RadioGroup>
                     </FormControl>
              </Grid>
              <Grid item xs={12}>
                     <Button variant="contained" size="large" color="primary" style={{marginTop:"2vh"}} fullWidth={window.screen.availWidth<1199?true:false}>Vote</Button>
              </Grid>
      </Grid>
    </div>
  );
}