import React, { useState, useEffect } from 'react';
import api from '../../../api';
import ChartArr from './ChartArr';

export default function Charts({ sites, setShowImport }) {
	const [ siteArr, setSiteArr ] = useState([]);
	const [ update, setUpdate ] = useState(false);
	const [ siteFinish, setSiteFinish ] = useState([]);

	useEffect(
		() => {
			createObj();
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

	const getDataFromApi = (url, vars) => {
		const data = vars.map((val) => {
			return api.get(`${url}/${val}`).then((res) => {
				const count = res.data;
				return count[0].count;
			});
		});
		return data;
	};

	const setCounterFromApi = async () => {
		const counter = siteArr.map((eachSite) => {
			const count = eachSite.dist;

			return Promise.all([
				getDataFromApi(`countrsrp/${eachSite.site_id}`, count),
				getDataFromApi(`countrsrpgreater/${eachSite.site_id}/${-92}`, count)
			]).then((res) => {
				res.map((row) =>
					Promise.all(row).then((row) => {
						console.log(row);
					})
				);
				return {
					...eachSite,
					count: 10,
					countRSRP: 10
				};
			});
		});
		Promise.all(counter).then((res) => {
			console.log(res);
			setSiteFinish(res);
		});
	};

	return <div>{siteFinish && <ChartArr siteArr={siteFinish} setShowImport={setShowImport} />}</div>;
}
