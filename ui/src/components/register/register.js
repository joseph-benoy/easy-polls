import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';




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
}));

const Register = ({ handleClose }) => {

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
    console.log(firstName, lastName, email, password);
    handleClose();
  };
  const toggleShowPass = ()=>{
       var main = document.getElementById('passwordMain');
       var confirm = document.getElementById('passwordConfirm');
       const flag = document.getElementById('passwordConfirm').getAttribute('type');
       if(flag==="password"){
              main.setAttribute('type','text');
              confirm.setAttribute('type','text');
              setEmailError('Invalid email');
       }
       else{
              main.setAttribute('type','password');
              confirm.setAttribute('type','password');    
       }
   }
  return (
    <form className={classes.root} onSubmit={handleSubmit}>
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
      <div>
        <Button variant="contained" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Signup
        </Button>
      </div>
    </form>
  );
};

export default React.memo((Register));