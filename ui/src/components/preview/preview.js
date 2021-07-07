import './preview.scss';

import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';


   
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
           width: "500vh",
           backgroundColor: theme.palette.background.paper,
           boxShadow: theme.shadows[5],
           padding: theme.spacing(2, 4, 3),
       },
   }));




const Preview = ({title,description,options,buttonText,openFlag,previewClose})=>{
       const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const getOptions = (options)=>{
                     let items = [];
                     for(let i in options){
                            items.push(
                                   <ListItem>
                                          <ListItemIcon>
                                                 <RadioButtonUncheckedIcon />
                                          </ListItemIcon>
                                          <ListItemText primary={options[i]}/>
                                   </ListItem>
                            );
                     }
                     return items;
              }
       return (
              <Modal
                     open = {openFlag}
                     aria-labelledby="simple-modal-title"
                     aria-describedby="simple-modal-description"
                     >
                     <div style={modalStyle} className={classes.paper}>
                            <Typography variant="h4">{title}</Typography>
                            <Typography  variant="body1">{description}</Typography>
                            <List>
                                   {
                                          getOptions(options)
                                   }
                            </List>
                            <Button variant="contained" color="secondary" onClick={previewClose}>{buttonText}</Button>
                     </div>
              </Modal>
       );
}

export default React.memo(Preview);