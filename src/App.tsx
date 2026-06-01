import { HeaderBar } from './components/layout/HeaderBar';
import { ru } from './content/ru';
import { MapScreen } from './features/map/MapScreen';
import { RegionSidebar } from './features/sidebar/RegionSidebar';
import { useSelectedRegion } from './hooks/useSelectedRegion';
import { REGIONS_BY_ID } from './data/regionData';

const HEADER_HEIGHT_PX = 56;

export function App() {
  const { selectedId, selectRegion } = useSelectedRegion();

  const sidebarRegion = selectedId ? REGIONS_BY_ID[selectedId] : null;

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <HeaderBar />
      <main
        className="relative overflow-hidden"
        style={{
          width: '100vw',
          height: `calc(100vh - ${HEADER_HEIGHT_PX}px)`,
        }}
      >
        {selectedId ? (
          <button
            type="button"
            className="fixed inset-0 top-14 z-30 bg-black/25 md:hidden"
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
