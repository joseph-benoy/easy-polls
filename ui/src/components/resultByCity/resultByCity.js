import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Typography } from '@material-ui/core';



const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const CityResult = (props) =>{
       const getDatasets = (data,options)=>{
              let resultByCountry = {};
              for(let option of options){
                     resultByCountry[option] = [];
              }
              for(let city in data){
                     for(let option of options){
                            resultByCountry[option].push(data[city].result[option]);
                     }
              }
              let dataset = [];
              let bgColours = ['rgb(255, 99, 132)','rgb(54, 162, 235)','rgb(75, 192, 192)','rgba(153, 102, 255, 1)','rgba(255, 159, 64, 1)'];
              let i = 0;
              for(let x in resultByCountry){
                     let obj = {
                            label:x,
                            data:[...resultByCountry[x]],
                            backgroundColor: bgColours[i]
                     };
                     i++;
                     dataset.push(obj);
              }
              return dataset;
       }
       const data = {
              labels: [...Object.keys(props.values)],
              datasets: [
                ...getDatasets(props.values,props.options)
              ],
            };
        return (
  <>
       <Typography style={{fontWeight:"bold"}} varient="h4">Result by City</Typography><br/>
    <Bar data={data} options={options} />
  </>
);
}
export default CityResult;