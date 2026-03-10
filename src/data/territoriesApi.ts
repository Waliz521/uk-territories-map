/**
 * Fetch territory data from Supabase API.
 * Used when VITE_SUPABASE_URL is set; otherwise map uses static data.
 */
import type { AreaRecord, TerritoryGroup, TerritoryStatus } from '../types'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export interface ApiLocation {
  id: string
  name: string
  type: 'Borough' | 'County'
  region: 'England' | 'Wales'
  population: number
  territory: string
  status: TerritoryStatus
  metadata: string
}

export function isApiEnabled(): boolean {
  return !!(SUPABASE_URL && SUPABASE_ANON_KEY)
}

export async function fetchLocations(): Promise<ApiLocation[]> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return []
  const res = await fetch(`${SUPABASE_URL}/rest/v1/locations?select=*&order=name`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    cache: 'no-store',
  })
  if (!res.ok) throw new Error('Failed to fetch locations')
  return res.json()
}

/** Convert API locations to AreaRecord[] and build TerritoryGroup[] */
export function buildTerritoryGroupsFromApi(locations: ApiLocation[]): {
  areaRecords: AreaRecord[]
  groups: TerritoryGroup[]
} {
  const areaRecords: AreaRecord[] = locations.map((l) => ({
    name: l.name,
    type: l.type,
    region: l.region,
    population: l.population,
    territory: l.territory,
    metadata: l.metadata || undefined,
  }))

  const byTerritory = new Map<string, ApiLocation[]>()
  for (const l of locations) {
    const key = l.territory || `ungrouped-${l.name}`
    if (!byTerritory.has(key)) byTerritory.set(key, [])
    byTerritory.get(key)!.push(l)
  }

  const groups: TerritoryGroup[] = Array.from(byTerritory.entries()).map(([id, locs]) => {
    const areas: AreaRecord[] = locs.map((l) => ({
      name: l.name,
      type: l.type,
      region: l.region,
      population: l.population,
      territory: l.territory,
      metadata: l.metadata || undefined,
    }))
    const status = locs[0]?.status ?? 'unavailable'
    const metadata = locs
      .map((l) => l.metadata)
      .filter(Boolean)
      .join(' | ')
    return {
      id,
      areas,
      totalPopulation: areas.reduce((s, a) => s + a.population, 0),
      status,
      metadata: metadata || undefined,
    }
  })

  return { areaRecords, groups }
}
