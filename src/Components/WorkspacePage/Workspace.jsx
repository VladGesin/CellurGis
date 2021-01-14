import React, { useState, useEffect } from 'react';
import Openfile from './XlsxHandler/Openfile';
import Charts from './Charts/Charts';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import api from '../../api';
import Alert from 'react-bootstrap/Alert';

const Workspace = () => {
	const [ sites, setSites ] = useState([]);
	const [ showSpinner, setSpinner ] = useState(false);
	const [ showImport, setShowImport ] = useState(!showSpinner);
	const [ alert, setAlert ] = useState(false);

	useEffect(
		() => {
			getSites();
		},
		[ showSpinner ]
	);

	useEffect(
		() => {
			if (sites.length > 0) {
				setSpinner(false);
				setShowImport(false);
				setAlert(false);
			}
		},
		[ sites ]
	);

	//Show import or loader
	useEffect(
		() => {
			setShowImport(!showSpinner);
			getSites();
		},
		[ showSpinner ]
	);

	//Check if sites in DB
	const getSites = async () => {
		await api.get('sites').then((res) => {
			if (res.data.length > 0) setSites(res.data);
		});
	};

	return (
		<div>
			{showImport && <Openfile setSpinner={setSpinner} setAlert={setAlert} setShowImport={setShowImport} />}
			<Charts sites={sites} setShowImport={setShowImport} setSpinner={setSpinner} />
			{alert && (
				<Alert variant="danger" onClose={() => setAlert(false)} dismissible>
					<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
					<p>Upload Only CSV Files</p>
				</Alert>
			)}
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
