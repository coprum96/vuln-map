import type { ScenarioId } from '../../types';
import { SCENARIO_META } from '../../constants/scenarios';
import { AppIcon } from '../../components/icons/AppIcon';
import { SCENARIO_ICONS } from '../../components/icons/scenarioIcons';
import { scenarioLabel } from '../../content/ru';

interface SidebarScenarioListProps {
  scenarioIds: ScenarioId[];
}

const SHARES = [42, 31, 27];

export function SidebarScenarioList({ scenarioIds }: SidebarScenarioListProps) {
  return (
    <ul className="mt-1 space-y-3">
      {scenarioIds.map((id, index) => {
        const meta = SCENARIO_META[id];
        const share = SHARES[index] ?? 20;
        const Icon = SCENARIO_ICONS[meta.id];
        return (
          <li key={id}>
            <div className="mb-1 flex items-center justify-between gap-2 text-sm text-page-text">
              <span className="flex min-w-0 items-center gap-2">
                <AppIcon
                  icon={Icon}
                  size={14}
                  className="shrink-0 text-cbr-navy"
                />
                <span className="truncate">{scenarioLabel(id)}</span>
              </span>
              <span className="shrink-0 text-xs font-semibold tabular-nums text-page-muted">
                {share}%
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-sm bg-[#E8EDF2]">
              <div
                className="h-full bg-cbr-navy"
                style={{ width: `${share}%` }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
