import React, { useState, useEffect } from 'react';
import ChartArr from './ChartArr';
import { Line } from 'react-chartjs-2';

export default function Charts({ siteArr, table }) {
	const [ siteChart, setCharts ] = useState({
		site: '',
		data: [],
		lable: []
	});
	const [ showData, setShowData ] = useState(false);

	useEffect(
		() => {
			if (siteChart.length > 0) {
				setShowData(true);
			}
		},
		[ siteChart ]
	);

	const MakeData = (site) => {
		const temp = {
			labels: site.lable,
			datasets: [
				{
					label: `SiteID: ${site.site}`,
					data: site.data,
					lineTension: 0.1,
					backgroundColor: 'rgba(75,192,192,0.4)',
					borderColor: 'rgba(75,192,192,1)',
					borderCapStyle: 'butt',
					borderDash: [],
					borderDashOffset: 0.0,
					borderJoinStyle: 'miter',
					pointBorderColor: 'rgba(75,192,192,1)',
					pointBackgroundColor: '#fff',
					pointBorderWidth: 1,
					pointHoverRadius: 5,
					pointHoverBackgroundColor: 'rgba(75,192,192,1)',
					pointHoverBorderColor: 'rgba(220,220,220,1)',
					pointHoverBorderWidth: 2,
					pointRadius: 3,
					pointHitRadius: 10,
					fill: false // disables bezier curves
				}
			]
		};
		return temp;
	};
	return (
		<div>
			<ChartArr setCharts={setCharts} siteChart={siteChart} siteArr={siteArr} table={table} />
			{showData &&
				siteChart.map((site) => {
					return (
						<div key={site.site}>
							<Line data={MakeData(site)} width={100} height={20} />
						</div>
					);
				})}
		</div>
	);
}
