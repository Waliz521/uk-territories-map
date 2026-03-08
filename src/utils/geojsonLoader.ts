/**
 * Load and merge GeoJSON for England + Wales.
 * Bundled at build time (no runtime fetch) for reliable WordPress deployment.
 */
import type { FeatureCollection } from 'geojson'
import engGeoJson from '../data/england.json'
import walGeoJson from '../data/wales.json'

export async function loadEnglandWalesGeoJson(): Promise<FeatureCollection> {
  const eng = engGeoJson as FeatureCollection
  const wal = walGeoJson as FeatureCollection
  return {
    type: 'FeatureCollection',
    features: [...eng.features, ...wal.features],
  }
}
