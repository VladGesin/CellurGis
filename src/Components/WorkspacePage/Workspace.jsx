import React, { useState } from 'react';
import Openfile from './Openfile';
import GetSites from './GetSites';

const Workspace = () => {
	const [ table, setTable ] = useState({ cols: null, rows: null });
	const [ siteArr, setSiteArr ] = useState([]);

	return (
		<div>
			<Openfile setTable={setTable} />
			<GetSites table={table} setSiteArr={setSiteArr} siteArr={siteArr} />
			{table && console.log(table)}
			{siteArr && console.log(siteArr)}
		</div>
	);
};

export default Workspace;
