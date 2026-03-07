/**
 * Load and merge GeoJSON for England + Wales
 * Files should be placed in public/geojson/ (see README for download instructions)
 */
import type { FeatureCollection } from 'geojson'

const ENG_LAD_URL = '/geojson/eng/England.geojson'
const WAL_LAD_URL = '/geojson/wal/wales.geojson'

export async function loadEnglandWalesGeoJson(): Promise<FeatureCollection> {
  const [eng, wal] = await Promise.all([
    fetch(ENG_LAD_URL).then((r) => r.json()),
    fetch(WAL_LAD_URL).then((r) => r.json()),
  ])
  return {
    type: 'FeatureCollection',
    features: [...eng.features, ...wal.features],
  }
}
