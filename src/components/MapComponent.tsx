/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

interface Location {
  id: number
  name: string
  address: string
  phone: string
  email: string
  lat: number
  lng: number
  hours: Record<string, string>
  features: string[]
  manager: string
  image: string
}

interface MapComponentProps {
  locations: Location[]
  onMarkerClick: (locationId: number) => void
  activeLocationId?: number
}

const MapComponent = ({ locations, onMarkerClick, activeLocationId }: MapComponentProps) => {
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    })
  }, [])

  const createCustomIcon = (isActive: boolean) => {
    return L.divIcon({
      html: `
        <div style="
          background-color: ${isActive ? "#f59e0b" : "#64748b"};
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 3px solid white;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </div>
      `,
      className: "custom-div-icon",
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    })
  }

  // Center map on NYC area
  const center: [number, number] = [40.7589, -73.9851]

  return (
    <div className="w-full h-96 rounded-xl overflow-hidden shadow-xl">
      <MapContainer center={center} zoom={12} style={{ height: "100%", width: "100%", zIndex: "0" }} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            icon={createCustomIcon(activeLocationId === location.id)}
            eventHandlers={{
              click: () => onMarkerClick(location.id),
            }}
          >
            <Popup>
              <div className="text-center">
                <h3 className="font-bold text-slate-900 mb-1">{location.name}</h3>
                <p className="text-sm text-slate-600 mb-2">{location.address}</p>
                <p className="text-sm text-slate-700">Manager: {location.manager}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default MapComponent
