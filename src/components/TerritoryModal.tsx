/**
 * Modal shown when user clicks a territory
 * Displays territory ID, areas, population, status
 */
import * as Dialog from '@radix-ui/react-dialog'
import type { TerritoryGroup } from '../types'
import { STATUS_COLORS, STATUS_LABELS } from '../data/statusColors'

interface TerritoryModalProps {
  territory: TerritoryGroup | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TerritoryModal({ territory, open, onOpenChange }: TerritoryModalProps) {
  if (!territory) return null
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay className="fixed inset-0 z-[2000] bg-black/40" />
      <Dialog.Content className="fixed left-1/2 top-1/2 z-[2001] w-fit min-w-[280px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-4 shadow-xl">
          <Dialog.Title className="text-lg font-semibold text-gray-900">
            {territory.areas.length > 1 ? `Territory ${territory.id}` : territory.areas[0]?.name ?? territory.id}
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            Territory details including areas, population, and availability status
          </Dialog.Description>
          <div className="mt-3 space-y-1.5">
            <div>
              <span className="text-sm font-medium text-gray-600">
                {territory.areas.length > 1 ? 'Areas:' : 'Area:'}
              </span>
              <ul className="mt-1 list-inside list-disc text-sm text-gray-700">
                {territory.areas.map((a) => (
                  <li key={a.name}>{a.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-600">Population:</span>
              <span className="ml-2 text-sm text-gray-700">
                {territory.totalPopulation > 0 ? territory.totalPopulation.toLocaleString() : 'N/A'}
              </span>
            </div>
            <div>
              <span
                className="inline-block rounded-full px-3 py-1 text-sm font-medium text-white"
                style={{ backgroundColor: STATUS_COLORS[territory.status] }}
              >
                {STATUS_LABELS[territory.status]}
              </span>
            </div>
          </div>
          <Dialog.Close asChild>
            <button className="mt-3 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200">
              Close
            </button>
          </Dialog.Close>
        </Dialog.Content>
    </Dialog.Root>
  )
}
