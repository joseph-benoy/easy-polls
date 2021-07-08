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
               <Grid container>
                     <Grid item xs={12}>
                            <TextField fullWidth id="firstName" name="firstName" label="First name" />
                     </Grid>
                     <Grid item xs={12}>
                            <TextField fullWidth id="lastName" name="lastName" label="Last name" />
                     </Grid>
                     <Grid item xs={12}>
                            <TextField fullWidth id="email" name="email" label="Email" />
                     </Grid>
                     <Grid item xs={12} style={{marginTop:"2vh"}} container justify="flex-end">
                            <Button color="primary" variant="contained">Save</Button>
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
                            <Button variant="contained" onClick={()=>{setOpenFlag(true)}}>Change password</Button>
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
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
            sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
    </>
  );
}