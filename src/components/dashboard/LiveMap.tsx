"use client";

import { useMemo } from 'react';
import { MapContainer, TileLayer, Polygon, CircleMarker, Popup, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // We will need to import this globally or here if it works

// Fix Leaflet Default Icon issue in Next.js
const iconUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png";
const iconRetinaUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png";
const shadowUrl = "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png";

const customIcon = new L.Icon({
    iconUrl: iconUrl,
    iconRetinaUrl: iconRetinaUrl,
    shadowUrl: shadowUrl,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Mock Zones (Simple polygons around a central point)
const CENTRAL_DELHI_COORDS: [number, number] = [28.6139, 77.2090];

const ZONES = [
    {
        name: "Central Hub",
        color: "#3b82f6", // Blue
        positions: [
            [28.6200, 77.2000], [28.6200, 77.2200], [28.6050, 77.2200], [28.6050, 77.2000]
        ] as [number, number][]
    },
    {
        name: "North Zone",
        color: "#10b981", // Emerald
        positions: [
            [28.6350, 77.2000], [28.6350, 77.2300], [28.6220, 77.2300], [28.6220, 77.2000]
        ] as [number, number][]
    },
    {
        name: "Privacy Masked Zone",
        color: "#64748b", // Slate (Grayed out)
        fillOpacity: 0.6,
        positions: [
            [28.6000, 77.1800], [28.6100, 77.1950], [28.5900, 77.2050], [28.5850, 77.1900]
        ] as [number, number][]
    }
];

export function LiveMap() {

    return (
        <div className="relative h-full w-full bg-slate-950 overflow-hidden rounded border border-slate-800">
            <MapContainer
                center={CENTRAL_DELHI_COORDS}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%", background: '#020617' }}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />

                {ZONES.map((zone, idx) => (
                    <Polygon
                        key={zone.name}
                        positions={zone.positions}
                        pathOptions={{
                            color: zone.color,
                            fillColor: zone.color,
                            fillOpacity: zone.fillOpacity || 0.1,
                            weight: 2
                        }}
                    >
                        <Popup className="custom-popup">
                            <div className="text-xs font-bold uppercase">{zone.name}</div>
                        </Popup>
                    </Polygon>
                ))}

                {/* Mock Incidents */}
                <CircleMarker center={[28.6150, 77.2050]} radius={8} pathOptions={{ color: '#ef4444', fillColor: '#ef4444', fillOpacity: 0.8 }}>
                    <Popup>
                        <div className="p-1">
                            <div className="text-xs font-bold text-red-600 uppercase">Fire Alert</div>
                            <div className="text-[10px] text-slate-500">District A</div>
                        </div>
                    </Popup>
                </CircleMarker>

                <CircleMarker center={[28.6250, 77.2150]} radius={6} pathOptions={{ color: '#f59e0b', fillColor: '#f59e0b', fillOpacity: 0.8 }}>
                </CircleMarker>

            </MapContainer>

            {/* Map Overlays UI */}
            <div className="absolute top-4 left-4 z-[400] flex flex-col gap-2">
                <div className="flex flex-col bg-slate-900/90 backdrop-blur border border-slate-700 rounded-md overflow-hidden">
                    <button className="p-2 hover:bg-slate-800 text-slate-300 border-b border-slate-800">+</button>
                    <button className="p-2 hover:bg-slate-800 text-slate-300">-</button>
                </div>
            </div>

            <div className="absolute top-4 right-4 z-[400] flex items-center gap-2">
                <div className="bg-slate-900/90 backdrop-blur border border-slate-700 rounded-md px-3 py-1.5 flex items-center gap-2 text-xs">
                    <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                    <span className="text-slate-300">Volunteers</span>
                    <span className="text-emerald-500 font-bold ml-1">• Available</span>
                    <span className="text-orange-500 font-bold ml-1">• En Route</span>
                </div>
            </div>

        </div>
    );
}
