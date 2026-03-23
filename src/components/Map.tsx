/**
 * Main Leaflet map container
 * Centers on England/Wales, loads GeoJSON layer
 */
import { useEffect } from 'react'
import { MapContainer, TileLayer, useMap } from 'react-leaflet'

const DEFAULT_CENTER: [number, number] = [52.5, -1.5]
const DEFAULT_ZOOM = 6

function ZoomControlPosition() {
  const map = useMap()
  useEffect(() => {
    map.zoomControl?.setPosition('bottomleft')
  }, [map])
  return null
}

/** Recompute map size when the container changes (flex parent, info bar open/close). */
function MapSizeSync() {
  const map = useMap()
  useEffect(() => {
    const el = map.getContainer()
    const sync = () => {
      map.invalidateSize({ animate: false })
    }
    const ro = new ResizeObserver(() => {
      requestAnimationFrame(sync)
    })
    ro.observe(el)
    sync()
    requestAnimationFrame(sync)
    window.addEventListener('resize', sync)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', sync)
    }
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
      <MapSizeSync />
      {children}
    </MapContainer>
  )
}
