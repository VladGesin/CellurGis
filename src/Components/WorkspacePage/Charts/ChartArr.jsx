import React, { useState, useEffect } from 'react';

export default function ChartArr({ setCharts, siteArr }) {
	const [ siteCharts, setSiteChart ] = useState([]);

	useEffect(
		() => {
			setSiteChart([]);
		},
		[ siteArr ]
	);

	return <div />;
}
