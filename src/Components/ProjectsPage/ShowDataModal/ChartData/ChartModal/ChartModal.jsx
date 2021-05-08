import React, { useState, useEffect } from "react";
import ChartFactory from "./ChartFactory";
import Spinner from "react-bootstrap/Spinner";
import ChartGraphs from "./ChartGraphs";

export default function ChartModal({ btnText, project_id, filename, site }) {
  const [spinner, setSpinner] = useState(true);
  const [charts, setCharts] = useState({
    site_id: "",
    dist: [],
    maxRsrp: [],
    minRsrp: [],
    avgRsrp: [],
    countRsrp: "",
    labels: [],
    obj: null,
  });

  useEffect(() => {
    fetchData();

    return () => {
      setCharts([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async () => {
    const chartClass = new ChartFactory(
      btnText,
      project_id,
      filename,
      site.site_id
    );
    // chartClass.setSite(site.site_id);
    // console.log(chartClass);
    const dist = await chartClass.getDistance();
    const distLabels = await chartClass.setDistLabels(dist);
    const maxRsrp = await chartClass.getMaxRsrp(dist);
    const minRsrp = await chartClass.getMinRsrp(dist);
    const avgRsrp = await chartClass.getAvgRsrp(dist);
    const countRsrp = await chartClass.getCountRsrp(dist);

    setCharts({
      site_id: site.site_id,
      dist: dist,
      maxRsrp: maxRsrp,
      minRsrp: minRsrp,
      avgRsrp: avgRsrp,
      countRsrp: countRsrp,
      labels: distLabels,
      obj: chartClass,
    });

    setSpinner(false);
    // }
  };

  if (spinner)
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" />
      </div>
    );

  return <div>{charts.obj && <ChartGraphs siteData={charts} />}</div>;
}
