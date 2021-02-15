import React from 'react';
import { Fragment } from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ site }) => {
  const MakeLine = (site) => {
    return {
      labels: site.dist,
      datasets: [
        {
          label: 'RSRP max',
          data: site.max,
          pointBorderWidth: 2,
          pointHoverRadius: 6,
          pointRadius: 5,
          backgroundColor: 'rgb(255, 0, 0)',
          borderColor: 'rgb(175, 0, 0)',
          pointBorderColor: 'rgb(175, 0, 0)',
          pointBackgroundColor: '#fff',
          pointHoverBackgroundColor: 'rgb(255, 0, 0)',
          pointHoverBorderColor: 'rgb(0, 0, 0)',
          fill: false, // disables bezier curves
        },
        {
          label: 'RSRP min',
          data: site.min,
          pointBorderWidth: 2,
          pointHoverRadius: 6,
          pointRadius: 5,
          backgroundColor: 'rgb(0, 0, 255)',
          borderColor: 'rgb(0, 0, 175)',
          pointBorderColor: 'rgb(0, 0, 175)',
          pointBackgroundColor: '#fff',
          pointHoverBackgroundColor: 'rgb(0, 0, 255)',
          pointHoverBorderColor: 'rgb(0, 0, 0)',
          fill: false, // disables bezier curves
        },
        {
          label: 'RSRP avg',
          data: site.avg,
          pointBorderWidth: 2,
          pointHoverRadius: 6,
          pointRadius: 5,
          backgroundColor: 'rgb(0, 255, 0)',
          borderColor: 'rgb(0, 175, 0)',
          pointBorderColor: 'rgb(0, 175, 0)',
          pointBackgroundColor: '#fff',
          pointHoverBackgroundColor: 'rgb(0, 255, 0)',
          pointHoverBorderColor: 'rgb(0, 0, 0)',
          fill: false, // disables bezier curves
        },
      ],
    };
  };

  return (
    <Fragment>
      <Line data={MakeLine(site)} width={100} height={20} />
    </Fragment>
  );
};

export default LineChart;
