import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MainMap.css";

export default function MainMap(props) {
  return (
    <MapContainer
      center={[31.931256, 34.85761]}
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
