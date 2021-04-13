import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MainMap.css';
import MapMarker from './MapMarker/MapMarker';

export default function MainMap() {
  return (
    <div className="d-block h-70 mapContainer">
      <MapContainer
        center={[31.931256, 34.85761]}
        zoom={8}
        maxZoom={18}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapMarker MapContainer={MapContainer} />
      </MapContainer>
    </div>
  );
}
