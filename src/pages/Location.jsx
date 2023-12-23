import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, divIcon, point } from 'leaflet';
import iconUrl from '../assets/placeholder.png';
import MarkerClusterGroup from 'react-leaflet-cluster';
import axios from 'axios';
import '../styles/Location.css'


const Location = () => {

    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('http://localhost:8000/data/coords/get');
            const data = res.data;
            const markers = data.map((miner) => {
                return {
                    geocode: [miner.latitude, miner.longitude],
                    popUp: `Miner: ${miner.email}`,
                    temperature: miner.temperature,
                    pressure: miner.pressure,
                    altitude: miner.altitude,
                }
            })
            setMarkers(markers);
            console.log(markers);
        }
        getData();
    }, [])


    const customIcon = new Icon({
        iconUrl: iconUrl,
        iconSize: [24, 24], // size of the icon
    });

    const createClusterCustomIcon = function (cluster) {
        return new divIcon({
            html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
            className: 'custom-marker-cluster',
            iconSize: point(33, 33, true),
        });
    };

    const limitedMarkers = markers.slice(0, 10);

    return (
        <div>
      
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
                            <Popup>
                                <div>
                                    <h3>{marker.popUp}</h3>
                                    <p>Temperature: {marker.temperature}°C</p>
                                    <p>Pressure: {marker.pressure}Pa</p>
                                    <p>Altitude: {marker.altitude}m</p>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MarkerClusterGroup>
            </MapContainer>
            </div>
        
    );
}

export default Location;
