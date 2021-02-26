import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import './ShowDataModal.css';
import ChartPage from './ChartData/ChartPage';

export default function ShowDataModal({ openData }) {
  const [show, setShow] = useState({ openData });
  const [project_id, setProject_id] = useState(false);

  const classes = `${show.class}  data-modal hide`;

  useEffect(() => {
    setShow(openData);
    setProject_id(openData.project_id);
  }, [openData, openData.project_id]);

  if (!project_id) return null;
  else if (openData.openCharts) {
    return (
      <div className={classes}>
        <Button
          className="side-btn"
          onClick={() => {
            setShow({ class: 'slide-out' });
            setTimeout(() => {
              setProject_id(false);
            }, 700);
          }}
        >
          Close
        </Button>
        <ChartPage className="w-100" project={project_id} />
      </div>
    );
  } else {
    return null;
  }
}
