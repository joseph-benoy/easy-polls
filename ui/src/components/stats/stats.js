import React,{useState,useEffect} from 'react';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
    width:"100%"
  },
}));
const Stats = ()=>{
       const classes = useStyles();
       const [pollSelect, setPollSelect] = useState('');
       const [optionCount,setOptionCount] = useState(2);
       const [options,setOptions] = useState({});
       const [title,setTitle] = useState('');
       const [date,setDate] = useState('');
       const [urlSlag,setUrlSlag] = useState('');
       const [pollList,setPollList] = useState([]);
       const handleChange = (event) => {
         setPollSelect(event.target.value);
       };
       useEffect(()=>{
              axios.get(`/poll/getall`)
              .then((value)=>{
                     setPollList(value.data.map((value,index)=>{
                          return value.title;  
                     }));
              })
              .catch((err)=>{
                     console.log(err.response.data);
              })
       },[]);
       return (
              <Grid container spacing={2}>
                     <Grid item xs={12}>
                            <Typography variant="h5">Stats</Typography>
                     </Grid>
                     <Grid item xs={12}>
                            <FormControl className={classes.formControl}>
                                   <InputLabel id="demo-simple-select-label">Poll</InputLabel>
                                   <Select
                                   labelId="demo-simple-select-label"
                                   id="demo-simple-select"
                                   onChange={handleChange}
                                   >
                                          {
                                                 pollList.map((value,index)=>{
                                                        return <MenuItem key={index} value={index}>{value}</MenuItem>
                                                 })
                                          }
                                   </Select>
                            </FormControl>
                     </Grid>
              </Grid>
       );
}


export default Stats;