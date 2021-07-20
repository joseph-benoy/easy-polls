import React,{useState,useEffect,useCallback} from 'react';
import Typography from '@material-ui/core/Typography';
import {Grid} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {useHistory} from 'react-router';
import Preview from '../preview/preview';
import PollSuccess from '../pollsuccess/pollsuccess';
import { makeStyles } from '@material-ui/core/styles';
import CModel from '../modal/modal'
import axios from 'axios';
import VisibilityIcon from '@material-ui/icons/Visibility';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import UpdateIcon from '@material-ui/icons/Update';

const useStyles = makeStyles((theme) => ({
       container: {
         display: 'flex',
         flexWrap: 'wrap',
       },
       textField: {
         marginLeft: theme.spacing(1),
         marginRight: theme.spacing(1),
         width: "100%",
       },
     }));

const EditPoll = ()=>{
       const classes = useStyles();
       const [titleError,setTitleError] = useState('');
       const [descriptionError,setDescriptionError] = useState('');
       const [optionsError,setOptionsError] = useState('');
       const [optionCount,setOptionCount] = useState(2);
       const [options,setOptions] = useState({});
       const [title,setTitle] = useState('');
       const [description,setDescription] = useState('');
       const [dateError,setDateError] = useState('');
       const [date,setDate] = useState('');
       const [urlSlag,setUrlSlag] = useState('');
       var history = useHistory();
       const [openFlag,setOpenFlag] = useState(false);
       const [pollSuccessFlag,setPollSuccessFlag] = useState(false);
       useEffect(()=>{
              document.getElementById("expiry").min = new Date().toLocaleDateString().split("/").reverse().join("-");
              axios.get(`/poll/${window.location.href.split("/").slice(-1)}`)
              .then((value)=>{
                     setTitle(value.data.title);
                     setDescription(value.data.description);
                     setOptionCount(value.data.options.length);
                     setDate(value.data.expiry.substr(0,value.data.expiry.indexOf("T")));
                     let obj = {};
                     for(let i in value.data.options){
                            obj[`option${i}`] = value.data.options[i];
                     }
                     setOptions(obj);
              })
              .catch((err)=>{
                     console.log(err.response.data);
              })
       },[]);
       const handleOptionsChange = (event)=>{
              event.preventDefault();
              const value = event.target.value
              setOptions({
                     ...options,
                     [event.target.name]:value
              });
       }
       const getOptions = useCallback((count)=>{
              let inputs = [];
              for(let i=1;i<=count&&i<=5;i++){
                     let optionValue = options[`option${i-1}`]
                     if(i===5||i!==count){
                            inputs.push(
                                   <>
                                   <TextField  value={optionValue} error={optionsError===''?false:true} helperText={optionsError} fullWidth key={i} placeholder={`option ${i}`}  type="text" name={`option${i-1}`} onChange={handleOptionsChange}/>
                                   <br/>
                                   <br/>
                                   </>
                            );
                     }
                     else{
                            inputs.push(
                                   <>
                                          <TextField value={optionValue} error={optionsError===''?false:true} helperText={optionsError} fullWidth  key={i} placeholder={`option ${i}`}  type="text" name={`option${i-1}`} onChange={handleOptionsChange}/>
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
       },[optionCount,options]);
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
              if(date===""){
                     setDateError("Expiry date is required!");
                     flag = false;
              }
              if(Date.now()>document.getElementById('expiry').valueAsNumber){
                     setDateError('Invalid expiry date!');
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
       const launchHandler = ()=>{
              if(checkFields()){
                     let data = {
                            title:title,
                            description:description,
                            expiry:document.getElementById('expiry').valueAsNumber,
                            options:Object.values(options),
                            slag:`${window.location.href.split("/").slice(-1)}`
                     };
                     axios.patch('/poll/update',data)
                     .then((res)=>{
                            setUrlSlag(res.data.slag);
                            setPollSuccessFlag(true);
                     })
                     .catch((err)=>{
                            setErrorModalFlag(true);
                     })
              }
       }
       const deleteHandler = ()=>{
              axios.delete(`/poll/delete?slag=${window.location.href.split("/").slice(-1)}`)
              .then((value)=>{
                     console.log(value.data);
              })
              .catch((err)=>{
                     console.log(err.message);
              });
       }
       const [errorModalFlag,setErrorModalFlag] = useState(false);
       return (
              <>
                     <CModel title = "Something went wrong!" description="Currently we are unable to create poll for you. Please try again." buttonText = "close" open={errorModalFlag} cb={()=>{setErrorModalFlag(false)}} />
                     <PollSuccess expiry={date} title="Poll created" urlSlag={urlSlag} open={pollSuccessFlag} cb={()=>{setPollSuccessFlag(false);history.push("/dashboard/polls/home")}}/>
                     <Preview  options={options}    title={title} description={description} buttonText="Close" openFlag={openFlag} previewClose={()=>{setOpenFlag(false)}}/>
                     <Grid container spacing={1}>
                            <Grid item xs={12}>
                                   <Typography variant="h5">Edit poll</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                   <TextField value={title} helperText={titleError} error={titleError===''?false:true} onChange={(e)=>{setTitle(e.target.value)}} placeholder="Poll's title" fullWidth id="title" type="text" variant="outlined" label="Title"/>
                            </Grid>
                            <Grid item xs={12}>
                                   <TextField
                                          value={description}
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
                                   <form className={classes.container} noValidate>
                                          <TextField
                                          value={date}
                                                 helperText={dateError} 
                                                 error={dateError===''?false:true}
                                                 onChange={(e)=>{setDate(e.target.value)}}
                                                 id="expiry"
                                                 label="Expiry"
                                                 type="date"
                                                 className={classes.textField}
                                                 InputLabelProps={{
                                                 shrink: true,
                                                 }}
                                          />
                                   </form>
                            </Grid>
                            <Grid item xs={12}>
                                   <Typography variant="body1">Add options</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                   {getOptions(optionCount)}
                            </Grid>
                            <Grid item container xs={12} justify="center">
                                   <ButtonGroup variant="contained" color="secondary" aria-label="contained primary button group">
                                          <Button onClick={()=>{history.push("/dashboard/polls/edit")}}><CloseIcon/>Cancel</Button>
                                          <Button onClick={deleteHandler}><DeleteIcon/>Delete</Button>
                                          <Button onClick={previewOpen}><VisibilityIcon/>Preview</Button>
                                          <Button onClick={launchHandler}><UpdateIcon/>Update</Button>
                                   </ButtonGroup>
                            </Grid>
                     </Grid>
              </>
       );
}

export default React.memo(EditPoll);