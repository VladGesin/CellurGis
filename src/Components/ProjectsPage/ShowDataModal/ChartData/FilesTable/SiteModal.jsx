import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ChartModal from "../ChartModal/ChartModal";
import MainMap from "../../../Map/MainMap";
import MapDriveTestPoints from "../../../Map/MapMarker/MapDriveTestPoints";
import "../../../Map/MainMap.css";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  setMapData,
  deleteMapData,
} from "../../../../../Redux/actions/mapDriveTestPoints";

const SiteModal = ({
  mapDriveTestPoints,
  filename,
  project_id,
  site,
  setMapData,
  deleteMapData,
}) => {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [key, setKey] = useState("Distance_From_Site");

  useEffect(() => {
    const fetchData = async () => {
      await setMapData(filename, project_id, site.site_id);
    };
    if (show) fetchData();
    return () => {
      deleteMapData();
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
};

SiteModal.propTypes = {
  mapDriveTestPoints: PropTypes.object.isRequired,
  setMapData: PropTypes.func.isRequired,
  deleteMapData: PropTypes.func.isRequired,
};

const dtPointsToProps = (state) => ({
  mapDriveTestPoints: state.mapDriveTestPoints,
});

export default connect(dtPointsToProps, { setMapData, deleteMapData })(
  SiteModal
);
