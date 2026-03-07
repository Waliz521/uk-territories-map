import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

const base = path.join(__dirname, '../../data/xlsx_extracted/xl')
const ss = fs.readFileSync(path.join(base, 'sharedStrings.xml'), 'utf8')
const sheet = fs.readFileSync(path.join(base, 'worksheets/sheet1.xml'), 'utf8')

const strings = []
let i = 0
while ((i = ss.indexOf('<si>', i)) >= 0) {
  const end = ss.indexOf('</si>', i)
  const si = ss.slice(i, end)
  const t = si.match(/<t[^>]*>([^<]*)<\/t>/)
  strings.push(t ? t[1].trim() : '')
  i = end + 1
}

const rows = sheet.match(/<row r="(\d+)"[^>]*>([\s\S]*?)<\/row>/g) || []
const data = []
for (const row of rows) {
  const r = row.match(/r="(\d+)"/)
  const num = r ? parseInt(r[1], 10) : 0
  if (num < 2 || num > 102) continue
  const get = (col) => {
    const re = new RegExp(`<c r="${col}${num}"([^>]*)><v>([^<]*)</v></c>`)
    const m = row.match(re)
    return m ? { attr: m[1], val: m[2] } : null
  }
  const b = get('B')
  if (!b) continue
  const name = strings[parseInt(b.val, 10)] || 'Unknown'
  const c = get('C')
  const type = c && strings[parseInt(c.val, 10)] === 'County' ? 'County' : 'Borough'
  const d = get('D')
  const region = d && strings[parseInt(d.val, 10)] === 'Wales' ? 'Wales' : 'England'
  const e = get('E')
  const population = e ? parseInt(e.val, 10) || 0 : 0
  const f = get('F')
  let territory = ''
  if (f) {
    territory = f.attr.includes('t="s"') ? (strings[parseInt(f.val, 10)] || '') : f.val
  }
  data.push({ name, type, region, population, territory })
}

fs.writeFileSync(
  path.join(__dirname, '../src/data/territoriesParsed.json'),
  JSON.stringify(data, null, 2)
)
console.log('Parsed', data.length, 'areas')
