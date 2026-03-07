/**
 * Hook to load territory data and build groups
 */
import { useMemo } from 'react'
import { buildTerritoryGroups } from '../data/territories'
import { AREA_RECORDS } from '../data/territories'
import type { TerritoryStatus } from '../types'

export function useTerritories(statusOverrides?: Record<string, TerritoryStatus>) {
  return useMemo(() => {
    return buildTerritoryGroups(AREA_RECORDS, statusOverrides ?? {})
  }, [statusOverrides])
}
