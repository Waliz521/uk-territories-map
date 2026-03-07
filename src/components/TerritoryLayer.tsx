/**
 * GeoJSON layer - loads England & Wales boundaries and renders on map
 */
import { useEffect, useMemo, useState } from 'react'
import { GeoJSON, useMap } from 'react-leaflet'
import type { Feature, FeatureCollection } from 'geojson'
import type { PathOptions } from 'leaflet'
import { loadEnglandWalesGeoJson } from '../utils/geojsonLoader'
import { STATUS_COLORS } from '../data/statusColors'
import { useMapContext } from '../context/MapContext'
import {
  buildAreaToTerritoryMap,
  buildTerritoryGroups,
  AREA_RECORDS,
  TEST_STATUS_OVERRIDES,
} from '../data/territories'
import type { AreaRecord, TerritoryGroup } from '../types'
import { bbox } from '@turf/turf'

const BASE_STYLE = { weight: 1, fillOpacity: 0.5 }

const HOVER_STYLE: PathOptions = {
  weight: 2,
  fillOpacity: 0.7,
}

function styleForStatus(status: keyof typeof STATUS_COLORS): PathOptions {
  const color = STATUS_COLORS[status]
  return {
    ...BASE_STYLE,
    color,
    fillColor: color,
  }
}

function normalizeName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/\([^)]*\)/g, '')
    .trim()
}

function getTerritoryForFeature(
  feature: Feature,
  areaToTerritory: Map<string, TerritoryGroup>
): TerritoryGroup {
  const geoName = (feature.properties?.LAD13NM ?? feature.properties?.name ?? 'Unknown') as string
  const code = (feature.properties?.LAD13CD ?? '') as string
  const region = code.startsWith('W') ? 'Wales' : 'England'

  const territory = areaToTerritory.get(normalizeName(geoName))
  if (territory) return territory

  const area: AreaRecord = {
    name: geoName,
    type: 'Borough',
    region,
    population: 0,
    territory: '',
  }
  return {
    id: geoName,
    areas: [area],
    totalPopulation: 0,
    status: 'available',
  }
}

export function TerritoryLayer() {
  const [geojson, setGeojson] = useState<FeatureCollection | null>(null)
  const [error, setError] = useState<string | null>(null)
  const { selectTerritory, openModal, filters } = useMapContext()

  const areaToTerritory = useMemo(() => {
    const groups = buildTerritoryGroups(AREA_RECORDS, TEST_STATUS_OVERRIDES)
    return buildAreaToTerritoryMap(groups)
  }, [])

  const filteredGeojson = useMemo(() => {
    if (!geojson) return null
    const { territoryId, status } = filters
    if (!territoryId && !status) return geojson

    const filtered = geojson.features.filter((feature) => {
      const geoName = (feature.properties?.LAD13NM ?? feature.properties?.name ?? '') as string
      const normName = normalizeName(geoName)
      const territory = areaToTerritory.get(normName)
      if (!territory) return !territoryId && !status
      if (territoryId && territory.id !== territoryId) return false
      if (status && territory.status !== status) return false
      return true
    })

    return { ...geojson, features: filtered }
  }, [geojson, filters, areaToTerritory])

  useEffect(() => {
    loadEnglandWalesGeoJson()
      .then(setGeojson)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load GeoJSON'))
  }, [])

  if (error) {
    return (
      <div className="absolute left-4 top-20 z-[1000] rounded bg-red-100 px-3 py-2 text-sm text-red-800">
        {error}
      </div>
    )
  }

  if (!filteredGeojson) return null

  return (
    <>
      <FitToFiltered data={filteredGeojson} filters={filters} />
      <TerritoryGeoJson
        filteredGeojson={filteredGeojson}
        filters={filters}
        areaToTerritory={areaToTerritory}
        selectTerritory={selectTerritory}
        openModal={openModal}
        styleForStatus={styleForStatus}
      />
    </>
  )
}

function FitToFiltered({
  data,
  filters,
}: {
  data: FeatureCollection
  filters: { territoryId: string; status: string }
}) {
  const map = useMap()
  useEffect(() => {
    if (data.features.length === 0) return
    if (!filters.territoryId && !filters.status) return
    try {
      const [minX, minY, maxX, maxY] = bbox(data)
      map.fitBounds(
        [
          [minY, minX],
          [maxY, maxX],
        ],
        { maxZoom: 10, animate: true }
      )
    } catch {
      // ignore bbox errors
    }
  }, [map, data, filters.territoryId, filters.status])
  return null
}

function TerritoryGeoJson({
  filteredGeojson,
  filters,
  areaToTerritory,
  selectTerritory,
  openModal,
  styleForStatus,
}: {
  filteredGeojson: FeatureCollection
  filters: { territoryId: string; status: string }
  areaToTerritory: Map<string, TerritoryGroup>
  selectTerritory: (t: TerritoryGroup | null) => void
  openModal: () => void
  styleForStatus: (s: keyof typeof STATUS_COLORS) => PathOptions
}) {
  const styleFn = (feature: Feature) => {
    const territory = areaToTerritory.get(
      normalizeName((feature.properties?.LAD13NM ?? feature.properties?.name ?? '') as string)
    )
    const status = territory?.status ?? 'available'
    return styleForStatus(status)
  }

  return (
    <GeoJSON
      key={`${filters.territoryId}-${filters.status}`}
      data={filteredGeojson}
      style={styleFn}
      onEachFeature={(feature, layer) => {
        const name = feature.properties?.LAD13NM ?? feature.properties?.name ?? 'Unknown'
        layer.bindTooltip(name, {
          permanent: false,
          direction: 'top',
          className: 'territory-tooltip',
          interactive: false, // Prevents tooltip from staying open when moving to another area
        })
        layer.on({
          click: () => {
            selectTerritory(getTerritoryForFeature(feature, areaToTerritory))
            openModal()
          },
          mouseover: (e) => {
            const target = e.target
            target.setStyle(HOVER_STYLE)
            target.bringToFront()
          },
          mouseout: (e) => {
            const baseStyle = styleFn(feature)
            e.target.setStyle(baseStyle)
          },
        })
      }}
    />
  )
}
