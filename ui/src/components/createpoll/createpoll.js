import React,{useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {useHistory} from 'react-router';


const CreatePoll = ()=>{
       const [optionCount,setOptionCount] = useState(2);
       const [options,setOptions] = useState({});
       var history = useHistory();
       const getOptions = (count)=>{
              let inputs = [];
              for(let i=1;i<=count&&i<=5;i++){
                     if(i===5||i!==count){
                            inputs.push(
                                   <>
                                   <TextField fullWidth key={i} placeholder={`option ${i}`}  type="text" name={`option${i}`} onChange={handleOptionsChange}/>
                                   <br/>
                                   <br/>
                                   </>
                            );
                     }
                     else{
                            inputs.push(
                                   <>
                                          <TextField fullWidth  key={i} placeholder={`option ${i}`}  type="text" name={`option${i}`} onChange={handleOptionsChange}/>
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
                            <Grid item xs={12} justify="center">
                                   {getOptions(optionCount)}
                            </Grid>
                            <Grid item container xs={12} justify="center"> 
                                   <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
                                          <Button onClick={()=>{history.push("/dashboard/polls/home")}}>Cancel</Button>
                                          <Button>Preview</Button>
                                          <Button>Launch</Button>
                                   </ButtonGroup>
                            </Grid>
                     </Grid>
              </>
       );
}

export default React.memo(CreatePoll);