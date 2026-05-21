/**
 * Map admin territory IDs (often human-readable names) to GeoJSON LAD keys.
 * GeoJSON uses 2013 LAD boundaries; some admin territories use 2021 unitary names
 * or custom sub-areas that do not match polygon names.
 *
 * Keys: territory id as stored in Supabase `locations.territory`
 * Values: normalized LAD names (see ladToCounty.ts)
 */
export const TERRITORY_TO_LADS: Record<string, string[]> = {
  // 2021 unitary authorities → 2013 districts in England.geojson
  'West Northamptonshire': ['daventry', 'northampton', 'south northamptonshire'],
  'North Northamptonshire': [
    'corby',
    'east northamptonshire',
    'kettering',
    'wellingborough',
  ],
  // Legacy numeric id still used in static data
  '90-92': [
    'corby',
    'daventry',
    'east northamptonshire',
    'kettering',
    'northampton',
    'south northamptonshire',
    'wellingborough',
  ],
}
