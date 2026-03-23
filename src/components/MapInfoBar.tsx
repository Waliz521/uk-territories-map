/**
 * Below header: full gray explainer bar when open; when closed, only a floating info
 * button over the map (no gray strip). Contact us lives in the main header.
 */
import { useState } from 'react'

const EXPLAINER_BULLETS = [
  'This map shows UK territories and their availability status for Blossoming Care.',
  'Click any highlighted area to open details (population, status, and more).',
  'Use Territory and Status filters to focus on specific regions or availability.',
  'Colours match the legend: Available (green), Reserved, Sold, or Not available.',
]

const infoBtnClass =
  'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-md transition-colors hover:border-[var(--brand-rose)] hover:bg-[var(--brand-rose)]/5 hover:text-[var(--brand-rose-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-rose)]/30'

export function MapInfoBar() {
  const [showExplainer, setShowExplainer] = useState(true)

  const infoToggle = (
    <button
      type="button"
      onClick={() => setShowExplainer((v) => !v)}
      aria-expanded={showExplainer}
      aria-label={showExplainer ? 'Hide map help text' : 'Show map help text'}
      className={infoBtnClass}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.75" />
        <path
          d="M12 16v-4M12 8h.01"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </button>
  )

  if (!showExplainer) {
    return (
      <div className="pointer-events-none absolute left-3 top-3 z-[1100] sm:left-4 sm:top-4">
        <div className="pointer-events-auto">{infoToggle}</div>
      </div>
    )
  }

  return (
    <div className="relative z-[1101] shrink-0 border-b border-gray-100 bg-gray-50 px-3 py-2 sm:px-6">
      <div className="mx-auto flex max-w-[100vw] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-snug text-gray-600 sm:max-w-[min(36rem,50vw)] lg:max-w-xl">
            View territory availability across England and Wales. Click an area for details, or use the
            filters above to narrow by territory or status.
          </p>
          <details className="mt-2 text-gray-600 sm:mt-1">
            <summary className="cursor-pointer select-none text-xs font-medium text-gray-500 underline-offset-2 hover:text-[var(--brand-rose-dark)] hover:underline">
              More tips
            </summary>
            <ul className="mt-2 list-disc space-y-1.5 pl-4 text-xs text-gray-600 sm:text-sm">
              {EXPLAINER_BULLETS.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </details>
        </div>

        <div className="flex shrink-0 flex-wrap items-center justify-end gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setShowExplainer(false)}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-sm transition-colors hover:border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--brand-rose)]/30"
            aria-label="Close help text"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          {infoToggle}
        </div>
      </div>
    </div>
  )
}
