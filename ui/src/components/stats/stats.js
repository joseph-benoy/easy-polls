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
import OptionChart from '../optionchart/optionchart';
import CountryResult from '../resultByCountry/resultByCountry';
import CityResult from '../resultByCity/resultByCity';

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
       const [pollData,setPollData] = useState({});
       const handleChange = (event) => {
              let value = event.target.value;
              setPollSelect(value);
              getPollData(event.target.value);
       };
       const getPollData = (slag)=>{
              console.log(`poll/stats/${slag}`);
              axios.get(`/poll/stats/${slag}`)
              .then((value)=>{
                    setPollData(value.data);
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
              <Grid container spacing={2}>
                     <Grid item xs={12}>
                            <Typography variant="h6">Stats</Typography>
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
                     <Grid item container xs={12} spacing={5}>
                         <Grid item xs={12}  container justify="center">
                              <Grid item xs={12} lg={5}   container justify="center">
                                   {
                                        (!('title' in pollData))?null:<OptionChart values={Object.values(pollData.resultByOptions)} options={pollData.options}/>
                                   }
                              </Grid>
                         </Grid>
                         <Grid item xs={12}  container justify="center">
                              <Grid item xs={12} lg={7}   container justify="center">
                                   {
                                        (!('title' in pollData))?null:<CountryResult values={pollData.resultByCountry} options={pollData.options}/>
                                   }
                              </Grid>
                         </Grid>
                         <Grid item xs={12}  container justify="center">
                              <Grid item xs={12} lg={7}   container justify="center">
                                   {
                                        (!('title' in pollData))?null:<CityResult values={pollData.resultByCity} options={pollData.options}/>
                                   }
                              </Grid>
                         </Grid>
                     </Grid>
                     
              </Grid>
       );
}


export default Stats;