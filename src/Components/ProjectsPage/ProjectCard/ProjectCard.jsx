import React from 'react';
import Button from 'react-bootstrap/Button';
import './ProjectCard.css';
import DeleteModal from '../DeleteData/DeleteModal';

export default function ProjectCard(props) {
  return (
    <div className="project_card">
      <h5>
        <strong>Project Name: </strong>
        {props.projectItem.project_name}
      </h5>
      <div>
        <strong>Project ID:</strong>
        {props.projectItem.project_id}
      </div>
      <div>
        <strong>Created On:</strong> {props.projectItem.created_on.slice(0, 10)}{' '}
        {props.projectItem.created_on.slice(11, 19)}
      </div>
      <p id="footer">
        <Button
          size="sm"
          variant="primary"
          className="mr-1"
          onClick={() =>
            props.setData({
              project_id: props.projectItem.project_id,
              class: 'slide-in',
              openCharts: true,
              openMap: false,
            })
          }
        >
          Open Charts
        </Button>
        <Button disabled size="sm" variant="secondary" className="mr-1">
          Open Map
        </Button>

        <DeleteModal
          project_id={props.projectItem.project_id}
          filename={null}
          url={'apiv1/deleteproject'}
          header={'project'}
          refreshList={props.refreshList}
        />
        <Button disabled size="sm" variant="info">
          Share
        </Button>
      </p>
    </div>
  );
}
