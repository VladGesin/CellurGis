import { Label } from 'bizcharts';
import React, { useState, useEffect } from 'react';

export default function ChartArr({ setCharts, siteArr, table }) {
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
	const [ siteCharts, setSiteChart ] = useState([]);

	useEffect(
		() => {
			ChartParsh();
			setSiteChart([]);
		},
		[ siteArr ]
	);

	//Calc Distance
	const CalcDist = (lat1, lon1, lat2, lon2) => {
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

	//Make the arr to parsh
	const ArrParsh = (arr) => {
		arr.forEach((row) => {
			let temp = {
				lable: [],
				max: [],
				min: [],
				counter: [],
				avg: [],
				counter92: []
			};

			row.lables.forEach((lable) => {
				//Reset values i need to find
				let min = 0;
				let max = 0;
				let counter = 0;
				let counter92 = 0;
				let sum = 0;
				let avg = 0;
				for (let i = 0; i < row.data.length; i++) {
					if (row.lable[i] === lable) {
						//Get the first values in the start of the lables
						if (min === 0 && max === 0) {
							min = row.data[i];
							max = row.data[i];
						}
						if (row.data[i] > max) max = row.data[i];
						if (row.data[i] < min) min = row.data[i];
						if (row.data[i] > -92) counter92++;
						counter++;
						sum += row.data[i];
					}
				}
				avg = parseInt(sum / counter.toFixed(0));
				console.log(
					`
          site: ${row.site}
          KM: ${lable}
          min: ${min} 
          max: ${max} 
          counter: ${counter}
          sum: ${sum}
          avg: ${avg} 
          counter92: ${counter92}
          `
				);
				//Here need to push to arr
				// temp.push({
				// 	lable: lable,
				// 	min: min,
				// 	max: max,
				// 	counter: counter,
				// 	avg: avg,
				// 	counter92: counter92
				// });
				temp.lable.push(lable);
				temp.min.push(min);
				temp.max.push(max);
				temp.counter.push(counter);
				temp.avg.push(avg);
				temp.counter92.push(counter92);
				console.log(temp);
			});
			siteCharts.push({
				site: row.site,
				data: temp
			});
		});
		console.log(siteCharts);
		setCharts(siteCharts);
	};

	//Make the var to the Charts
	const ChartParsh = () => {
		let siteChar = [];
		if (siteArr.length > 0) {
			siteArr.forEach((site) => {
				let temp = {
					data: [],
					lable: [],
					lables: []
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
						temp.data.push(parseInt(row[3].toFixed(0)));
						temp.lable.push(parseInt(dist.toFixed(0)));
						if (!temp.lables.includes(parseInt(dist.toFixed(0))))
							temp.lables.push(parseInt(dist.toFixed(0))); //Get unic lables
					}
				});

				siteChar.push({
					site: site,
					data: temp.data,
					lable: temp.lable,
					lables: temp.lables
				});
			}); //make the chart data from the table

			ArrParsh(siteChar);
		}
	};

	return <div />;
}
