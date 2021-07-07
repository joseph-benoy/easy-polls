import React,{useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';

/*
                                   <IconButton onClick={()=>{setOptionCount(optionCount+1)}}  variant="contained" color="primary">
                                          <AddCircleIcon/>
                                   </IconButton>
*/

const CreatePoll = ()=>{
       const [optionCount,setOptionCount] = useState(2);
       const [options,setOptions] = useState({});
       const getOptions = (count)=>{
              let inputs = [];
              for(let i=1;i<=count&&i<=5;i++){
                     if(i===5||i!==count){
                            inputs.push(
                                   <>
                                   <TextField key={i} placeholder={`option ${i}`}  type="text" name={`option${i}`} onChange={handleOptionsChange}/>
                                   <br/>
                                   </>
                            );
                     }
                     else{
                            inputs.push(
                                   <>
                                          <TextField key={i} placeholder={`option ${i}`}  type="text" name={`option${i}`} onChange={handleOptionsChange}/>
                                          <IconButton onClick={()=>{setOptionCount(optionCount+1)}}  variant="contained" color="primary">
                                                 <AddCircleIcon/>
                                          </IconButton>
                                          <br/>
                                   </>
                            );   
                     }
              }
              return inputs;
       }
       const handleOptionsChange = (event)=>{
              const value = event.target.value
              setOptions({
                     ...options,
                     [event.target.name]:value
              });
              console.log(options);
       }
       return (
              <>
                     <Grid container spacing={2}>
                            <Grid item xs={12}>
                                   <Typography variant="h5">Create poll</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                   <TextField placeholder="Poll's title" fullWidth id="title" type="text" variant="outlined" label="Title"/>
                            </Grid>
                            <Grid item xs={12}>
                                   <TextField
                                          fullWidth
                                          id="description"
                                          label="Description"
                                          multiline
                                          rows={4}
                                          variant="outlined"
                                          placeholder="Description about the poll"
                                   />
                            </Grid>
                            <Grid item xs={12}>
                                   <Typography variant="body1">Add options</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                   {getOptions(optionCount)}
                            </Grid>
                     </Grid>
              </>
       );
}

export default React.memo(CreatePoll);