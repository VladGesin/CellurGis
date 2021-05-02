import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MainMap.css';

export default function MainMap(props) {
  return (
    <MapContainer
      center={[31.996775, 35.279545]}
      zoom={10}
      maxZoom={18}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {props.children}
    </MapContainer>
  );
}
