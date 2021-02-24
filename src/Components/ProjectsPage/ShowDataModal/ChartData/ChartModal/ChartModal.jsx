import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ChartFactory from './ChartFactory';
import Spinner from 'react-bootstrap/Spinner';
import ChartGraphs from './ChartGraphs';

export default function ChartModal({ btnText, project_id, filename, sites }) {
  const [spinner, setSpinner] = useState(true);
  const [show, setShow] = useState(false);
  const [charts, setCharts] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetchData();

    return () => {
      setCharts([]);
    };
  }, []);

  const fetchData = async () => {
    if (sites.length > 0) {
      await sites.reduce(async (i, site) => {
        const chartClass = new ChartFactory(btnText, project_id, filename);
        chartClass.setSite(site.site_id);
        const dist = await chartClass.getDistance();
        const distLabels = await chartClass.setDistLabels(dist);
        const maxRsrp = await chartClass.getMaxRsrp(dist);
        const minRsrp = await chartClass.getMinRsrp(dist);
        const avgRsrp = await chartClass.getAvgRsrp(dist);
        const countRsrp = await chartClass.getCountRsrp(dist);

        setCharts((prevcharts) => [
          ...prevcharts,
          {
            site_id: site.site_id,
            dist: dist,
            maxRsrp: maxRsrp,
            minRsrp: minRsrp,
            avgRsrp: avgRsrp,
            countRsrp: countRsrp,
            labels: distLabels,
            obj: chartClass,
          },
        ]);
      }, undefined);
      setSpinner(false);
    }
  };

  return (
    <>
      {!spinner && (
        <Button variant="info" onClick={handleShow}>
          {btnText}
        </Button>
      )}

      {spinner && <Spinner animation="border" />}
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{btnText}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs
            defaultActiveKey={sites[0].site_id}
            id="uncontrolled-tab-example"
          >
            {charts.map((siteData) => {
              return (
                <Tab
                  eventKey={siteData.site_id}
                  title={siteData.site_id}
                  key={siteData.site_id}
                >
                  <ChartGraphs siteData={siteData} />
                </Tab>
              );
            })}
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
