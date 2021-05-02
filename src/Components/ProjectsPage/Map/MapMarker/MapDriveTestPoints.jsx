import { useEffect, useContext } from "react";
import { useMap } from "react-leaflet";
import "leaflet-canvas-marker";
import L from "leaflet";
import MapPointsContaxt from "../../../../Context/mapPoints/mapPointsContaxt";
import GreenDot from "./MarkerPng/green.png";
import RedDot from "./MarkerPng/red.png";

export default function MapDriveTestPoints() {
  const map = useMap();
  const mapPointsContaxt = useContext(MapPointsContaxt);

  useEffect(() => {
    if (!map) return;
    if (mapPointsContaxt.markers.length === 0) return;
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
    mapPointsContaxt.markers.map((point, i) => {
      markers.push(
        L.marker([point.latitude, point.longitude], {
          icon: point.rsrp >= mapPointsContaxt.rsrpRef ? iconRed : iconGreen,
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
  }, [map, mapPointsContaxt.markers, mapPointsContaxt.rsrpRef]);

  return null;
}
