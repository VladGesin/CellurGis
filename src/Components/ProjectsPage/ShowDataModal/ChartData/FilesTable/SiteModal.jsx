import React, { useState, useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ChartModal from "../ChartModal/ChartModal";
import MainMap from "../../../Map/MainMap";
import MapDriveTestPoints from "../../../Map/MapMarker/MapDriveTestPoints";
import MapPointsContaxt from "../../../../../Context/mapPoints/mapPointsContaxt";
import "../../../Map/MainMap.css";

export default function SiteModal({ filename, project_id, site }) {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [key, setKey] = useState("Distance_From_Site");
  const mapPointsContaxt = useContext(MapPointsContaxt);

  useEffect(() => {
    const fetchData = async () => {
      await mapPointsContaxt.setMapData(filename, project_id, site.site_id);
    };

    if (show) fetchData();

    return () => {
      mapPointsContaxt.deleteMapData();
    };
    // eslint-disable-next-line
  }, [show]);

  return (
    <>
      <Button
        size="sm"
        variant="info"
        onClick={handleShow}
        className="mr-1 mb-1"
      >
        {site.site_id}
      </Button>

      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{site.site_id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mapContainer">
            <MainMap>
              <MapDriveTestPoints />
            </MainMap>
          </div>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
            <Tab eventKey="Distance_From_Site" title="Distance From Site">
              {show && (
                <ChartModal
                  btnText={"Distance_From_Site"}
                  project_id={project_id}
                  filename={filename}
                  site={site}
                  key={filename + site.site_id}
                />
              )}
            </Tab>
            <Tab eventKey="Distance_From_Border" title="Distance From Border">
              {show && (
                <ChartModal
                  btnText={"Distance_From_Border"}
                  project_id={project_id}
                  filename={filename}
                  site={site}
                  key={filename + site.site_id}
                />
              )}
            </Tab>
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
