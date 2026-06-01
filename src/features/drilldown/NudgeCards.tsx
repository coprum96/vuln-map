import type { Recommendation } from '../../types';
import { Card } from '../../components/ui/Card';

interface NudgeCardsProps {
  items: Recommendation[];
}

export function NudgeCards({ items }: NudgeCardsProps) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <Card
          key={item.id}
          className={
            item.priority === 'high'
              ? 'rounded-cbr-md border-l-4 border-l-cbr-red p-3'
              : 'rounded-cbr-md border-l-4 border-l-[#F5A623] p-3'
          }
        >
          <p className="text-sm font-semibold text-page-text">{item.title}</p>
          <p className="mt-1 text-xs text-page-muted">{item.body}</p>
        </Card>
      ))}
    </div>
  );
}
