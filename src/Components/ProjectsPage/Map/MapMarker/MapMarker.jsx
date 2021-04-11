import React, { useState, useEffect } from 'react';
import { Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import 'leaflet.markercluster/dist/leaflet.markercluster';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';

let DefaultIcon = L.icon({
  iconUrl: icon,
  // shadowUrl: iconShadow,
});
export default function MapMarker({ MapContainer }) {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    getPoints();
  }, []);

  const getPoints = async () => {
    axios
      .get(`http://localhost:5000/apiv2/getmappoints/56059/1/DT14-03-2021`)
      .then((res) => {
        console.log(res.data);
        const points = res.data.map((point, i) => {
          // return (
          // <CanvasMarkersLayer>
          //   <Marker
          //     position={[point.latitude, point.longitude]}
          //     key={'DT14-03-2021' + '56059' + i}
          //   >
          //     <Popup style={{ zIndex: 100 }}>
          //       <ul>
          //         <li>dist from border: {point.dist_from_ref / 1000}Km</li>
          //         <li>dist from site: {point.dist_from_site}Km</li>
          //         <li>RSRP: {point.rsrp}</li>
          //       </ul>
          //     </Popup>
          //   </Marker>
          // </CanvasMarkersLayer>
          // );
        });
        setPoints(points);
        // console.log(points);
      });
  };

  return (
    <div>
      {/* {points.length > 0 && points} */}
      <Marker position={[31.931256, 34.85761]}>
        <Popup style={{ zIndex: 100 }}>
          <ul>
            <li>dist from border: Km</li>
            <li>dist from site: Km</li>
            <li>RSRP:</li>
          </ul>
        </Popup>
      </Marker>
    </div>
  );
}
L.Marker.prototype.options.icon = DefaultIcon;
