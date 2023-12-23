import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, divIcon, point } from 'leaflet';
import iconUrl from '../assets/placeholder.png';
import MarkerClusterGroup from 'react-leaflet-cluster';
import axios from 'axios';
import '../styles/Location.css';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Link,
    Box,
    Flex
} from "@chakra-ui/react";
import Navbar from '../components/Navbar';

const Location = () => {
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const res = await axios.get('http://4.227.178.188:3001/data/coords/get');
            const data = res.data;
            const markers = data.map((miner) => {
                return {
                    latitude: miner.latitude,
                    longitude: miner.longitude,
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
    }, []);


    const customIcon = new Icon({
        iconUrl: iconUrl,
        iconSize: [35, 35], // size of the icon
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
        <>

        <Navbar />
            <Flex
                direction="row"
                justifyContent="center"
                alignItems="center"
                height="100vh"
                width="100vw"
                p="2rem"
            >
                <Box flex="1">
                    <MapContainer center={[17.3846, 78.4534]} zoom={12} style={{ height: '900px', width: '900px' }}>
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
                                            <p>Temperature: {marker.temperature.toFixed(2)}°C</p>
                                            <p>Pressure: {marker.pressure.toFixed(2)}Pa</p>
                                            <p>Altitude: {marker.altitude.toFixed(2)}m</p>
                                        </div>
                                    </Popup>
                                </Marker>
                            ))}
                        </MarkerClusterGroup>
                    </MapContainer>
                </Box>

                <Box flex="1"          >
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Email</Th>
                                <Th>Temperature</Th>
                                <Th>Pressure</Th>
                                <Th>Altitude</Th>
                                <Th>Location</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {markers.map((marker, index) => (
                                <Tr key={index}>
                                    <Td>{marker.popUp.split(": ")[1]}</Td>
                                    <Td>{marker.temperature.toFixed(2)}°C</Td>
                                    <Td>{marker.pressure.toFixed(2)}Pa</Td>
                                    <Td>{marker.altitude.toFixed(2)}m</Td>
                                    <Td>
                                        <Link href={`https://www.google.com/maps/search/?api=1&query=${marker.latitude},${marker.longitude}`} isExternal>
                                            {marker.latitude}, {marker.longitude}
                                        </Link>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </Box>
            </Flex>
        </>
    );
}

export default Location;
