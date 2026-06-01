import { phase2Ru } from '../../data/phase2Ru';

export function AppNavigation() {
  return (
    <nav className="flex gap-0 border-b border-page-border bg-white px-6">
      <span className="border-b-2 border-cbr-red px-5 py-3 text-sm font-semibold text-cbr-navy">
        {phase2Ru.nav.dashboard}
      </span>
    </nav>
  );
}
