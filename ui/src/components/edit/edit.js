import {Grid} from '@material-ui/core';
import PollEdit from '../pollEdit/pollEdit';
import {Route} from 'react-router-dom';
import Pollist from '../pollist/pollist';



const Edit = ()=>{
       return(
              <Grid container spacing={2}>
                     <Route exact path="/dashboard/polls/edit/:slag">
                         <PollEdit/>
                    </Route>
                    <Route exact path="/dashboard/polls/edit">
                            <Pollist/>
                    </Route>
                     
              </Grid>
       );
}

export default Edit;