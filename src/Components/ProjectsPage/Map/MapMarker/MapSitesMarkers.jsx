import React, { useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import { MdSettingsInputAntenna } from "react-icons/md";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css"; // sass
import "react-leaflet-markercluster/dist/styles.min.css"; // sass
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getSitesArr } from "../../../../Redux/actions/siteArrActions";

const MapSitesMarkers = ({ sitesArr: { sites, loading }, getSitesArr }) => {
  useEffect(() => {
    getSitesArr();
    // eslint-disable-next-line
  }, []);

  const iconHTML = ReactDOMServer.renderToString(
    <MdSettingsInputAntenna size={20} color="black" fill="orange" />
  );
  const customMarkerIcon = new L.DivIcon({
    html: iconHTML,
  });

  return (
    <div>
      <MarkerClusterGroup>
        {sites.length > 0 &&
          sites.map((site) => {
            return (
              <Marker
                position={[site.latitude, site.longitude]}
                icon={customMarkerIcon}
                key={site.site_name}
              >
                <Popup>{site.site_name}</Popup>
                <Tooltip
                  direction="bottom"
                  offset={[5, 15]}
                  opacity={0.8}
                  permanent
                >
                  {site.site_name}
                </Tooltip>
              </Marker>
            );
          })}
      </MarkerClusterGroup>
    </div>
  );
};

MapSitesMarkers.propTypes = {
  sitesArr: PropTypes.object.isRequired,
};

const siteArrToProps = (state) => ({
  sitesArr: state.sitesArr,
});

export default connect(siteArrToProps, { getSitesArr })(MapSitesMarkers);
