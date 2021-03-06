import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import {Grid} from '@material-ui/core';
import { Button } from '@material-ui/core';
import Updatepass from '../updatePass/updatepass';
import axios from 'axios';
import { useHistory } from 'react-router';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function Settings() {
  const classes = useStyles();
  const [openFlag,setOpenFlag] = React.useState(false);
  const [email,setEmail] = React.useState('');
  const [firstName,setFirstName] = React.useState('');
  const [lastName,setLastName] = React.useState('');
  const [saveFlag,setSaveFlag] = React.useState(true);
  const [emailChange,setEmailChange] = React.useState(false);
  const history = useHistory();
  React.useEffect(()=>{
    axios.get('/user/getuserdata').then((res)=>{
      setEmail(res.data.email);
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
    })
    .catch((err)=>{
      console.log(err.data);
    })
  },[]);
  const updateGeneralHandler = ()=>{
    axios.patch("/user/updategeneral",{
      firstName:firstName,
      lastName:lastName,
      email:email
    })
    .then((value)=>{
      if(emailChange){
        history.push('/');
      }
    })
    .catch((err)=>{
      console.log(err.data);
    })
  }
  return (
         <>
         <Typography variant="h5" style={{marginBottom:"2vh"}}>Settings</Typography>
          <Updatepass title="Update password" buttonText="save" openFlag={openFlag} previewClose={()=>{setOpenFlag(false)}}/>
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>General</Typography>
        </AccordionSummary>
        <AccordionDetails>
               <Grid container spacing={2} onChange={()=>{setSaveFlag(false)}}>
                     <Grid item xs={12} >
                            <TextField fullWidth value={firstName} onChange={(e)=>{setFirstName(e.target.value)}} id="firstName" name="firstName" label="First name" />
                     </Grid>
                     <Grid item xs={12}>
                            <TextField fullWidth value={lastName} onChange={(e)=>{setLastName(e.target.value)}} id="lastName" name="lastName" label="Last name" />
                     </Grid>
                     <Grid item xs={12}>
                            <TextField fullWidth  value={email} onChange={(e)=>{setEmail(e.target.value);setEmailChange(true)}} id="email" name="email" label="Email" />
                     </Grid>
                     <Grid item xs={12} style={{marginTop:"2vh"}} container justify="flex-end">
                            <Button color="primary" disabled={saveFlag} variant="contained" onClick={updateGeneralHandler}>Save</Button>
                     </Grid>
               </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className={classes.heading}>Security</Typography>
        </AccordionSummary>
        <AccordionDetails>
              <Grid container>
                     <Grid >
                            <Button  variant="contained" onClick={()=>{setOpenFlag(true)}}>Change password</Button>
                     </Grid>
              </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className={classes.heading}>Revoke</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container>
                     <Grid >
                            <Button variant="contained" color="secondary" onClick={()=>{setOpenFlag(true)}}>Revoke all polls</Button>
                     </Grid>
              </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
    </>
  );
}