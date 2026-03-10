/**
 * Main Leaflet map container
 * Centers on England/Wales, loads GeoJSON layer
 */
import { useEffect } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const DEFAULT_CENTER: [number, number] = [52.5, -1.5]
const DEFAULT_ZOOM = 6

function ZoomControlPosition() {
  const map = useMap()
  useEffect(() => {
    map.zoomControl?.setPosition('bottomleft')
  }, [map])
  return null
}

export function Map({ children }: { children?: React.ReactNode }) {
  return (
    <MapContainer
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      className="h-full w-full min-h-[300px]"
      scrollWheelZoom
      style={{ touchAction: 'manipulation' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControlPosition />
      {children}
    </MapContainer>
  )
}
