import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Typography } from '@material-ui/core';
import { useHistory } from 'react-router';


   
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
                            <Button variant="contained" color="secondary" onClick={cb}>close</Button>
                     </div>
              </Modal>
       );
}

export default PollSuccess;