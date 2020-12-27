import React, { useState, useEffect } from 'react';
import Openfile from './XlsxHandler/Openfile';
import GetSites from './XlsxHandler/GetSites';
import Charts from './Charts/Charts';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

const Workspace = () => {
	const [ table, setTable ] = useState({ cols: null, rows: null });
	const [ siteArr, setSiteArr ] = useState([]);
	const [ siteChart, setCharts ] = useState([]);
	const [ showSpinner, setSpinner ] = useState(false);

	useEffect(
		() => {
			if (siteChart.length > 0) {
				setSpinner(false);
			}
		},
		[ siteChart ]
	);

	return (
		<div>
			<Openfile setTable={setTable} setSpinner={setSpinner} showSpinner={showSpinner} />
			<GetSites table={table} setSiteArr={setSiteArr} />
			<Charts siteArr={siteArr} table={table} siteChart={siteChart} setCharts={setCharts} />
			<Loader
				type="TailSpin"
				color="#00BFFF"
				height={100}
				width={100}
				visible={showSpinner}
				className="d-flex justify-content-center mt-25%"
				style={{ marginTop: '25%' }}
			/>
		</div>
	);
};

export default Workspace;
