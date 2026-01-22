'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Status } from './StatusBadge';

interface StatusFilterProps {
  activeFilter: Status | 'all';
  onFilterChange: (filter: Status | 'all') => void;
  counts: {
    all: number;
    pending: number;
    'in-progress': number;
    completed: number;
  };
}

export default function StatusFilter({ activeFilter, onFilterChange, counts }: StatusFilterProps) {
  const { t } = useLanguage();

  const filters: { key: Status | 'all'; labelKo: string; labelEn: string }[] = [
    { key: 'all', labelKo: '전체', labelEn: 'All' },
    { key: 'in-progress', labelKo: '진행중', labelEn: 'Active' },
    { key: 'pending', labelKo: '예정', labelEn: 'Pending' },
    { key: 'completed', labelKo: '완료', labelEn: 'Done' },
  ];

  return (
    <div className="flex items-center gap-1 border-b border-zinc-200">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.key;
        return (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`relative px-4 py-3 text-sm font-medium transition-colors duration-200 ${
              isActive
                ? 'text-zinc-900'
                : 'text-zinc-400 hover:text-zinc-600'
            }`}
          >
            {t(filter.labelKo, filter.labelEn)}
            <span className={`ml-2 text-xs ${isActive ? 'text-zinc-500' : 'text-zinc-300'}`}>
              {counts[filter.key]}
            </span>
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-900" />
            )}
          </button>
        );
      })}
    </div>
  );
}
