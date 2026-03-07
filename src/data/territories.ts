/**
 * Territory data - parsed from Excel (BCL_MapDash Data 2.0 -Territorised.xlsx)
 * Run: node scripts/parse-excel-simple.js to regenerate territoriesParsed.json
 */
import type { AreaRecord, TerritoryGroup, TerritoryStatus } from '../types'
import territoriesData from './territoriesParsed.json'
import { LAD_TO_COUNTY } from './ladToCounty'

/** Raw area records from Excel */
export const AREA_RECORDS: AreaRecord[] = territoriesData as AreaRecord[]

/**
 * Test status overrides - change some territories for filter/legend testing.
 * Remove or empty this for production.
 */
export const TEST_STATUS_OVERRIDES: Record<string, TerritoryStatus> = {
  '1': 'sold',
  '2': 'reserved',
  '3': 'under_offer',
  '4': 'unavailable',
  '5': 'reserved',
}

/**
 * Build territory groups from area records
 * Groups areas by territory ID; ranges like "77-79" become one group
 */
export function buildTerritoryGroups(
  records: AreaRecord[],
  statusMap: Record<string, TerritoryStatus> = {}
): TerritoryGroup[] {
  const byTerritory = new Map<string, AreaRecord[]>()
  for (const r of records) {
    const key = r.territory || `ungrouped-${r.name}`
    if (!byTerritory.has(key)) byTerritory.set(key, [])
    byTerritory.get(key)!.push(r)
  }
  return Array.from(byTerritory.entries()).map(([id, areas]) => ({
    id,
    areas,
    totalPopulation: areas.reduce((s, a) => s + a.population, 0),
    status: statusMap[id] ?? 'available',
  }))
}

/** Normalize name for matching (lowercase, no parentheticals) */
function normalizeName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/\([^)]*\)/g, '')
    .trim()
}

/** Sorted list of territory IDs for filter dropdown (excludes ungrouped) */
export function getTerritoryFilterOptions(): { id: string; label: string }[] {
  const ids = new Set<string>()
  for (const r of AREA_RECORDS) {
    if (r.territory) ids.add(r.territory)
  }
  return Array.from(ids)
    .sort((a, b) => {
      const numA = parseInt(a, 10)
      const numB = parseInt(b, 10)
      if (!Number.isNaN(numA) && !Number.isNaN(numB)) return numA - numB
      return a.localeCompare(b)
    })
    .map((id) => ({ id, label: `Territory ${id}` }))
}

/** Map: normalized area name -> TerritoryGroup (for lookup when user clicks) */
export function buildAreaToTerritoryMap(
  groups: TerritoryGroup[]
): Map<string, TerritoryGroup> {
  const map = new Map<string, TerritoryGroup>()

  // 1. Direct area -> territory (boroughs, unitary LADs that match Excel names)
  for (const group of groups) {
    for (const area of group.areas) {
      const key = normalizeName(area.name)
      map.set(key, group)
    }
  }

  // 2. County-level expansion: Excel has county names (e.g. Surrey, Derbyshire)
  //    but GeoJSON has LAD names (e.g. Elmbridge, Amber Valley). Map each LAD
  //    to the territory of its parent county.
  const countyToGroup = new Map<string, TerritoryGroup>()
  for (const group of groups) {
    for (const area of group.areas) {
      if (area.type === 'County' && area.territory) {
        const countyKey = normalizeName(area.name)
        countyToGroup.set(countyKey, group)
      }
    }
  }

  for (const [ladKey, countyName] of Object.entries(LAD_TO_COUNTY)) {
    const group = countyToGroup.get(countyName)
    if (group && !map.has(ladKey)) {
      map.set(ladKey, group)
    }
  }

  return map
}
