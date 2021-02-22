import React, { useState, useEffect } from 'react';
import api from '../../Utiles/api';
import ChartArr from './ChartArr';

export default function Charts({ sites, setShowImport, setSpinner }) {
  const [siteArr, setSiteArr] = useState([]);
  const [update, setUpdate] = useState(false);
  const [siteFinish, setSiteFinish] = useState([]);

  useEffect(() => {
    createObj();
    setUpdate(false);
    setSiteFinish([]);
  }, [sites]);

  useEffect(() => {
    if (update) {
      setCounterFromApi();
    }
  }, [update]);

  const createObj = async () => {
    if (sites.length > 0) {
      await setDistFromApi();
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
          dist: dists,
        };
      });
    };
    await Promise.all(sites.map(handleDistsSite)).then((res) => {
      setSiteArr(res);
      setUpdate(true);
    });
  };

  //Get data from api {url}/{count}
  const getDataFromApi = async (url, vars) => {
    const data = vars.map((val) => {
      return api.get(`${url}/${val}`).then((res) => {
        const chartRes = res.data[0];
        return Object.entries(chartRes)[0][1];
      });
    });
    return Promise.all(data).then((data) => {
      return data;
    });
  };

  //Make Chart arr from API
  const setCounterFromApi = async () => {
    const counter = siteArr.map((eachSite) => {
      const count = eachSite.dist;

      return Promise.all([
        getDataFromApi(`countrsrp/${eachSite.site_id}`, count),
        getDataFromApi(`countrsrpgreater/${eachSite.site_id}/${-92}`, count),
        getDataFromApi(`getmax/${eachSite.site_id}`, count),
        getDataFromApi(`getmin/${eachSite.site_id}`, count),
        getDataFromApi(`getavg/${eachSite.site_id}`, count),
      ]).then((res) => {
        // let charts = [];
        const charts = res.map((row) => {
          // charts.push(row);
          return row;
        });
        return {
          ...eachSite,
          count: charts[0],
          countRSRP: charts[1],
          max: charts[2],
          min: charts[3],
          avg: charts[4],
        };
      });
    });
    await Promise.all(counter).then((res) => {
      setSiteFinish(res);
    });
  };

  return (
    <div>
      {siteFinish && (
        <ChartArr
          siteArr={siteFinish}
          setShowImport={setShowImport}
          setSpinner={setSpinner}
        />
      )}
    </div>
  );
}
