"use client"

import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const defaultIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    iconSize: [25, 41],  // Size of the marker
    iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
    popupAnchor: [1, -34], // Popup anchor
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    shadowSize: [41, 41] // Size of the shadow
  });

function PropertyMap({properties}) {

    const [mapReady, setMapReady] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setMapReady(true); // Only initialize the map in the browser environment
        }
    }, []);

    if (!mapReady) return null;

  return (
    <div className="mb-8">
        <MapContainer 
            center={[43.7, -79.42]} // Default center for Toronto, adjust this dynamically as needed
            zoom={12}
            style={{ height: "500px", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {properties.map((property) => (
                property.location?.latitude && property.location?.longitude ? (
                    <Marker 
                        key={property._id}
                        position={[property.location.latitude, property.location.longitude]}
                        icon={defaultIcon}
                    >
                        <Popup>
                            <h3>{property.name}</h3>
                            <p>{property.city}</p>
                            <p>{property.price}</p>
                        </Popup>
                    </Marker>
                ) : null
            ))}
        </MapContainer>
    </div>
  )
}

export default PropertyMap