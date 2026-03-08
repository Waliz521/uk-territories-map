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
 * Client-provided status overrides.
 * Only territories in the client's list are Available (green) or Reserved (blue).
 * Everything else = Not available (gray).
 * Based on client attachment: green = Available, blue = Reserved (Newham only).
 */
export const CLIENT_STATUS_OVERRIDES: Record<string, TerritoryStatus> = {
  // Reserved (blue) - Newham only
  '27': 'reserved',
  // Available (green) - territories from client's list
  '4': 'available',   // Camden
  '6': 'available',  // Islington
  '7': 'available',  // Barking and Dagenham
  '10': 'available', // Haringey
  '17': 'available', // Southwark
  '18': 'available', // Lambeth
  '22': 'available', // Enfield
  '25': 'available', // Brent
  '26': 'available', // Ealing
  '30-34': 'available',  // Hampshire, Portsmouth, Isle of Wight
  '35': 'available',   // Durham, Northumberland
  '36-37': 'available', // Leicestershire, Rutland
  '38-40': 'available', // Gloucestershire, Herefordshire
  '43': 'available',   // Dorset
  '45-46': 'available', // Bristol
  '49-50': 'available', // Wiltshire
  '53-55': 'available', // Buckinghamshire
  '67-70': 'available', // Warwickshire
  '87-89': 'available', // Lincolnshire
  '90-92': 'available', // Northamptonshire (North Northamptonshire)
  '93-95': 'available', // Derbyshire
  '99-101': 'available', // Nottinghamshire
  '101-103': 'available', // Staffordshire (North Staffordshire)
  '104-106': 'available', // West Sussex
  '107-109': 'available', // Norfolk
  '110-112': 'available', // Berkshire (Reading)
  '113-116': 'available', // Cheshire (Cheshire and Wirral)
  '117-120': 'available', // Tyne and Wear (Gateshead)
  '121-124': 'available', // Hertfordshire
  '125-128': 'available', // Surrey
  '129-132': 'available', // South Yorkshire (Sheffield)
  '138-142': 'available', // Lancashire
  '159-164': 'available', // Greater Manchester (Salford)
}

/**
 * Build territory groups from area records
 * Default status is 'unavailable' - only whitelisted territories get available/reserved
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
  const merged = { ...CLIENT_STATUS_OVERRIDES, ...statusMap }
  return Array.from(byTerritory.entries()).map(([id, areas]) => ({
    id,
    areas,
    totalPopulation: areas.reduce((s, a) => s + a.population, 0),
    status: merged[id] ?? 'unavailable',
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
