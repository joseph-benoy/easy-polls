import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';

const OptionChart = (props)=>{
       const data = {
              labels:[...props.options],
              datasets:[
                     {
                            data:[...props.values],
                            backgroundColor: [
                                   'rgba(255, 99, 132, 0.2)',
                                   'rgba(54, 162, 235, 0.2)',
                                   'rgba(255, 206, 86, 0.2)',
                                   'rgba(75, 192, 192, 0.2)',
                                   'rgba(153, 102, 255, 0.2)',
                                   'rgba(255, 159, 64, 0.2)',
                                 ],
                                 borderColor: [
                                   'rgba(255, 99, 132, 1)',
                                   'rgba(54, 162, 235, 1)',
                                   'rgba(255, 206, 86, 1)',
                                   'rgba(75, 192, 192, 1)',
                                   'rgba(153, 102, 255, 1)',
                                   'rgba(255, 159, 64, 1)',
                                 ],
                                 borderWidth: 1,
                     }
              ]
       };
            return(
                   <>
                   <Typography style={{fontWeight:"bold"}} varient="h4">Result by options</Typography><br/>
                   <Pie data={data} />
              </>
            );
}

export default OptionChart;