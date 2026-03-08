/**
 * Map legend - status colours (Available, Reserved, Not available only)
 */
import { DISPLAY_COLORS, DISPLAY_LABELS } from '../data/statusColors'
import type { DisplayStatus } from '../data/statusColors'

const DISPLAY_ORDER: DisplayStatus[] = ['available', 'reserved', 'sold', 'not_available']

export function Legend() {
  return (
    <div className="absolute bottom-6 right-3 z-[1000] rounded-lg bg-white/95 p-2 shadow-lg sm:bottom-8 sm:right-4 sm:p-3">
      <h3 className="mb-1.5 text-xs font-semibold text-gray-700 sm:mb-2 sm:text-sm">Status</h3>
      <ul className="space-y-1.5">
        {DISPLAY_ORDER.map((status) => (
          <li key={status} className="flex items-center gap-1.5 text-xs sm:gap-2 sm:text-sm">
            <span
              className="h-3 w-3 shrink-0 rounded sm:h-4 sm:w-4"
              style={{ backgroundColor: DISPLAY_COLORS[status] }}
            />
            <span>{DISPLAY_LABELS[status]}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
