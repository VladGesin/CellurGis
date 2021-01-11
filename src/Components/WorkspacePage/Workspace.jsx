import React, { useState, useEffect } from 'react';
import Openfile from './XlsxHandler/Openfile';
import Charts from './Charts/Charts';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import api from '../../api';

const Workspace = () => {
	const [ siteArr, setSiteArr ] = useState([]);
	const [ showSpinner, setSpinner ] = useState(false);
	const [ showImport, setShowImport ] = useState(!showSpinner);

	useEffect(
		() => {
			if (siteArr.length > 0) {
				setSpinner(false);
				setShowImport(false);
			}
		},
		[ siteArr ]
	);

	//Get site arr
	useEffect(() => {
		getSites();
	}, []);

	//Show import or loader
	useEffect(
		() => {
			setShowImport(!showSpinner);
		},
		[ showSpinner ]
	);
	//Check if sites in DB
	const getSites = () => {
		api.get('sites').then((res) => setSiteArr(res.data));
	};

	return (
		<div>
			{showImport && <Openfile setSpinner={setSpinner} />}
			<Charts siteArr={siteArr} setShowImport={setShowImport} showSpinner={showSpinner} />
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
