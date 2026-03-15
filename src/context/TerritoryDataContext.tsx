import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react'
import type { AreaRecord, TerritoryGroup } from '../types'
import {
  buildTerritoryGroups,
  buildAreaToTerritoryMap,
  getTerritoryFilterOptions,
  getTerritoryFilterOptionsFromGroups,
  AREA_RECORDS,
} from '../data/territories'
import {
  isApiEnabled,
  fetchLocations,
  buildTerritoryGroupsFromApi,
} from '../data/territoriesApi'

export interface TerritoryDataValue {
  areaRecords: AreaRecord[]
  groups: TerritoryGroup[]
  areaToTerritory: Map<string, TerritoryGroup>
  territoryFilterOptions: { id: string; label: string }[]
  loading: boolean
  error: string | null
}

const TerritoryDataContext = createContext<TerritoryDataValue | null>(null)

export function TerritoryDataProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(isApiEnabled())
  const [error, setError] = useState<string | null>(null)
  const [areaRecords, setAreaRecords] = useState<AreaRecord[]>(
    isApiEnabled() ? [] : AREA_RECORDS
  )
  const [groups, setGroups] = useState<TerritoryGroup[]>(() =>
    isApiEnabled() ? [] : buildTerritoryGroups(AREA_RECORDS)
  )

  const refetch = useCallback(() => {
    if (!isApiEnabled()) return
    setLoading(true)
    return fetchLocations()
      .then((locs) => {
        const { areaRecords: recs, groups: grps } =
          buildTerritoryGroupsFromApi(locs)
        setAreaRecords(recs)
        setGroups(grps)
        setError(null)
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load data')
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!isApiEnabled()) {
      setLoading(false)
      return
    }
    refetch()
  }, [])

  // Refetch when user returns to map tab (e.g. after editing in admin)
  useEffect(() => {
    if (!isApiEnabled()) return
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') refetch()
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [refetch])

  const areaToTerritory = useMemo(
    () => buildAreaToTerritoryMap(groups, isApiEnabled()),
    [groups]
  )

  const territoryFilterOptions = useMemo(
    () =>
      isApiEnabled()
        ? getTerritoryFilterOptionsFromGroups(groups)
        : getTerritoryFilterOptions(),
    [groups]
  )

  const value: TerritoryDataValue = useMemo(
    () => ({
      areaRecords,
      groups,
      areaToTerritory,
      territoryFilterOptions,
      loading,
      error,
    }),
    [areaRecords, groups, areaToTerritory, territoryFilterOptions, loading, error]
  )

  return (
    <TerritoryDataContext.Provider value={value}>
      {children}
    </TerritoryDataContext.Provider>
  )
}

export function useTerritoryData() {
  const ctx = useContext(TerritoryDataContext)
  if (!ctx) throw new Error('useTerritoryData must be used within TerritoryDataProvider')
  return ctx
}
