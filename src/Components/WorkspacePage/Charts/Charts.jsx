import React, { useState, useEffect } from 'react';
import ChartArr from './ChartArr';
import { Line, Bar } from 'react-chartjs-2';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

export default function Charts({ siteArr, table, siteChart, setCharts }) {
	// const [ siteChart, setCharts ] = useState([]);
	const [ showData, setShowData ] = useState(false);

	useEffect(
		() => {
			if (siteChart.length > 0) {
				setShowData(true);
			}
		},
		[ siteChart ]
	);

	//Make charts

	const MakeLine = (site) => {
		const temp = {
			labels: site.data.lable,
			datasets: [
				{
					label: 'RSRP max',
					data: site.data.max,
					fill: false // disables bezier curves
				},
				{
					label: 'RSRP min',
					data: site.data.min,
					fill: false // disables bezier curves
				},
				{
					label: 'RSRP avg',
					data: site.data.avg,
					fill: false // disables bezier curves
				}
			]
		};
		return temp;
	};

	const MakeBar = (site) => {
		const temp = {
			labels: site.data.lable,
			datasets: [
				{
					label: 'Counter Points',
					data: site.data.counter,
					fill: false // disables bezier curves
				},
				{
					label: 'Greater than 92',
					data: site.data.counter92,
					fill: false // disables bezier curves
				}
			]
		};
		return temp;
	};
	return (
		<div>
			<ChartArr setCharts={setCharts} siteArr={siteArr} table={table} />
			<Tabs transition={false} id="noanim-tab-example">
				{showData &&
					siteChart.map((site) => {
						return (
							<Tab eventKey={site.site} title={site.site} key={site.site}>
								<Line data={MakeLine(site)} width={100} height={20} />
								<Bar data={MakeBar(site)} width={100} height={20} />
							</Tab>
						);
					})}
				<Tab eventKey="Clean" title="Clean" />
			</Tabs>
		</div>
	);
}
