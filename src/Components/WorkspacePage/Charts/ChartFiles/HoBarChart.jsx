import React from 'react';
import { Fragment } from 'react';
import { HorizontalBar } from 'react-chartjs-2';

const HoBarChart = ({ site }) => {
  const MakeBarHorizontal = (site) => {
    return {
      labels: ['Counter Points'],
      datasets: [
        {
          label: 'Summarize All Points',
          backgroundColor: 'rgb(0, 166, 185)',
          borderColor: 'rgb(0, 166, 185)',
          borderWidth: 1,
          data: [site.sumPoint],
        },
        {
          label: `Greater than 92 (${Math.floor(
            (site.sumPointRsrpG / site.sumPoint) * 100
          )}%)`,
          backgroundColor: 'rgb(185, 39, 0)',
          borderColor: 'rgb(185, 39, 0)',
          borderWidth: 1,
          data: [site.sumPointRsrpG],
        },
      ],
    };
  };

  return (
    <Fragment>
      <HorizontalBar data={MakeBarHorizontal(site)} width={100} height={20} />
    </Fragment>
  );
};

export default HoBarChart;
