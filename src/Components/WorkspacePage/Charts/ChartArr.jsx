import React, { useState, useEffect } from 'react';
import api from '../../../api';
import { Line, Bar, HorizontalBar } from 'react-chartjs-2';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

export default function ChartArr({ siteArr, setShowImport, setSpinner }) {
	const [ key, setKey ] = useState();
	const [ siteChart, setSiteChart ] = useState(siteArr);

	//SetUp chart Values
	useEffect(
		() => {
			if (siteArr.length > 0) {
				setSiteChart(siteArr);
				createDistance();
			}
		},
		[ siteArr ]
	);

	//Clean Charts after click on clean
	useEffect(
		() => {
			if (key == 1) {
				setShowImport(true);
				cleanDataFromDB();
			}
		},
		[ key ]
	);

	useEffect(
		() => {
			setSpinner(false);
		},
		[ siteChart ]
	);

	//Set Distance to string with KM
	const createDistance = () => {
		const newCharts = siteArr.map((site) => {
			const sumPoint = calcCount(site.count);
			const sumPointRsrpG = calcCount(site.countRSRP);
			const newDist = site.dist.map((dist) => {
				return dist + 'km';
			});
			return {
				...site,
				dist: newDist,
				sumPoint: sumPoint,
				sumPointRsrpG: sumPointRsrpG
			};
		});
		setSiteChart(newCharts);
	};

	//Clean Charts after click on clean
	const cleanDataFromDB = () => {
		api.delete('dots');
		api.delete('sites');
		api.delete('chartsdelete');
		setSiteChart([]);
	};
	//site arr
	/*latitude: 31.869398
		longitude: 35.129883
		site_id: 42047
		site_name: "UWBR204"*/

	const MakeLine = (site) => {
		const MakeLines = {
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
					fill: false // disables bezier curves
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
					fill: false // disables bezier curves
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
					fill: false // disables bezier curves
				}
			]
		};
		return MakeLines;
	};
	const MakeBarVertical = (site) => {
		const MakeBars = {
			labels: site.dist,
			datasets: [
				{
					label: 'Counter Points',
					data: site.count,
					backgroundColor: 'rgb(0, 166, 185)',
					borderColor: 'rgb(0, 166, 185)',
					fill: false // disables bezier curves
				},
				{
					label: 'Greater than 92',
					data: site.countRSRP,
					backgroundColor: 'rgb(185, 39, 0)',
					borderColor: 'rgb(185, 39, 0)',
					fill: false // disables bezier curves
				}
			]
		};
		return MakeBars;
	};

	const calcCount = (arr) => {
		return arr.reduce((a, b) => {
			return parseInt(a) + parseInt(b);
		}, 0);
	};

	const MakeBarHorizontal = (site) => {
		const MakeBars = {
			labels: [ 'Counter Points' ],
			datasets: [
				{
					label: 'Summarize All Points',
					backgroundColor: 'rgb(0, 166, 185)',
					borderColor: 'rgb(0, 166, 185)',
					borderWidth: 1,
					data: [ site.sumPoint ]
				},
				{
					label: `Greater than 92 (${Math.floor(site.sumPointRsrpG / site.sumPoint * 100)}%)`,
					backgroundColor: 'rgb(185, 39, 0)',
					borderColor: 'rgb(185, 39, 0)',
					borderWidth: 1,
					data: [ site.sumPointRsrpG ]
				}
			]
		};
		return MakeBars;
	};

	return (
		<div>
			{siteChart.length && (
				<Tabs
					transition={false}
					id="noanim-tab-example"
					onSelect={(k) => setKey(k)}
					defaultActiveKey={siteChart[0].site_id}
				>
					{siteChart.map((site) => {
						return (
							<Tab eventKey={site.site_id} title={site.site_name} key={site.site_id}>
								<h3>{site.site_name}</h3>
								<Line data={MakeLine(site)} width={100} height={20} />
								<Bar data={MakeBarVertical(site)} width={100} height={20} />
								<HorizontalBar data={MakeBarHorizontal(site)} width={100} height={20} />
							</Tab>
						);
					})}
					{siteChart && <Tab eventKey={1} title="Clean" />}
				</Tabs>
			)}
		</div>
	);
}
