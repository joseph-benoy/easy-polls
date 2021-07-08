import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Typography } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import axios from 'axios';

   
   function getModalStyle() {
       return {
              margin:"auto auto"
       }
   }
   
   const useStyles = makeStyles(theme => ({
       modal: {
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
       },
       paper: {
           position: 'absolute',
           width: "100%",
           backgroundColor: theme.palette.background.paper,
           boxShadow: theme.shadows[5],
           padding: theme.spacing(2, 4, 3),
       },
   }));




const UpdatePass = ({title,buttonText,openFlag,previewClose})=>{
       const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [currentPass,setCurrentPass] = React.useState('');
    const [newPass,setNewPass] = React.useState('');
    const [newPassRepeat,setNewPassRepeat] = React.useState('');
    const [currentPassError,setCurrentPassError] = React.useState('');
    const [newPassError,setNewPassError] = React.useState('');
    const [newPassRepeatError,setNewPassRepeatError] = React.useState('');
    const updateHandler = (cb)=>{
           let flag=true;
       if(currentPass===''){
              setCurrentPassError("Current password required!");
              flag=false;
       }
       if(newPass===''||!(newPass.length>=8)){
              setNewPassError("Invalid new password!");
              flag=false;
       }
       if(newPassRepeat!==newPass){
              setNewPassRepeatError('Passwords doesn\'t match!');
              flag=false;
       }
       if(flag){
              axios.patch("/user/updatepassword",{
                     currentPassword:currentPass,
                     newPassword:newPass
              }).then((value)=>{
                     cb();
              })
              .catch((err)=>{
                     setNewPassError(err.data);
              })
       }
    }
    const togglePassword = ()=>{
           var old = document.getElementById('old');
           var newPass = document.getElementById('newPass');
           var newPassRe = document.getElementById('newPassRe');
           var type = old.getAttribute('type')==="text"?"password":"text";
           old.setAttribute('type',type);
           newPass.setAttribute('type',type);
           newPassRe.setAttribute('type',type);
    }
       return (
              <Modal
                     open = {openFlag}
                     aria-labelledby="simple-modal-title"
                     aria-describedby="simple-modal-description"
                     >
                     <div style={modalStyle} className={classes.paper}>
                            <Typography variant="h4">{title}</Typography><br/>
                            <Grid container spacing={2}> 
                                   <Grid item lg={4}>
                                          <TextField id="old" error={currentPassError===''?false:true} helperText={currentPassError} onChange={(e)=>{setCurrentPass(e.target.value)}} fullWidth variant="outlined" type="password" name="currentPass" label="current password" /><br/><br/>
                                   </Grid>
                                   <Grid item lg={4}>
                                          <TextField id="newPass"  error={newPassError===''?false:true}  helperText={newPassError}  onChange={(e)=>{setNewPass(e.target.value)}} fullWidth variant="outlined" type="password" name="newPass" label="new password" /><br/><br/>
                                   </Grid>
                                   <Grid item lg={4}>
                                          <TextField  id="newPassRe" error={newPassRepeatError===''?false:true} helperText={newPassRepeatError} onChange={(e)=>{setNewPassRepeat(e.target.value)}}  fullWidth variant="outlined" type="password" name="newPassRepeat" label="repeat new password" /><br/><br/>
                                   </Grid>
                                   <Grid item xs={12}>
                                          <FormControlLabel
                                                 control={<Checkbox  onChange={togglePassword} name="checkedA" />}
                                                 label="Show password"
                                          />
                                   </Grid>
                                   <Grid container justify="flex-end">
                                          <Button variant="contained" color="secondary" onClick={()=>{updateHandler(previewClose)}}>{buttonText}</Button>
                                   </Grid>
                            </Grid>
                     </div>
              </Modal>
       );
}

export default React.memo(UpdatePass);