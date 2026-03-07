import { useState } from 'react'
import { MapContext, type MapContextValue, type MapFilters } from './context/MapContext'
import { Header } from './components/Header'
import { Map } from './components/Map'
import { TerritoryLayer } from './components/TerritoryLayer'
import { Legend } from './components/Legend'
import { TerritoryModal } from './components/TerritoryModal'
import type { TerritoryGroup } from './types'

const DEFAULT_FILTERS: MapFilters = {
  territoryId: '',
  status: '',
}

function App() {
  const [selectedTerritory, setSelectedTerritory] = useState<TerritoryGroup | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [filters, setFilters] = useState<MapFilters>(DEFAULT_FILTERS)

  const mapContext: MapContextValue = {
    selectTerritory: setSelectedTerritory,
    openModal: () => setModalOpen(true),
    filters,
    setFilters,
  }

  return (
    <MapContext.Provider value={mapContext}>
      <div className="flex h-screen flex-col overflow-hidden">
        <Header />
        <main className="relative flex-1">
          <Map>
            <TerritoryLayer />
          </Map>
          <Legend />
        </main>
        <TerritoryModal
          territory={selectedTerritory}
          open={modalOpen}
          onOpenChange={setModalOpen}
        />
      </div>
    </MapContext.Provider>
  )
}

export default App
