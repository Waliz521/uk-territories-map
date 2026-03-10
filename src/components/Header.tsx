/**
 * Page header with logo, title, and filters - styled to match Blossoming Care brand
 * Mobile: logo + title + hamburger (filters in slide-out panel)
 * Desktop: logo + title + filters inline
 */
import { useState } from 'react'
import * as Select from '@radix-ui/react-select'
import * as Dialog from '@radix-ui/react-dialog'
import { useMapContext } from '../context/MapContext'
import { useTerritoryData } from '../context/TerritoryDataContext'
import { DISPLAY_LABELS } from '../data/statusColors'
import type { DisplayStatus } from '../data/statusColors'

const ALL_VALUE = '__all__'

const STATUS_OPTIONS: { value: DisplayStatus | typeof ALL_VALUE; label: string }[] = [
  { value: ALL_VALUE, label: 'All statuses' },
  { value: 'available', label: DISPLAY_LABELS.available },
  { value: 'reserved', label: DISPLAY_LABELS.reserved },
  { value: 'sold', label: DISPLAY_LABELS.sold },
  { value: 'not_available', label: DISPLAY_LABELS.not_available },
]

const triggerClass =
  'inline-flex w-full min-w-0 items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50 focus:border-[var(--brand-rose)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-rose)]/30 data-[placeholder]:text-gray-500'

const contentClass =
  'z-[3000] w-[var(--radix-select-trigger-width)] min-w-[var(--radix-select-trigger-width)] max-h-[280px] overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-lg'

const itemClass =
  'relative flex cursor-pointer select-none items-center px-3 py-2 text-sm outline-none data-[highlighted]:bg-[var(--brand-rose)]/10 data-[highlighted]:text-[var(--brand-rose-dark)]'

function FilterDropdowns({ compact = false }: { compact?: boolean }) {
  const { filters, setFilters } = useMapContext()
  const { territoryFilterOptions } = useTerritoryData()

  return (
    <div className={`flex flex-col gap-4 ${compact ? 'sm:flex-row sm:flex-wrap' : 'flex-row flex-wrap'} sm:gap-4`}>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <span className={`text-sm font-medium text-gray-600 ${compact ? 'block' : 'hidden sm:inline'}`}>
          Territory
        </span>
        <Select.Root
          value={filters.territoryId || ALL_VALUE}
          onValueChange={(v) => {
            const territoryId = v === ALL_VALUE ? '' : v
            setFilters((prev) => ({ ...prev, territoryId }))
          }}
        >
          <Select.Trigger className={triggerClass} aria-label="Filter by territory">
            <Select.Value placeholder="All territories" />
            <Select.Icon className="ml-auto shrink-0">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className={contentClass} position="popper" sideOffset={4}>
              <Select.Viewport>
                <Select.Item value={ALL_VALUE} className={itemClass}>
                  <Select.ItemText>All territories</Select.ItemText>
                </Select.Item>
                {territoryFilterOptions.map(({ id, label }) => (
                  <Select.Item key={id} value={id} className={itemClass}>
                    <Select.ItemText>{label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <span className={`text-sm font-medium text-gray-600 ${compact ? 'block' : 'hidden sm:inline'}`}>
          Status
        </span>
        <Select.Root
          value={filters.status || ALL_VALUE}
          onValueChange={(v) =>
            setFilters((prev) => ({
              ...prev,
              status: (v === ALL_VALUE ? '' : v) as DisplayStatus | '',
            }))
          }
        >
          <Select.Trigger className={triggerClass} aria-label="Filter by status">
            <Select.Value placeholder="All statuses" />
            <Select.Icon className="ml-auto shrink-0">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M3 4.5L6 7.5L9 4.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className={contentClass} position="popper" sideOffset={4}>
              <Select.Viewport>
                {STATUS_OPTIONS.map(({ value, label }) => (
                  <Select.Item key={value} value={value} className={itemClass}>
                    <Select.ItemText>{label}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>
    </div>
  )
}

function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  )
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-100 bg-white px-4 py-3 shadow-sm sm:px-6">
      {/* Brand logo + title - always visible, gets priority */}
      <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
        <img
          src="https://blossomingcare.co.uk/wp-content/uploads/2025/09/logo.png"
          alt="Blossoming Care"
          className="h-8 shrink-0 object-contain sm:h-10"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none'
          }}
        />
        <h1 className="min-w-0 truncate font-semibold text-[var(--brand-rose-dark)]">
          <span className="text-base sm:text-xl">UK Territories Map</span>
        </h1>
      </div>

      {/* Desktop: filters inline */}
      <div className="hidden md:flex md:flex-wrap md:items-center md:gap-3 md:gap-4">
        <FilterDropdowns />
      </div>

      {/* Mobile: hamburger button */}
      <div className="flex shrink-0 md:hidden">
        <Dialog.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <Dialog.Trigger asChild>
            <button
              type="button"
              className="flex items-center justify-center rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-[var(--brand-rose-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-rose)]/30"
              aria-label="Open filters"
            >
              <HamburgerIcon />
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 z-[2000] bg-black/40" />
            <Dialog.Content className="fixed right-0 top-0 z-[2001] flex h-full w-full max-w-sm flex-col bg-white shadow-xl focus:outline-none">
              <Dialog.Title className="sr-only">Filters</Dialog.Title>
              <Dialog.Description className="sr-only">
                Territory and status filter options
              </Dialog.Description>
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
                <span className="text-lg font-semibold text-gray-900">Filters</span>
                <Dialog.Close asChild>
                  <button
                    type="button"
                    className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[var(--brand-rose)]/30"
                    aria-label="Close filters"
                  >
                    <CloseIcon />
                  </button>
                </Dialog.Close>
              </div>
              <div className="flex-1 overflow-auto p-4">
                <FilterDropdowns compact />
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  )
}
