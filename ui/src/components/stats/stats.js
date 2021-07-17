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
              let value = event.target.value;
              setPollSelect(value);
              getPollData(event.target.value);
       };
       const getPollData = (slag)=>{
              console.log(`poll/stats/${slag}`);
              axios.get(`/poll/stats/${slag}`)
              .then((value)=>{
                     console.log(value.data);
              })
              .catch((err)=>{
                     console.log(err.message);
              })
       }
       useEffect(()=>{
              axios.get(`/poll/getall`)
              .then((value)=>{
                     setPollList(value.data.map((value,index)=>{
                          return {title:value.title,slag:value.slag};  
                     }));
              })
              .catch((err)=>{
                     console.log(err.response);
              })
       },[]);
       return (
              <Grid container spacing={1}>
                     <Grid item xs={12}>
                            <Typography variant="h5">Stats</Typography>
                     </Grid>
                     <Grid item xs={12}>
                            <FormControl className={classes.formControl}>
                                   <InputLabel>Poll</InputLabel>
                                   <Select
                                   value={pollSelect}
                                   defaultValue=""
                                   onChange={handleChange}
                                   >
                                          {
                                                 pollList.map((value,index)=>{
                                                        return <MenuItem key={index} value={value.slag}>{value.title}</MenuItem>
                                                 })
                                          }
                                   </Select>
                            </FormControl>
                     </Grid>
              </Grid>
       );
}


export default Stats;