import React from 'react';
import {Route} from 'react-router-dom';
import './dashboard.scss'
import Dashbase from '../dashbase/dashbase';
imp

const Dashboard = ()=>{
       return (
              <>
              <Dashbase/>
              <Route path="/dashboard/home">
              </Route>
              <Route path="/dashboard/createentry">
              </Route>
              <Route path="/dashboard/read">
              </Route>
              <Route path="/dashboard/memories">
              </Route>
              <Route path="/dashboard/settings">
              </Route>
              </>
       );
}

export default React.memo(Dashboard);