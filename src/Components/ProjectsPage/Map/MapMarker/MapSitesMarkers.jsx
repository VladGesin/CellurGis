import React, { useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import axios from "axios";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { MdSettingsInputAntenna } from "react-icons/md";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css"; // sass
import "react-leaflet-markercluster/dist/styles.min.css"; // sass

export default function MapSitesMarkers() {
  const [siteMarkers, setSiteMarkers] = useState([]);

  useEffect(() => {
    getMarkers();
    // eslint-disable-next-line
  }, []);

  const iconHTML = ReactDOMServer.renderToString(
    <MdSettingsInputAntenna size={20} color="black" fill="orange" />
  );
  const customMarkerIcon = new L.DivIcon({
    html: iconHTML,
  });

  const getMarkers = async () => {
    axios.get("http://localhost:5000/apiv2/sites/map").then((res) => {
      // console.log(res.data);
      const markers = res.data.map((site) => {
        return (
          <Marker
            position={[site.latitude, site.longitude]}
            icon={customMarkerIcon}
            key={site.site_name}
          >
            <Popup>{site.site_name}</Popup>
          </Marker>
        );
      });
      setSiteMarkers(markers);
    });
  };

  return (
    <div>
      <MarkerClusterGroup>{siteMarkers}</MarkerClusterGroup>
    </div>
  );
}
