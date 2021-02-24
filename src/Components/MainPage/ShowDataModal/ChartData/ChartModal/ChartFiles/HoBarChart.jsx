import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import { HorizontalBar } from 'react-chartjs-2';

const HoBarChart = ({ greaterCount, countRsrp, rsrpRef }) => {
  const [sumPoint, setSumPoint] = useState(0);
  const [sumPointGreather, setSumPointGreather] = useState(0);

  useEffect(() => {
    setSumPointGreather(calcCount(greaterCount));
    setSumPoint(calcCount(countRsrp));
  }, [greaterCount, countRsrp, rsrpRef]);

  const calcCount = (arr) => {
    return arr.reduce((a, b) => {
      return parseInt(a) + parseInt(b);
    }, 0);
  };

  const MakeBarHorizontal = () => {
    return {
      labels: ['Counter Points'],
      datasets: [
        {
          label: 'Summarize All Points',
          backgroundColor: 'rgb(0, 166, 185)',
          borderColor: 'rgb(0, 166, 185)',
          borderWidth: 1,
          data: [sumPoint],
        },
        {
          label: `Greater than ${rsrpRef} (${Math.floor(
            (sumPointGreather / sumPoint) * 100
          )}%)`,
          backgroundColor: 'rgb(185, 39, 0)',
          borderColor: 'rgb(185, 39, 0)',
          borderWidth: 1,
          data: [sumPointGreather],
        },
      ],
    };
  };

  return (
    <Fragment>
      <HorizontalBar data={MakeBarHorizontal()} width={90} height={20} />
    </Fragment>
  );
};

export default HoBarChart;
