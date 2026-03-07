/**
 * Match Excel area names to GeoJSON feature names
 * GeoJSON LAD uses names like "Kingston upon Thames"; Excel may have variants
 */
export function normalizeName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/\([^)]*\)/g, '') // Remove parenthetical e.g. (Caerdydd)
    .trim()
}

export function namesMatch(a: string, b: string): boolean {
  return normalizeName(a) === normalizeName(b)
}

/** Try to match area name to GeoJSON property - check common property keys */
export function findMatchingProperty(
  props: Record<string, unknown>,
  areaName: string
): boolean {
  const keys = ['name', 'LAD13NM', 'LAD13NMW', 'LAD19NM', 'lad19nm', 'lad13nm']
  const target = normalizeName(areaName)
  for (const k of keys) {
    const v = props[k]
    if (typeof v === 'string' && normalizeName(v) === target) return true
  }
  return false
}
