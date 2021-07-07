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

const CreatePoll = ()=>{
       const [titleError,setTitleError] = useState('');
       const [descriptionError,setDescriptionError] = useState('');
       const [optionsError,setOptionsError] = useState('');
       const [optionCount,setOptionCount] = useState(2);
       const [options,setOptions] = useState({});
       const [title,setTitle] = useState('');
       const [description,setDescription] = useState('');
       var history = useHistory();
       const [openFlag,setOpenFlag] = useState(false);
       const getOptions = (count)=>{
              let inputs = [];
              for(let i=1;i<=count&&i<=5;i++){
                     if(i===5||i!==count){
                            inputs.push(
                                   <>
                                   <TextField  error={optionsError===''?false:true} helperText={optionsError} fullWidth key={i} placeholder={`option ${i}`}  type="text" name={`option${i}`} onChange={handleOptionsChange}/>
                                   <br/>
                                   <br/>
                                   </>
                            );
                     }
                     else{
                            inputs.push(
                                   <>
                                          <TextField error={optionsError===''?false:true} helperText={optionsError} fullWidth  key={i} placeholder={`option ${i}`}  type="text" name={`option${i}`} onChange={handleOptionsChange}/>
                                                 <Grid item xs={12} container justify="flex-end">
                                                        <IconButton onClick={()=>{setOptionCount(optionCount+1)}}  variant="contained" color="primary">
                                                               <AddCircleIcon fontSize="large"/>
                                                        </IconButton>
                                                 </Grid>
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
       const  checkFields= ()=>{
              let flag = true;
              if(title===""){
                     setTitleError("Title can't be empty!");
                     flag = false;
              }
              if(description===""){
                     setDescriptionError("Description can't be empty1");
                     flag = false;
              }
              if(Object.keys(options).length!==optionCount){
                     setOptionsError(`Options can't be empty!`);
                     flag = false;
              }
              return flag;
       }
       const previewOpen = ()=>{
              if(checkFields()){
                     setOpenFlag(true);
              }
       }

       return (
              <>
                     <Preview  options={options}    title={title} description={description} buttonText="Close" openFlag={openFlag} previewClose={()=>{setOpenFlag(false)}}/>
                     <Grid container spacing={2}>
                            <Grid item xs={12}>
                                   <Typography variant="h5">Create poll</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                   <TextField helperText={titleError} error={titleError===''?false:true} onChange={(e)=>{setTitle(e.target.value)}} placeholder="Poll's title" fullWidth id="title" type="text" variant="outlined" label="Title"/>
                            </Grid>
                            <Grid item xs={12}>
                                   <TextField
                                          helperText={descriptionError}
                                          error={descriptionError===''?false:true}
                                          onChange={(e)=>{setDescription(e.target.value)}}
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
                            <Grid item container xs={12} justify="center">
                                   <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
                                          <Button onClick={()=>{history.push("/dashboard/polls/home")}}>Cancel</Button>
                                          <Button onClick={previewOpen}>Preview</Button>
                                          <Button>Launch</Button>
                                   </ButtonGroup>
                            </Grid>
                     </Grid>
              </>
       );
}

export default React.memo(CreatePoll);