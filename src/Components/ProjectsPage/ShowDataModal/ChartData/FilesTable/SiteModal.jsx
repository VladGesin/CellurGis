import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ChartModal from '../ChartModal/ChartModal';
import MainMap from '../../../Map/MainMap';

export default function SiteModal({ filename, project_id, site }) {
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  const [key, setKey] = useState('Distance_From_Site');
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
          <MainMap />
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
          >
            <Tab eventKey="Distance_From_Site" title="Distance From Site">
              <ChartModal
                btnText={'Distance_From_Site'}
                project_id={project_id}
                filename={filename}
                site={site}
                key={filename + site.site_id}
              />
            </Tab>
            <Tab eventKey="Distance_From_Border" title="Distance From Border">
              <ChartModal
                btnText={'Distance_From_Border'}
                project_id={project_id}
                filename={filename}
                site={site}
                key={filename + site.site_id}
              />
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
