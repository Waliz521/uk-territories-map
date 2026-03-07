/**
 * Map legend - status colours
 */
import { STATUS_COLORS, STATUS_LABELS } from '../data/statusColors'
import type { TerritoryStatus } from '../types'

const STATUS_ORDER: TerritoryStatus[] = [
  'sold',
  'reserved',
  'available',
  'under_offer',
  'unavailable',
]

export function Legend() {
  return (
    <div className="absolute bottom-6 right-3 z-[1000] rounded-lg bg-white/95 p-2 shadow-lg sm:bottom-8 sm:right-4 sm:p-3">
      <h3 className="mb-1.5 text-xs font-semibold text-gray-700 sm:mb-2 sm:text-sm">Status</h3>
      <ul className="space-y-1.5">
        {STATUS_ORDER.map((status) => (
          <li key={status} className="flex items-center gap-1.5 text-xs sm:gap-2 sm:text-sm">
            <span
              className="h-3 w-3 shrink-0 rounded sm:h-4 sm:w-4"
              style={{ backgroundColor: STATUS_COLORS[status] }}
            />
            <span>{STATUS_LABELS[status]}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
