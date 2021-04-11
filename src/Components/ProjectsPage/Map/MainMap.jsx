import React, { useState } from 'react';
import L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './MainMap.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import MapMarker from './MapMarker/MapMarker';
import CanvasMarkersLayer from '../../../../node_modules/leaflet-canvas-marker/src/plugin/leaflet.canvas-markers';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

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
