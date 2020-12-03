import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import './Mapping.css'
import '../../leaflet/leaflet.css'

const Mappage= () =>{
  
    return (
      <div>
        <h1>מפת כיסוי סלולר צבאי</h1>
        
        <div className="leaflet-appearance">
        <MapContainer center={[59.95, 30.33]} zoom={11} style={{ height: "80vh" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[59.95, 30.33]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
        </div>

</div>
      
    )
  }


export default Mappage
