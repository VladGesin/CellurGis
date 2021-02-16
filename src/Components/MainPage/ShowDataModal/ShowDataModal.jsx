import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './ShowDataModal.css';
import ChartData from './ChartData/ChartPage';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ShowDataModal({ openData }) {
  const [show, setShow] = useState({ openData });
  const classes = `${show.class}  data-modal hide`;
  const { project_id } = openData;
  useEffect(() => {
    setShow(openData);
  }, [openData]);

  if (openData.openCharts) {
    return (
      <div className={classes}>
        <Button
          className="side-btn"
          onClick={() => setShow({ class: 'slide-out' })}
        >
          {' '}
          Close{' '}
        </Button>
        <ChartData className="w-100" project={project_id} />
      </div>
    );
  } else {
    return null;
  }
}
