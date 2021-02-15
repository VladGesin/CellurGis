import React from 'react';
import { Fragment } from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ site }) => {
  const MakeBarVertical = (site) => {
    return {
      labels: site.dist,
      datasets: [
        {
          label: 'Counter Points',
          data: site.count,
          backgroundColor: 'rgb(0, 166, 185)',
          borderColor: 'rgb(0, 166, 185)',
          fill: false, // disables bezier curves
        },
        {
          label: 'Greater than 92',
          data: site.countRSRP,
          backgroundColor: 'rgb(185, 39, 0)',
          borderColor: 'rgb(185, 39, 0)',
          fill: false, // disables bezier curves
        },
      ],
    };
  };

  return (
    <Fragment>
      <Bar data={MakeBarVertical(site)} width={100} height={20} />
    </Fragment>
  );
};

export default BarChart;
