import React, { useState, useEffect } from "react";
import LineChart from "./ChartFiles/LineChart";
import BarChart from "./ChartFiles/BarChart";
import HoBarChart from "./ChartFiles/HoBarChart";
import Form from "react-bootstrap/Form";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateRefRsrp } from "../../../../../Redux/actions/mapDriveTestPoints";

const ChartGraphs = ({ mapDriveTestPoints, siteData, updateRefRsrp }) => {
  const [rsrpRef, setRsrpRef] = useState(-92);
  const [greaterCount, setGreaterCount] = useState([]);

  useEffect(() => {
    getGreaterCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getGreaterCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rsrpRef]);

  const getGreaterCount = async () => {
    const newGreather = await siteData.obj.getCountGreaterRsrp(
      rsrpRef,
      siteData.dist
    );
    setGreaterCount(newGreather);
  };

  if (siteData.labels.length === 1 && siteData.labels[0] === 0) {
    return (
      <h3 className="d-flex align-items-center">
        No Data about site {siteData.site_id} , Check if {siteData.site_id} id
        in database
      </h3>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between mt-2 ">
        {/* <h3 className="d-flex align-items-center">{siteData.site_id}</h3> */}
        <div className="d-flex align-items-center">
          <Form.Label column="sm">Signal strength</Form.Label>
          <Form.Control
            className="w-10"
            size="sm"
            type="text"
            placeholder={rsrpRef}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                if (e.target.value < 0) {
                  setRsrpRef(e.target.value);
                  updateRefRsrp(e.target.value);
                }
              }
            }}
          />
        </div>
      </div>
      <LineChart site={siteData} />
      <BarChart site={siteData} rsrpRef={rsrpRef} greaterCount={greaterCount} />
      <HoBarChart
        greaterCount={greaterCount}
        countRsrp={siteData.countRsrp}
        rsrpRef={rsrpRef}
      />
    </>
  );
};

ChartGraphs.propTypes = {
  mapDriveTestPoints: PropTypes.object.isRequired,
  updateRefRsrp: PropTypes.func.isRequired,
};

const dtPointsToProps = (state) => ({
  mapDriveTestPoints: state.mapDriveTestPoints,
});

export default connect(dtPointsToProps, { updateRefRsrp })(ChartGraphs);
