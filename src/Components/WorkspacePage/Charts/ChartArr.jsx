import React, { useState, useEffect } from 'react';

export default function ChartArr({ setCharts, siteChart, siteArr, table }) {
	const SiteDB = [
		{
			id: 42047,
			SiteID: 'UWBR204',
			Longitude: 35.12988333,
			Latitude: 31.86939722
		},
		{
			id: 41617,
			SiteID: 'UWBR161',
			Longitude: 35.11786,
			Latitude: 31.93812
		},
		{
			id: 24278,
			SiteID: 'URMC127',
			Longitude: 35.188844,
			Latitude: 31.908861
		}
	];
	const [ siteChar, setSiteChar ] = useState([]);
	useEffect(
		() => {
			setSiteChar([]);
			ChartParsh();
		},
		[ siteArr ]
	);

	//Calc Distance
	const CalcDist = (lat1, lon1, lat2, lon2) => {
		// var R = 6371; // km
		// var dLat = toRad(lat2 - lat1);
		// var dLon = toRad(lon2 - lon1);
		// var lat1 = toRad(lat1);
		// var lat2 = toRad(lat2);

		// var a =
		// 	Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		// 	Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
		// var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		// var d = R * c;
		// return d;
		var radlat1 = Math.PI * lat1 / 180;
		var radlat2 = Math.PI * lat2 / 180;
		var theta = lon1 - lon2;
		var radtheta = Math.PI * theta / 180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		dist = Math.acos(dist);
		dist = dist * 180 / Math.PI;
		dist = dist * 60 * 1.1515;
		dist = dist * 1.609344;

		return dist;
	};
	function toRad(Value) {
		return Value * Math.PI / 180;
	}

	//Make the var to the Charts
	const ChartParsh = () => {
		if (siteArr.length > 0) {
			siteArr.forEach((site) => {
				let temp = {
					data: [],
					lable: []
				};
				let idex = 0;
				var dist = 0;
				// let lable = [];
				table.rows.forEach((row) => {
					if (site === row[4]) {
						idex = SiteDB.findIndex((SiteDB) => {
							if (SiteDB.id === row[4]) {
								return true;
							}
						});
						dist = CalcDist(row[0], row[1], SiteDB[idex].Latitude, SiteDB[idex].Longitude); //calc dist
						row.push(dist.toFixed(0)); //push dist
						temp.data.push(row[3].toFixed(0));
						temp.lable.push(dist.toFixed(0) + 'km');
					}
				});
				siteChar.push({
					site: site,
					data: temp.data,
					lable: temp.lable
				});
			});
		}
		setCharts(siteChar);
	};

	return <div />;
}
