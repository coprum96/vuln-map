import { HeaderBar } from './components/layout/HeaderBar';
import { HEADER_HEIGHT_PX } from './constants/layout';
import { ru } from './content/ru';
import { MapScreen } from './features/map/MapScreen';
import { RegionSidebar } from './features/sidebar/RegionSidebar';
import { useSelectedRegion } from './hooks/useSelectedRegion';
import { REGIONS_BY_ID } from './data/regionData';

export function App() {
  const { selectedId, selectRegion } = useSelectedRegion();

  const sidebarRegion = selectedId ? REGIONS_BY_ID[selectedId] : null;

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <HeaderBar />
      <main
        className="relative min-h-0 flex-1 overflow-hidden"
        style={{ height: `calc(100vh - ${HEADER_HEIGHT_PX}px)` }}
      >
        {selectedId ? (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/30 lg:hidden"
            style={{ top: HEADER_HEIGHT_PX }}
            aria-label={ru.mapScreen.sidebar.close}
            onClick={() => selectRegion(null)}
          />
        ) : null}
        <MapScreen selectedId={selectedId} onSelect={selectRegion} />
        <RegionSidebar
          region={sidebarRegion}
          onClose={() => selectRegion(null)}
        />
      </main>
    </div>
  );
}
