import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-canvas-marker";
import L from "leaflet";
import GreenDot from "./MarkerPng/green.png";
import RedDot from "./MarkerPng/red.png";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const MapDriveTestPoints = ({ mapDriveTestPoints }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    if (mapDriveTestPoints.markers.length === 0) return;
    var ciLayer = L.canvasIconLayer({}).addTo(map);

    // ciLayer.addOnClickListener(function (e, data) {
    //   console.log(data);
    // });
    // ciLayer.addOnHoverListener(function (e, data) {
    //   console.log(data[0].data._leaflet_id);
    // });

    const iconGreen = L.icon({
      iconUrl: GreenDot,
      iconSize: [20, 18],
      iconAnchor: [10, 9],
    });
    const iconRed = L.icon({
      iconUrl: RedDot,
      iconSize: [20, 18],
      iconAnchor: [10, 9],
    });

    let markers = [];
    // eslint-disable-next-line
    mapDriveTestPoints.markers.map((point, i) => {
      markers.push(
        L.marker([point.latitude, point.longitude], {
          icon: point.rsrp >= mapDriveTestPoints.rsrpRef ? iconRed : iconGreen,
        }).bindPopup(
          `<ul>
                <li>dist from border: ${point.dist_from_ref / 1000} Km</li>
                <li>dist from site: ${point.dist_from_site} Km</li>
                <li>RSRP: ${point.rsrp} </li>
              </ul>`
        )
      );
    });

    if (markers.length > 0) ciLayer.addLayers(markers);
    map.setView(markers[0]._latlng, 13);
    // eslint-disable-next-line
  }, [map, mapDriveTestPoints.markers, mapDriveTestPoints.rsrpRef]);

  return null;
};

MapDriveTestPoints.propTypes = {
  mapDriveTestPoints: PropTypes.object.isRequired,
};

const dtPointsToProps = (state) => ({
  mapDriveTestPoints: state.mapDriveTestPoints,
});

export default connect(dtPointsToProps)(MapDriveTestPoints);
