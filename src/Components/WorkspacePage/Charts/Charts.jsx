import React, { useState, useEffect } from 'react';
import api from '../../../api';
import ChartArr from './ChartArr';

export default function Charts({ sites, setShowImport }) {
	const [ siteArr, setSiteArr ] = useState([]);
	const [ update, setUpdate ] = useState(false);
	const [ siteFinish, setSiteFinish ] = useState([]);
	const [ charts, setCharts ] = useState([]);

	useEffect(
		() => {
			createObj();
			setUpdate(false);
			setSiteFinish([]);
		},
		[ sites ]
	);

	useEffect(
		() => {
			if (update) {
				setCounterFromApi();
			}
		},
		[ update ]
	);

	const createObj = async () => {
		if (sites.length > 0) {
			await setDistFromApi();
			// setCounterFromApi();
		}
	};

	//Get Diffrent distances from DB
	const setDistFromApi = async () => {
		const handleDistsSite = (eachSite) => {
			return api.get(`sitedist/${eachSite.site_id}`).then((res) => {
				const dists = res.data.map((el) => {
					return el.dist;
				});
				return {
					...eachSite,
					dist: dists
				};
			});
		};
		await Promise.all(sites.map(handleDistsSite)).then((res) => {
			setSiteArr(res);
			setUpdate(true);
		});
	};

	const getDataFromApi = async (url, vars) => {
		const data = vars.map((val) => {
			return api.get(`${url}/${val}`).then((res) => {
				const chartRes = res.data[0];
				return chartRes.count;
			});
		});
		console.log(data);
		return Promise.all(data).then((data) => {
			return data;
		});
	};

	const setCounterFromApi = async () => {
		const counter = siteArr.map((eachSite) => {
			const count = eachSite.dist;

			return Promise.all([
				getDataFromApi(`countrsrp/${eachSite.site_id}`, count),
				getDataFromApi(`countrsrpgreater/${eachSite.site_id}/${-92}`, count)
			]).then((res) => {
				// console.log(res);
				res.map((row) => {
					console.log(row);
					charts.push(row);
				});
				console.log(charts);
				return {
					...eachSite,
					count: charts[0],
					countRSRP: charts[1]
				};
			});
		});
		await Promise.all(counter).then((res) => {
			console.log(res);
			setSiteFinish(res);
		});
	};

	return <div>{siteFinish && <ChartArr siteArr={siteFinish} setShowImport={setShowImport} />}</div>;
}
