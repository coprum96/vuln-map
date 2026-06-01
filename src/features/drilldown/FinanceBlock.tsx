import type { RegionFinance } from '../../types';
import { ru } from '../../data/ru';

interface FinanceBlockProps {
  finance: RegionFinance;
}

function formatRub(value: number): string {
  if (value >= 1000) {
    return `${Math.round(value / 1000)} тыс. ₽`;
  }
  return `${value} ₽`;
}

export function FinanceBlock({ finance }: FinanceBlockProps) {
  return (
    <div className="mt-2 grid grid-cols-3 gap-2">
      <div className="rounded-cbr border border-page-border bg-[#FAFAFA] p-2 text-center">
        <p className="text-lg font-bold text-cbr-navy">
          {formatRub(finance.avgLossRub)}
        </p>
        <p className="text-xs text-page-muted">{ru.drilldown.avgLoss}</p>
      </div>
      <div className="rounded-cbr border border-page-border bg-[#FAFAFA] p-2 text-center">
        <p className="text-lg font-bold text-cbr-navy">
          {finance.largeLossPercent}%
        </p>
        <p className="text-xs text-page-muted">{ru.drilldown.largeLoss}</p>
      </div>
      <div className="rounded-cbr border border-page-border bg-[#FAFAFA] p-2 text-center">
        <p className="text-lg font-bold text-cbr-navy">
          {finance.annualExposureMln}
        </p>
        <p className="text-xs text-page-muted">{ru.drilldown.annual} (млн ₽)</p>
      </div>
    </div>
  );
}
