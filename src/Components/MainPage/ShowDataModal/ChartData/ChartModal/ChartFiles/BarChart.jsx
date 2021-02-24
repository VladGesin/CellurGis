import React, { useState } from 'react';
import { Fragment } from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ site, rsrpRef, greaterCount }) => {
  function MakeBarVertical() {
    return {
      labels: site.labels,
      datasets: [
        {
          label: 'Counter Points',
          data: site.countRsrp,
          backgroundColor: 'rgb(0, 166, 185)',
          borderColor: 'rgb(0, 166, 185)',
          fill: false, // disables bezier curves
        },
        {
          label: `Greater than ${rsrpRef}`,
          data: greaterCount,
          backgroundColor: 'rgb(185, 39, 0)',
          borderColor: 'rgb(185, 39, 0)',
          fill: false, // disables bezier curves
        },
      ],
    };
  }

  return (
    <Fragment>
      <Bar data={MakeBarVertical()} width={100} height={20} />
    </Fragment>
  );
};

export default BarChart;
