/**
 * Type definitions for Blossoming Care UK Territories Map
 */

/** Territory status - determines map colour */
export type TerritoryStatus =
  | 'sold'
  | 'reserved'
  | 'available'
  | 'unavailable'

/** Single area from Excel (borough or county) */
export interface AreaRecord {
  name: string
  type: 'Borough' | 'County'
  region: 'England' | 'Wales'
  population: number
  territory: string // e.g. "1", "77-79", or empty for ungrouped
  /** Optional metadata from API (key:value,key:value) */
  metadata?: string
}

/** Grouped territory - multiple areas with same territory ID */
export interface TerritoryGroup {
  id: string // "1", "77-79", etc.
  areas: AreaRecord[]
  totalPopulation: number
  status: TerritoryStatus
  /** Merged metadata from areas (key:value,key:value) */
  metadata?: string
}

/** GeoJSON feature properties (from UK-GeoJSON LAD) */
export interface GeoJsonFeatureProperties {
  name?: string
  LAD13NM?: string
  LAD13CD?: string
  [key: string]: unknown
}
