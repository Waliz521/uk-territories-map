import { createContext, useContext } from 'react'
import type { TerritoryGroup } from '../types'
import type { DisplayStatus } from '../data/statusColors'

export interface MapFilters {
  territoryId: string
  status: DisplayStatus | ''
}

export interface MapContextValue {
  selectTerritory: (territory: TerritoryGroup | null) => void
  openModal: () => void
  filters: MapFilters
  setFilters: (filters: MapFilters | ((prev: MapFilters) => MapFilters)) => void
}

export const MapContext = createContext<MapContextValue | null>(null)
export const useMapContext = () => {
  const ctx = useContext(MapContext)
  if (!ctx) throw new Error('useMapContext must be used within MapContext.Provider')
  return ctx
}
