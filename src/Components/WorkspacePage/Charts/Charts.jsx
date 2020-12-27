import React, { useState, useEffect } from 'react';
import ChartArr from './ChartArr';
import { Line, Bar } from 'react-chartjs-2';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TabPane from 'react-bootstrap/TabPane';
import TabContainer from 'react-bootstrap/TabContainer';

export default function Charts({ siteArr, table, siteChart, setCharts, setShowImport }) {
	// const [ siteChart, setCharts ] = useState([]);
	const [ showData, setShowData ] = useState(false);
	const [ key, setKey ] = useState();

	useEffect(
		() => {
			if (siteChart.length > 0) {
				setShowData(true);
			}
		},
		[ siteChart ]
	);

	useEffect(
		() => {
			console.log(key);
			if (key == 1) {
				setShowData(false);
				setCharts([]);
				setShowImport(true);
				console.log('Enter Close Data');
			}
		},
		[ key ]
	);
	//Make charts

	const MakeLine = (site) => {
		const temp = {
			labels: site.data.lable,
			datasets: [
				{
					label: 'RSRP max',
					data: site.data.max,
					pointBorderWidth: 2,
					pointHoverRadius: 6,
					pointRadius: 5,
					backgroundColor: 'rgb(255, 0, 0)',
					borderColor: 'rgb(175, 0, 0)',
					pointBorderColor: 'rgb(175, 0, 0)',
					pointBackgroundColor: '#fff',
					pointHoverBackgroundColor: 'rgb(255, 0, 0)',
					pointHoverBorderColor: 'rgb(0, 0, 0)',
					fill: false // disables bezier curves
				},
				{
					label: 'RSRP min',
					data: site.data.min,
					pointBorderWidth: 2,
					pointHoverRadius: 6,
					pointRadius: 5,
					backgroundColor: 'rgb(0, 0, 255)',
					borderColor: 'rgb(0, 0, 175)',
					pointBorderColor: 'rgb(0, 0, 175)',
					pointBackgroundColor: '#fff',
					pointHoverBackgroundColor: 'rgb(0, 0, 255)',
					pointHoverBorderColor: 'rgb(0, 0, 0)',
					fill: false // disables bezier curves
				},
				{
					label: 'RSRP avg',
					data: site.data.avg,
					pointBorderWidth: 2,
					pointHoverRadius: 6,
					pointRadius: 5,
					backgroundColor: 'rgb(0, 255, 0)',
					borderColor: 'rgb(0, 175, 0)',
					pointBorderColor: 'rgb(0, 175, 0)',
					pointBackgroundColor: '#fff',
					pointHoverBackgroundColor: 'rgb(0, 255, 0)',
					pointHoverBorderColor: 'rgb(0, 0, 0)',
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
					backgroundColor: 'rgb(0, 166, 185)',
					borderColor: 'rgb(0, 166, 185)',
					fill: false // disables bezier curves
				},
				{
					label: 'Greater than 92',
					data: site.data.counter92,
					backgroundColor: 'rgb(185, 39, 0)',
					borderColor: 'rgb(185, 39, 0)',
					fill: false // disables bezier curves
				}
			]
		};
		return temp;
	};

	return (
		<div>
			<ChartArr setCharts={setCharts} siteArr={siteArr} table={table} />
			{showData && (
				<Tabs
					transition={false}
					id="noanim-tab-example"
					onSelect={(k) => setKey(k)}
					defaultActiveKey={siteChart[0].site.site}
				>
					{showData &&
						siteChart.map((site) => {
							return (
								<Tab eventKey={site.site} title={site.site} key={site.site}>
									<Line data={MakeLine(site)} width={100} height={20} />
									<Bar data={MakeBar(site)} width={100} height={20} />
								</Tab>
							);
						})}
					{showData && <Tab eventKey={1} title="Clean" />}
				</Tabs>
			)}
		</div>
	);
}
