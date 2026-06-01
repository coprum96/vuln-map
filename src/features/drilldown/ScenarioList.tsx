import type { ScenarioId } from '../../types';
import { SCENARIO_META } from '../../constants/scenarios';
import { AppIcon } from '../../components/icons/AppIcon';
import { SCENARIO_ICONS } from '../../components/icons/scenarioIcons';
import { scenarioLabel } from '../../content/ru';

interface ScenarioListProps {
  scenarioIds: ScenarioId[];
}

export function ScenarioList({ scenarioIds }: ScenarioListProps) {
  const shares = [42, 31, 27];

  return (
    <ul className="mt-2 space-y-2">
      {scenarioIds.map((id, index) => {
        const meta = SCENARIO_META[id];
        const share = shares[index] ?? 20;
        const Icon = SCENARIO_ICONS[meta.id];
        return (
          <li
            key={id}
            className="flex items-center justify-between rounded-cbr border border-page-border bg-[#FAFAFA] px-3 py-2"
          >
            <span className="flex items-center gap-2 text-sm text-page-text">
              <AppIcon icon={Icon} size={14} className="text-cbr-navy" />
              {scenarioLabel(id)}
            </span>
            <span className="text-xs font-semibold text-page-muted">{share}%</span>
          </li>
        );
      })}
    </ul>
  );
}
