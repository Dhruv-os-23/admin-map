import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, divIcon, point } from 'leaflet';
import iconUrl from './assets/placeholder.png';
import './App.css';
import MarkerClusterGroup from 'react-leaflet-cluster';

function App() {
  const markers = [
    { geocode: [17.33, 78.33], popUp: 'Hello, I am miner 1', quality: 75 },
    { geocode: [17.28, 78.28], popUp: 'Hello, I am miner 2', quality: 45 },
    { geocode: [17.333, 78.301], popUp: 'Hello, I am miner 3', quality: 90 },
    { geocode: [17.35, 78.31], popUp: 'Hello, I am miner 4', quality: 60 },
    { geocode: [17.32, 78.29], popUp: 'Hello, I am miner 5', quality: 30 },
    { geocode: [17.34, 78.32], popUp: 'Hello, I am miner 6', quality: 80 },
    { geocode: [17.29, 78.30], popUp: 'Hello, I am miner 7', quality: 40 },
    { geocode: [17.31, 78.34], popUp: 'Hello, I am miner 8', quality: 65 },
    { geocode: [17.30, 78.27], popUp: 'Hello, I am miner 9', quality: 50 },
    { geocode: [17.36, 78.29], popUp: 'Hello, I am miner 10', quality: 85 },
  ];

  const customIcon = new Icon({
    iconUrl: iconUrl,
    iconSize: [38, 38], // size of the icon
  });

  const createClusterCustomIcon = function (cluster) {
    return new divIcon({
      html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
      className: 'custom-marker-cluster',
      iconSize: point(33, 33, true),
    });
  };

  const limitedMarkers = markers.slice(0, 10); // Limit to the first 10 markers

  return (
    <>
      <MapContainer center={[17.321, 78.328]} zoom={13} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://tile.openstreetmap.de/{z}/{x}/{y}.png'
        />

        <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterCustomIcon}>
          {limitedMarkers.map((marker, index) => (
            <Marker
              key={index}
              position={marker.geocode}
              icon={customIcon}
              eventHandlers={{
                mouseover: () => {
                  marker.markerRef.openPopup();
                },
                mouseout: () => {
                  marker.markerRef.closePopup();
                },
              }}
              ref={(markerRef) => (marker.markerRef = markerRef)}
            >
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </>
  );
}

export default App;
