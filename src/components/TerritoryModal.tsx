/**
 * Modal shown when user clicks a territory
 * Displays territory ID, areas, population, status, metadata
 * Draggable via the title bar (mouse and touch)
 */
import { useRef, useState, useEffect, useCallback } from 'react'
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
  const contentRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDesktop, setIsDesktop] = useState(false)
  const dragRef = useRef<{ startX: number; startY: number; startPosX: number; startPosY: number } | null>(null)

  // Reset position when modal opens
  useEffect(() => {
    if (open) setPosition({ x: 0, y: 0 })
  }, [open])

  // Track viewport size to switch between centered (mobile) and bottom-left (desktop) transforms
  useEffect(() => {
    const updateViewport = () => {
      setIsDesktop(window.innerWidth >= 768) // Tailwind md breakpoint
    }
    updateViewport()
    window.addEventListener('resize', updateViewport)
    return () => window.removeEventListener('resize', updateViewport)
  }, [])

  const clampPosition = useCallback((x: number, y: number) => {
    const el = contentRef.current
    if (!el) return { x, y }
    const rect = el.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight
    const padding = 8
    const leftOffset = 16 // matches left-4
    const minX = padding - leftOffset
    const maxX = vw - leftOffset - rect.width - padding
    const minY = padding - (vh / 2 - rect.height / 2)
    const maxY = vh / 2 - rect.height / 2 - padding
    return {
      x: Math.max(minX, Math.min(maxX, x)),
      y: Math.max(minY, Math.min(maxY, y)),
    }
  }, [])

  const getClientCoords = (e: MouseEvent | TouchEvent): { clientX: number; clientY: number } => {
    if ('touches' in e) {
      return { clientX: e.touches[0]?.clientX ?? 0, clientY: e.touches[0]?.clientY ?? 0 }
    }
    return { clientX: e.clientX, clientY: e.clientY }
  }

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const { clientX, clientY } = 'touches' in e ? { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY } : { clientX: e.clientX, clientY: e.clientY }
    dragRef.current = { startX: clientX, startY: clientY, startPosX: position.x, startPosY: position.y }
  }

  useEffect(() => {
    if (!open) return
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!dragRef.current) return
      if ('touches' in e) e.preventDefault()
      const { clientX, clientY } = getClientCoords(e)
      const dx = clientX - dragRef.current.startX
      const dy = clientY - dragRef.current.startY
      const newX = dragRef.current.startPosX + dx
      const newY = dragRef.current.startPosY + dy
      setPosition(clampPosition(newX, newY))
    }
    const handleEnd = () => {
      dragRef.current = null
    }
    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleEnd)
    document.addEventListener('touchmove', handleMove, { passive: false })
    document.addEventListener('touchend', handleEnd)
    document.addEventListener('touchcancel', handleEnd)
    return () => {
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleEnd)
      document.removeEventListener('touchmove', handleMove)
      document.removeEventListener('touchend', handleEnd)
      document.removeEventListener('touchcancel', handleEnd)
    }
  }, [open, clampPosition])

  if (!territory) return null
  const metadataEntries = parseMetadata(territory.metadata)
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay className="fixed inset-0 z-[2000] bg-black/40" />
      <Dialog.Content
        ref={contentRef}
        className="fixed left-1/2 top-1/2 z-[2001] w-fit min-w-[280px] max-w-[90vw] rounded-xl bg-white p-4 shadow-xl md:left-4 md:top-auto md:bottom-4"
        style={{
          transform: `${isDesktop ? '' : 'translate(-50%, -50%) '}translate(${position.x}px, ${position.y}px)`.trim(),
        }}
      >
        <div
          role="button"
          tabIndex={0}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          onKeyDown={(e) => e.key === 'Enter' && (e.target as HTMLElement).focus()}
          className="-mx-4 -mt-4 cursor-grab rounded-t-xl px-4 pt-4 pb-2 active:cursor-grabbing touch-none select-none"
          aria-label="Drag to move modal"
        >
          <Dialog.Title className="text-lg font-semibold text-gray-900">
            {territory.areas.length > 1
              ? (TERRITORY_DISPLAY_NAMES[territory.id] ?? `Territory ${territory.id}`)
              : territory.areas[0]?.name ?? territory.id}
          </Dialog.Title>
        </div>
          <Dialog.Description className="sr-only">
            Territory details including areas, population, and availability status
          </Dialog.Description>
          <div className="mt-3 space-y-1.5">
            <div>
              <span className="text-sm font-medium text-gray-600">
                {territory.areas.length > 1 ? 'Areas:' : 'Area:'}
              </span>
              <ul className="mt-1 list-inside list-disc text-sm text-gray-700">
                {territory.areas.map((a, i) => (
                  <li key={`${a.name}-${i}`}>{a.name}</li>
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
