import React, { useState } from 'react';
import Openfile from './XlsxHandler/Openfile';
import GetSites from './XlsxHandler/GetSites';
import ImportDB from './XlsxHandler/ImportDB';
import Charts from './Charts/Charts';

const Workspace = () => {
	const [ table, setTable ] = useState({ cols: null, rows: null });
	const [ siteArr, setSiteArr ] = useState([]);

	return (
		<div>
			<Openfile setTable={setTable} />
			<GetSites table={table} setSiteArr={setSiteArr} />
			{/* <ImportDB /> */}
			<Charts siteArr={siteArr} table={table} />
		</div>
	);
};

export default Workspace;
