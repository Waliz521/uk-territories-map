/**
 * Status colour mapping for territory choropleth
 * "Under Offer" removed per client request. Sold, Reserved, Available, Unavailable kept.
 */
import type { TerritoryStatus } from '../types'

export type DisplayStatus = 'available' | 'reserved' | 'sold' | 'not_available'

export const DISPLAY_COLORS: Record<DisplayStatus, string> = {
  available: '#4caf50',
  reserved: '#1976d2',
  sold: '#6a1b9a',
  not_available: '#9e9e9e',
}

export const DISPLAY_LABELS: Record<DisplayStatus, string> = {
  available: 'Available',
  reserved: 'Reserved',
  sold: 'Sold',
  not_available: 'Not available',
}

/** Map internal status to display (under_offer → not_available, rest unchanged) */
export function getDisplayStatus(status: TerritoryStatus): DisplayStatus {
  if (status === 'under_offer') return 'not_available'
  if (status === 'sold') return 'sold'
  if (status === 'available') return 'available'
  if (status === 'reserved') return 'reserved'
  return 'not_available'
}

export function getDisplayColor(status: TerritoryStatus): string {
  return DISPLAY_COLORS[getDisplayStatus(status)]
}

/** For map styling */
export const STATUS_COLORS: Record<TerritoryStatus, string> = {
  sold: DISPLAY_COLORS.sold,
  reserved: DISPLAY_COLORS.reserved,
  available: DISPLAY_COLORS.available,
  under_offer: DISPLAY_COLORS.not_available,
  unavailable: DISPLAY_COLORS.not_available,
}
