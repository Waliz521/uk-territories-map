/**
 * Status colour mapping for territory choropleth
 * Used by map layer styling and legend
 */
import type { TerritoryStatus } from '../types'

export const STATUS_COLORS: Record<TerritoryStatus, string> = {
  sold: '#6a1b9a',
  reserved: '#1976d2',
  available: '#4caf50',
  under_offer: '#ff9800',
  unavailable: '#9e9e9e',
}

export const STATUS_LABELS: Record<TerritoryStatus, string> = {
  sold: 'Sold',
  reserved: 'Reserved',
  available: 'Available',
  under_offer: 'Under Offer',
  unavailable: 'Unavailable',
}
