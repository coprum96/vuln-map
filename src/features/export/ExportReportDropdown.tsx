import { useEffect, useRef, useState } from 'react';
import type { Region } from '../../types';
import { phase2Ru } from '../../data/phase2Ru';
import { ru } from '../../data/ru';
import { regionName } from '../../data/ru';
import {
  buildRegionCsv,
  buildRegionJson,
  buildRegionTxt,
} from './buildRegionExport';
import { downloadBlob } from './downloadBlob';

type ExportFormat = 'txt' | 'csv' | 'json';

interface ExportReportDropdownProps {
  region: Region;
}

export function ExportReportDropdown({ region }: ExportReportDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  const baseName = `${phase2Ru.export.filenamePrefix}-${region.id}`;

  const handleExport = (format: ExportFormat) => {
    const stamp = new Date().toISOString().slice(0, 10);
    if (format === 'txt') {
      downloadBlob(
        `${baseName}-${stamp}.txt`,
        buildRegionTxt(region),
        'text/plain;charset=utf-8',
      );
    } else if (format === 'csv') {
      downloadBlob(
        `${baseName}-${stamp}.csv`,
        buildRegionCsv(region),
        'text/csv;charset=utf-8',
      );
    } else {
      downloadBlob(
        `${baseName}-${stamp}.json`,
        buildRegionJson(region),
        'application/json;charset=utf-8',
      );
    }
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="rounded-cbr border-0 bg-cbr-red px-4 py-2 text-sm font-semibold text-white hover:bg-cbr-red-dark"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        {ru.app.exportReport}
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-1 min-w-[140px] rounded-cbr border border-page-border bg-white py-1 shadow-cbr"
        >
          <p className="border-b border-page-border px-3 py-1.5 text-[10px] uppercase tracking-wide text-page-muted">
            {regionName(region.id)}
          </p>
          <button
            type="button"
            role="menuitem"
            className="block w-full px-3 py-2 text-left text-sm text-page-text hover:bg-[#EEF3F8]"
            onClick={() => handleExport('txt')}
          >
            {phase2Ru.export.txt}
          </button>
          <button
            type="button"
            role="menuitem"
            className="block w-full px-3 py-2 text-left text-sm text-page-text hover:bg-[#EEF3F8]"
            onClick={() => handleExport('csv')}
          >
            {phase2Ru.export.csv}
          </button>
          <button
            type="button"
            role="menuitem"
            className="block w-full px-3 py-2 text-left text-sm text-page-text hover:bg-[#EEF3F8]"
            onClick={() => handleExport('json')}
          >
            {phase2Ru.export.json}
          </button>
        </div>
      ) : null}
    </div>
  );
}
