import React, { useState, useEffect } from 'react';
import api from '../../../api';
import ChartArr from './ChartArr';
import axios from 'axios';

export default function Charts({ sites, setShowImport }) {
	const [ siteArr, setSiteArr ] = useState([]);
	const [ update, setUpdate ] = useState(sites);

	useEffect(
		() => {
			setDistFromApi();
		},
		[ sites ]
	);

	useEffect(
		() => {
			setCounterFromApi();
		},
		[ update ]
	);

	useEffect(
		() => {
			setSiteArr([]);
		},
		[ setShowImport ]
	);

	const setDistFromApi = () => {
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

		Promise.all(sites.map(handleDistsSite)).then((res) => {
			setSiteArr(res);
			setUpdate(res);
		});
	};

	const getDataFromApi = (url, vars, site_id) => {
		let data = [];
		data = vars.map((val) => {
			return api.get(`${url}/${site_id}/${val}`).then((res) => {
				const count = res.data;
				return count[0].count;
			});
		});
		return data;
	};

	const setCounterFromApi = () => {
		const setCounterFromApi = (eachSite) => {
			// console.log(eachSite);
			let count = [];
			count = eachSite.dist.map((dist) => {
				return dist;
			});

			return Promise.all(getDataFromApi('countrsrp', count, eachSite.site_id)).then((res) => {
				return {
					...eachSite,
					count: res
				};
			});
		};

		Promise.all(siteArr.map(setCounterFromApi)).then((res) => {
			console.log(res);
			setSiteArr(res);
			console.log(siteArr);
		});
	};

	const test = () => {
		console.log(siteArr);
	};

	return (
		<div>
			<ChartArr siteArr={siteArr} setShowImport={setShowImport} />
		</div>
	);
}
