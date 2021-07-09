import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router';
import { Grid } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
   
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




const PollSuccess = ({title,urlSlag,open,cb})=>{
       const classes = useStyles();
       const history = useHistory();
    const [modalStyle] = React.useState(getModalStyle);
       return (
              <Modal
                     open = {open}
                     aria-labelledby="simple-modal-title"
                     aria-describedby="simple-modal-description"
                     >
                     <div style={modalStyle} className={classes.paper}>
                            <Typography variant="h5">{title}</Typography>
                            <Typography  variant="body1">{`Your poll is now online. Share the following link with your audience.`}</Typography>
                            <Typography style={{backgroundColor:"rgba(0,0,0,0.1)",borderRadius:"3px",padding:"0.5% 1%",color:"rgba(0,0,0,0.8)",fontFamily:"monospace",margin:"2vh",display:"table"}} variant="body2">{`easypolls.com/vote/${urlSlag}`}        
                                   <IconButton aria-label="copy">
                                          <FileCopyIcon fontSize="small" />
                                   </IconButton>
                            </Typography>
                            <Grid container>
                                   <Grid item xs={12} container justify="flex-end">
                                          <Button variant="contained" color="primary" onClick={cb}>Close</Button>
                                   </Grid>                            
                            </Grid>
                     </div>
              </Modal>
       );
}

export default PollSuccess;