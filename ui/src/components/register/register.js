/* eslint-disable no-useless-escape */
/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import './register.scss';
import {  useHistory } from 'react-router'



const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
  appbar: {
       alignItems: 'center',
       fontWeight:"bold"
     }
}));

const Register = () => {
  let history = useHistory();
  const handleClose = ()=>{
    history.push("/");
  }
  const classes = useStyles();
  // create state variables for each input
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
       const [emailError,setEmailError] = useState('');
       const [passwordError,setPasswordError] = useState('');
       const [confirmPasswordError,setConfirmPasswordError] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
       const emailValue = document.getElementById('email').value;
       const passwordValue = document.getElementById('passwordMain').value;
       const confirmPasswordValue = document.getElementById('passwordConfirm').value;
       if(!(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(emailValue)){
              setEmailError('Invalid email')
       }
       else{
              setEmailError('')
       }
       if(passwordValue!==confirmPasswordValue){
              setConfirmPasswordError('Passwords don\'t match');
       }
       else{
              setConfirmPasswordError('');
       }
       if(passwordValue.length<8){
              setPasswordError('Password must 8 characters long');
       }
       else{
              setPasswordError('');
       }
//    handleClose();
  };
  const toggleShowPass = ()=>{
       var main = document.getElementById('passwordMain');
       var confirm = document.getElementById('passwordConfirm');
       const flag = document.getElementById('passwordConfirm').getAttribute('type');
       if(flag==="password"){
              main.setAttribute('type','text');
              confirm.setAttribute('type','text');
       }
       else{
              main.setAttribute('type','password');
              confirm.setAttribute('type','password');    
       }
   }
  return (
       <>

       <AppBar className={classes.appbar} position="sticky">
              <Toolbar>
              <Typography align="center" variant="h5">Easy Polls</Typography>
              </Toolbar>
       </AppBar>
<form className={classes.root} onSubmit={handleSubmit} id="form">
<Typography align="center" variant="h5" color="primary">Sign In</Typography>

      <TextField
        label="First Name"
        variant="outlined"
        required
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        required
        value={lastName}
        onChange={e => setLastName(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        helperText={emailError}
        error={emailError!==''?true:false}
        id="email"
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        required
        value={password}
        onChange={e => setPassword(e.target.value)}
        helperText={passwordError}
        id="passwordMain"
        error={passwordError!==''?true:false}
      />
       <TextField
        label="Confirm password"
        variant="outlined"
        type="password"
        required
        value={confirmPassword}
        id="passwordConfirm"
        onChange={e => setConfirmPassword(e.target.value)}
        helperText={confirmPasswordError}
        error={confirmPasswordError!==''?true:false}
      />
      <FormControlLabel
        control={
          <Checkbox
            onChange={toggleShowPass}
            name="checkedB"
            color="primary"
          />
        }
        label="Show password"
      />
      <div style={{marginTop:"-3vh"}}>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Signup
        </Button>
      </div>
    </form>
    </>
  );
};

export default React.memo((Register));