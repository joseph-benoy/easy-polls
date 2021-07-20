import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Typography } from '@material-ui/core';
import { Grid } from '@material-ui/core';

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




const DeleteModal = ({title,urlSlag,expiry,open,cb})=>{
       const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
       return (
              <Modal
                     open = {open}
                     aria-labelledby="simple-modal-title"
                     aria-describedby="simple-modal-description"
                     >
                     <div style={modalStyle} className={classes.paper}>
                            <Typography variant="h5">Deleted</Typography>
                            <Typography  variant="body1">Poll is now deleted!</Typography>
                            <Grid container>
                                   <Grid item xs={12} container justify="flex-end">
                                          <Button variant="contained" color="primary" onClick={cb}>Close</Button>
                                   </Grid>                            
                            </Grid>
                     </div>
              </Modal>
       );
}

export default DeleteModal;