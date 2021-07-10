import React,{useEffect,useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Grid } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FingerprintJS from '@fingerprintjs/fingerprintjs'


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
  const [city,setCity] = useState('');
  const [region,setRegion] = useState('');
  const [country,setCountry] = useState('');
  const [countryCode,setCountryCode] = useState('');
  const fpPromise = FingerprintJS.load()

       useEffect(async()=>{
              axios.get("http://ip-api.com/json/")
              .then((response)=>{
                     setCity(response.data.city);
                     setRegion(response.data.region);
                     setCountry(response.data.country);
                     setCountryCode(response.data.countryCode);
                     axios.get(`https://cors-anywhere.herokuapp.com/check.getipintel.net/check.php?ip=${response.data.query}&contact=cikova1846@ovooovo.com&format=json&flags=f`)
                     .then((value)=>{
                            if(value.data.result<0.5){
                                   axios.get(`/vote/${window.location.href.split("/").slice(-1)}`)
                                   .then((value)=>{
                                          setTitle(value.data.title);
                                          setOptions(value.data.options);
                                          setDescription(value.data.description);
                                          setExpiry(value.data.expiry);
                                          setViews(value.data.views);
                                   })
                                   .catch((err)=>{
                                          if(err.response.data.error==="Poll expired"){
                                                 
                                          }
                                   })
                            }
                            else{
                                   console.log("Bad Ip");
                            }
                     })
                     .catch((err)=>{
                            console.log(err.response.data);
                     })
              })
              .catch((err)=>{
                     console.log(err.response.data);
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
      <Grid container style={{padding:"5vh",overflow:"hidden"}} spacing={2}>
              <Grid item xs={12} container  justify="center">
                     <Typography variant="h4">{title}</Typography>
              </Grid>
              <Grid item xs={12} container  justify="center">
                     <Typography variant="h6">{description}</Typography>
              </Grid>
              <Grid item xs={12}  container  justify={window.screen.availWidth<1199?"flex-start":"center"}>
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
              <Grid item xs={12}  container  justify="center">
                     <Button  variant="contained" size="large" color="primary" style={{marginTop:"2vh"}} fullWidth={window.screen.availWidth<1199?true:false}>Vote</Button>
              </Grid>
              <Grid item xs={12} container justify="center">
                     <Typography variant="subtitle1">{views} views</Typography>
              </Grid>
              <Grid item xs={12} container justify="center">
                     <Typography variant="subtitle1">Poll expires on {new Date(expiry).toLocaleDateString('en-GB',{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
              </Grid>
      </Grid>
    </div>
  );
}