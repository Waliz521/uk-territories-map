/**
 * Territory data - parsed from Excel (BCL_MapDash Data 2.0 -Territorised.xlsx)
 * Run: node scripts/parse-excel-simple.js to regenerate territoriesParsed.json
 */
import type { AreaRecord, TerritoryGroup, TerritoryStatus } from '../types'
import territoriesData from './territoriesParsed.json'
import { LAD_TO_COUNTY } from './ladToCounty'
import {
  LAD_TO_HAMPSHIRE_TERRITORY,
  CLIENT_MESSAGE_RUSHMOR,
} from './ladToHampshireTerritory'

/** Re-export for client communication */
export { CLIENT_MESSAGE_RUSHMOR }

/** Raw area records from Excel */
export const AREA_RECORDS: AreaRecord[] = territoriesData as AreaRecord[]

/**
 * Hampshire split: 4 territories (client request). Populations from client attachment.
 * Rushmoor excluded from split - see CLIENT_MESSAGE_RUSHMOR.
 */
const HAMPSHIRE_TERRITORY_AREAS: AreaRecord[] = [
  // South Hampshire: Portsmouth, Fareham, Gosport = 406,349
  { name: 'Portsmouth', type: 'Borough', region: 'England', population: 208_000, territory: 'hampshire-south' },
  { name: 'Fareham', type: 'Borough', region: 'England', population: 115_428, territory: 'hampshire-south' },
  { name: 'Gosport', type: 'Borough', region: 'England', population: 82_921, territory: 'hampshire-south' },
  // East Hampshire: Havant, East Hampshire, Southampton = 508,960
  { name: 'Havant', type: 'Borough', region: 'England', population: 126_985, territory: 'hampshire-east' },
  { name: 'East Hampshire', type: 'Borough', region: 'England', population: 129_975, territory: 'hampshire-east' },
  { name: 'Southampton', type: 'Borough', region: 'England', population: 252_000, territory: 'hampshire-east' },
  // North Hampshire: Basingstoke and Deane, Hart, Test Valley = 431,473
  { name: 'Basingstoke and Deane', type: 'Borough', region: 'England', population: 193_110, territory: 'hampshire-north' },
  { name: 'Hart', type: 'Borough', region: 'England', population: 103_162, territory: 'hampshire-north' },
  { name: 'Test Valley', type: 'Borough', region: 'England', population: 135_201, territory: 'hampshire-north' },
  // New Forest: Winchester, New Forest, Eastleigh = 454,681
  { name: 'Winchester', type: 'Borough', region: 'England', population: 135_632, territory: 'hampshire-new-forest' },
  { name: 'New Forest', type: 'Borough', region: 'England', population: 176_116, territory: 'hampshire-new-forest' },
  { name: 'Eastleigh', type: 'Borough', region: 'England', population: 142_933, territory: 'hampshire-new-forest' },
  // Rushmoor: unassigned until client confirms
  { name: 'Rushmoor', type: 'Borough', region: 'England', population: 95_000, territory: 'hampshire-unassigned' },
]

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
  '30-34': 'available',  // Isle of Wight only (Hampshire split into 4 below)
  'hampshire-south': 'available',   // South Hampshire
  'hampshire-east': 'available',    // East Hampshire
  'hampshire-north': 'available',   // North Hampshire
  'hampshire-new-forest': 'available', // New Forest
  'hampshire-unassigned': 'unavailable', // Rushmoor - pending client decision
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

/** Display names for territory filter and modal (Hampshire split) */
export const TERRITORY_DISPLAY_NAMES: Record<string, string> = {
  'hampshire-south': 'South Hampshire',
  'hampshire-east': 'East Hampshire',
  'hampshire-north': 'North Hampshire',
  'hampshire-new-forest': 'New Forest',
}

/**
 * Build territory groups from area records
 * Default status is 'unavailable' - only whitelisted territories get available/reserved
 * Hampshire split: 30-34 excludes Hampshire (Isle of Wight only); 4 new Hampshire territories added
 */
export function buildTerritoryGroups(
  records: AreaRecord[],
  statusMap: Record<string, TerritoryStatus> = {}
): TerritoryGroup[] {
  const byTerritory = new Map<string, AreaRecord[]>()
  for (const r of records) {
    // Exclude Hampshire from 30-34 (split into 4 territories)
    if (r.territory === '30-34' && normalizeName(r.name) === 'hampshire') continue
    const key = r.territory || `ungrouped-${r.name}`
    if (!byTerritory.has(key)) byTerritory.set(key, [])
    byTerritory.get(key)!.push(r)
  }
  // Add Hampshire split territories
  for (const r of HAMPSHIRE_TERRITORY_AREAS) {
    const key = r.territory
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
    if (r.territory && normalizeName(r.name) !== 'hampshire') ids.add(r.territory)
  }
  for (const r of HAMPSHIRE_TERRITORY_AREAS) {
    if (r.territory && r.territory !== 'hampshire-unassigned') ids.add(r.territory)
  }
  return Array.from(ids)
    .sort((a, b) => {
      const numA = parseInt(a, 10)
      const numB = parseInt(b, 10)
      if (!Number.isNaN(numA) && !Number.isNaN(numB)) return numA - numB
      return a.localeCompare(b)
    })
    .map((id) => ({
      id,
      label: TERRITORY_DISPLAY_NAMES[id] ?? `Territory ${id}`,
    }))
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

  // 2. Hampshire split: LAD → territory (overrides county mapping)
  const groupById = new Map(groups.map((g) => [g.id, g]))
  for (const [ladKey, territoryId] of Object.entries(LAD_TO_HAMPSHIRE_TERRITORY)) {
    const group = groupById.get(territoryId)
    if (group) map.set(ladKey, group)
  }

  // 3. County-level expansion: Excel has county names (e.g. Surrey, Derbyshire)
  //    but GeoJSON has LAD names (e.g. Elmbridge, Amber Valley). Map each LAD
  //    to the territory of its parent county. (Hampshire excluded - handled above)
  const countyToGroup = new Map<string, TerritoryGroup>()
  for (const group of groups) {
    for (const area of group.areas) {
      if (area.type === 'County' && area.territory) {
        const countyKey = normalizeName(area.name)
        if (countyKey === 'hampshire') continue // Hampshire split handled above
        countyToGroup.set(countyKey, group)
      }
    }
  }

  for (const [ladKey, countyName] of Object.entries(LAD_TO_COUNTY)) {
    if (map.has(ladKey)) continue // Already set by Hampshire split
    const group = countyToGroup.get(countyName)
    if (group) map.set(ladKey, group)
  }

  return map
}
