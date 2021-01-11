import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../leaflet/leaflet.css';

class Mappage extends Component {
	state = {
		name: '',
		long: '',
		lat: ''
	};

	componentDidMount() {
		var map = (this.map = L.map(ReactDOM.findDOMNode(this), {
			minZoom: 8,
			maxZoom: 13,
			layers: [
				L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution:
						'&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
				})
			],
			attributionControl: true
		}));

		map.on('click', this.onMapClick);
		map.fitWorld();
		map.on('mousemove', this.onMousemove);
		this.onLoadMap(map);
	}

	onLoadMap = (map) => {
		var latLon = L.latLng(31.674421266955243, 34.9713546037674);
		var bounds = latLon.toBounds(1000000); // 500 = metres
		map.panTo(latLon).fitBounds(bounds);
	};

	onMousemove = (ev) => {
		// var lat, lng;
		// lat = ev.latlng.lat;
		// lng = ev.latlng.lng;
	};

	onMapClick = () => {
		// Do some wonderful map things...
	};

	render() {
		return <div className="map" id="container map leaflet-container " />;
	}
}

export default Mappage;
