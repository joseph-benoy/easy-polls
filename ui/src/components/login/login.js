/* eslint-disable no-useless-escape */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import './login.scss'
import {  useHistory } from 'react-router'
import axios from 'axios';



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
       fontWeight:"bold",
       marginBottom:'10vh'
     }
}));

const LoginPage = () => {
  let history = useHistory();
  const classes = useStyles();
  // create state variables for each input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
       const [emailError,setEmailError] = useState('');
       const [passwordError,setPasswordError] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
       const emailValue = document.getElementById('email').value;
       const passwordValue = document.getElementById('passwordMain').value;
       let loginFlag = true;
       if(!(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i).test(emailValue)){
              setEmailError('Invalid email');
              loginFlag = false;
       }
       else{
              setEmailError('')
              loginFlag = true;
       }
       if(passwordValue.length<8){
              setPasswordError('Password must 8 characters long');
              loginFlag = false;
       }
       else{
              setPasswordError('');
              loginFlag = true;
       }
       if(loginFlag){
          let data = {
            username:emailValue,
            password:passwordValue
          };
          axios.post("/user/login",data)
          .then((value)=>{
            history.push("/dashboard");
          })
          .catch((err)=>{
            console.log(err);
          });
       }
    };
  const toggleShowPass = ()=>{
       var main = document.getElementById('passwordMain');
       const flag = document.getElementById('passwordMain').getAttribute('type');
       if(flag==="password"){
              main.setAttribute('type','text');
       }
       else{
              main.setAttribute('type','password');
       }
   }
  return (
       <>
       <AppBar className={classes.appbar} position="sticky">
              <Toolbar>
              <Typography align="center" variant="h5">Easy Polls</Typography>
              </Toolbar>
       </AppBar>
        <form id="form" className={classes.root} onSubmit={handleSubmit} style={{
          boxShadow:"0px 4px 8px 0px rgba(0,0,0,0.3)",
          borderRadius:"10px",
          width:"30vw",
          margin:"0 auto"
        }}>
          <Typography align="center" variant="h5" color="primary">Sign In</Typography>
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
      <div>
        <Button type="submit" variant="contained" color="primary" size="large">
          Sign In
        </Button>
      </div>
      <Link
      underline	="none"
          component="button"
          variant="body1"
          onClick={(e) => {
            e.preventDefault();
            history.push("/signup");
          }}
      >
          Sign Up
      </Link>
    </form>
    </>
  );
};

export default React.memo((LoginPage));