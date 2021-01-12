import React, { useState, useEffect } from 'react';
import api from '../../../api';
import { Line, Bar } from 'react-chartjs-2';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

export default function ChartArr({ siteArr, setShowImport }) {
	const [ key, setKey ] = useState();
	const [ showData, setShowData ] = useState(false);

	useEffect(
		() => {
			if (siteArr.length > 0) {
				setShowData(true);
			}
		},
		[ siteArr ]
	);

	//Clean Charts after click on clean
	useEffect(
		() => {
			if (key == 1) {
				setShowData(false);
				setShowImport(true);
				cleanDataFromDB();
			}
		},
		[ key ]
	);

	//Clean Charts after click on clean
	const cleanDataFromDB = () => {
		api.delete('dots');
		api.delete('sites');
		api.delete('chartsdelete');
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
					data: 'site.data.max',
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
					data: 'site.data.min',
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
					data: 'site.data.avg',
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
	const MakeBar = (site) => {
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
					data: 'site.data.counter92',
					backgroundColor: 'rgb(185, 39, 0)',
					borderColor: 'rgb(185, 39, 0)',
					fill: false // disables bezier curves
				}
			]
		};
		return MakeBars;
	};

	return (
		<div>
			{showData &&
			siteArr.length && (
				<Tabs
					transition={false}
					id="noanim-tab-example"
					onSelect={(k) => setKey(k)}
					defaultActiveKey={siteArr[0].site_id}
				>
					{showData &&
						siteArr.map((site) => {
							return (
								<Tab eventKey={site.site_id} title={site.site_name} key={site.site_id}>
									<h3>{site.site_name}</h3>
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
