import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Typography } from '@material-ui/core';



function rand() {
       return Math.round(Math.random() * 20) - 10;
   }
   
   function getModalStyle() {
       const top = 50 + rand();
       const left = 50 + rand();
       /*
       {
           top: `${top}%`,
           left: `${left}%`,
           transform: `translate(-${top}%, -${left}%)`,
       };*/
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
           width: "500vh",
           backgroundColor: theme.palette.background.paper,
           boxShadow: theme.shadows[5],
           padding: theme.spacing(2, 4, 3),
       },
   }));




const CModal = ({title,description,buttonText,open,cb})=>{
       const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
       return (
              <Modal
                     open = {open}
                     aria-labelledby="simple-modal-title"
                     aria-describedby="simple-modal-description"
                     >
                     <div style={modalStyle} className={classes.paper}>
                            <Typography variant="h4">{title}</Typography>
                            <Typography  variant="body1">{description}</Typography>
                            <Button variant="contained" color="secondary" onClick={cb}>{buttonText}</Button>
                     </div>
              </Modal>
       );
}

export default CModal;