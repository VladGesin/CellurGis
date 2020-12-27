import React, { useEffect } from 'react';

export default function GetSites({ table, setSiteArr }) {
	let siteList = [];
	useEffect(
		() => {
			updateList();
		},
		[ table.rows ]
	);
	const updateList = () => {
		if (table.rows != null) {
			table.rows.map((row) => {
				if (!siteList.includes(row[4])) {
					siteList.push(row[4]);
				}
			});
			setSiteArr(siteList);
		}
	};

	return <div />;
}
