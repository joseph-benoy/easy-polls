import React from 'react';
import './dashboard.scss'
import Dashbase from '../dashbase/dashbase';

const Dashboard = ()=>{
       return (
              <>
                     <Dashbase/>
              </>
       );
}

export default React.memo(Dashboard);