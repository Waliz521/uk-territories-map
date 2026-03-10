# Blossoming Care UK Territories Map

Interactive UK map showing England & Wales territories, colour-coded by status. Click territories to view details (areas, population, status). Filter by territory or status.

## Tech Stack

- **React 19** + **TypeScript** + **Vite**
- **Leaflet** + **React-Leaflet** for the map
- **Tailwind CSS** for styling
- **Radix UI** (Dialog, Select) for modals and filters
- **@turf/turf** for geometry merging (territory grouping)
- **GeoJSON** from [UK-GeoJSON](https://github.com/martinjc/UK-GeoJSON)

## Deployment

To load data from Supabase (admin changes appear on map), set these env vars in your deployment (Vercel, Netlify, etc.):

- `VITE_SUPABASE_URL` – Supabase project URL
- `VITE_SUPABASE_ANON_KEY` – Supabase anon key

**Must match the admin panel** – both apps use the same Supabase project. If env vars are missing, the map uses static data. A "Live data" badge appears when connected to Supabase.
