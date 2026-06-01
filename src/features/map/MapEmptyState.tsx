import clsx from 'clsx';
import { AlertCircle, FilterX, Loader2 } from 'lucide-react';
import { AppIcon } from '../../components/icons/AppIcon';
import { ru } from '../../content/ru';

type MapEmptyVariant = 'filter' | 'error' | 'loading';

interface MapEmptyStateProps {
  variant: MapEmptyVariant;
  onResetFilters?: () => void;
}

export function MapEmptyState({ variant, onResetFilters }: MapEmptyStateProps) {
  if (variant === 'loading') {
    return (
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 rounded-md bg-[#F5F7FA]/85">
        <AppIcon icon={Loader2} size={24} className="animate-spin text-cbr-navy" />
        <p className="text-sm text-page-muted">{ru.mapScreen.empty.loading}</p>
      </div>
    );
  }

  const isError = variant === 'error';
  const Icon = isError ? AlertCircle : FilterX;

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center rounded-md bg-[#EEF2F6]/92 px-6">
      <div className="max-w-sm rounded-md border border-page-border bg-white p-5 text-center shadow-lg">
        <div
          className={clsx(
            'mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full',
            isError ? 'bg-red-50' : 'bg-[#EEF3F8]',
          )}
        >
          <AppIcon
            icon={Icon}
            size={22}
            className={isError ? 'text-cbr-red' : 'text-cbr-navy'}
          />
        </div>
        <h3 className="text-sm font-bold text-cbr-navy">
          {isError
            ? ru.mapScreen.empty.loadErrorTitle
            : ru.mapScreen.empty.filterTitle}
        </h3>
        <p className="mt-2 text-[13px] leading-relaxed text-page-muted">
          {isError
            ? ru.mapScreen.empty.loadErrorBody
            : ru.mapScreen.empty.filterBody}
        </p>
        {isError ? (
          <button
            type="button"
            className="mt-4 rounded-md bg-cbr-navy px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            onClick={() => window.location.reload()}
          >
            {ru.mapScreen.empty.loadErrorAction}
          </button>
        ) : (
          <button
            type="button"
            className="mt-4 rounded-md border border-cbr-navy bg-white px-4 py-2 text-sm font-medium text-cbr-navy hover:bg-[#EEF3F8]"
            onClick={onResetFilters}
          >
            {ru.mapScreen.empty.filterAction}
          </button>
        )}
      </div>
    </div>
  );
}
