/**
 * Modal shown when user clicks a territory
 * Displays territory ID, areas, population, status, metadata
 */
import * as Dialog from '@radix-ui/react-dialog'
import type { TerritoryGroup } from '../types'
import { getDisplayColor, getDisplayStatus, DISPLAY_LABELS } from '../data/statusColors'
import { TERRITORY_DISPLAY_NAMES } from '../data/territories'

/** Parse metadata: key:value;key:value (; separates pairs so commas in values are safe). Also supports | for merged segments. */
function parseMetadata(metadata?: string): Array<{ key: string; value: string }> {
  if (!metadata?.trim()) return []
  const entries: Array<{ key: string; value: string }> = []
  for (const segment of metadata.split('|').map((s) => s.trim())) {
    for (const part of segment.split(';').map((s) => s.trim())) {
      const idx = part.indexOf(':')
      if (idx > 0) {
        entries.push({ key: part.slice(0, idx).trim(), value: part.slice(idx + 1).trim() })
      }
    }
  }
  return entries
}

interface TerritoryModalProps {
  territory: TerritoryGroup | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TerritoryModal({ territory, open, onOpenChange }: TerritoryModalProps) {
  if (!territory) return null
  const metadataEntries = parseMetadata(territory.metadata)
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay className="fixed inset-0 z-[2000] bg-black/40" />
      <Dialog.Content className="fixed left-4 top-1/2 z-[2001] w-fit min-w-[280px] max-w-[90vw] -translate-y-1/2 rounded-xl bg-white p-4 shadow-xl">
          <Dialog.Title className="text-lg font-semibold text-gray-900">
            {territory.areas.length > 1
              ? (TERRITORY_DISPLAY_NAMES[territory.id] ?? `Territory ${territory.id}`)
              : territory.areas[0]?.name ?? territory.id}
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
                style={{ backgroundColor: getDisplayColor(territory.status) }}
              >
                {DISPLAY_LABELS[getDisplayStatus(territory.status)]}
              </span>
            </div>
            {metadataEntries.map(({ key, value }) => (
              <div key={key}>
                <span className="text-sm font-medium text-gray-600">{key}:</span>
                <span className="ml-2 text-sm text-gray-700">{value}</span>
              </div>
            ))}
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
