import React, { useState, useEffect } from 'react';
import api from '../../Utiles/api';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import HoBarChart from './ChartFiles/HoBarChart';
import BarChart from './ChartFiles/BarChart';
import LineChart from './ChartFiles/LineChart';

export default function ChartArr({ siteArr, setShowImport, setSpinner }) {
  const [key, setKey] = useState();
  const [siteChart, setSiteChart] = useState(siteArr);

  //SetUp chart Values
  useEffect(() => {
    if (siteArr.length > 0) {
      setSiteChart(siteArr);
      createDistance();
    }
  }, [siteArr]);

  //Clean Charts after click on clean
  useEffect(() => {
    if (key == 1) {
      setShowImport(true);
      cleanDataFromDB();
    }
  }, [key]);

  useEffect(() => {
    setSpinner(false);
  }, [siteChart]);

  //Set Distance to string with KM
  const createDistance = () => {
    const newCharts = siteArr.map((site) => {
      const sumPoint = calcCount(site.count);
      const sumPointRsrpG = calcCount(site.countRSRP);
      const newDist = site.dist.map((dist) => {
        return dist + 'km';
      });
      return {
        ...site,
        dist: newDist,
        sumPoint: sumPoint,
        sumPointRsrpG: sumPointRsrpG,
      };
    });
    setSiteChart(newCharts);
  };

  //Clean Charts after click on clean
  const cleanDataFromDB = () => {
    api.delete('dots');
    api.delete('sites');
    api.delete('chartsdelete');
    setSiteChart([]);
  };
  //site arr
  /*latitude: 31.869398
		longitude: 35.129883
		site_id: 42047
		site_name: "UWBR204"*/

  const calcCount = (arr) => {
    return arr.reduce((a, b) => {
      return parseInt(a) + parseInt(b);
    }, 0);
  };

  return (
    <div>
      {siteChart.length && (
        <Tabs
          transition={false}
          id="noanim-tab-example"
          onSelect={(k) => setKey(k)}
          defaultActiveKey={siteChart[0].site_id}
        >
          {siteChart.map((site) => {
            return (
              <Tab
                eventKey={site.site_id}
                title={site.site_name}
                key={site.site_id}
              >
                <h3>{site.site_name}</h3>
                <LineChart site={site} />
                <BarChart site={site} />
                <HoBarChart site={site} />
              </Tab>
            );
          })}
          {siteChart && <Tab eventKey={1} title="Clean" />}
        </Tabs>
      )}
    </div>
  );
}
