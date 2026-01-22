'use client';

import { useLanguage } from '@/context/LanguageContext';

export type Status = 'pending' | 'in-progress' | 'completed';

interface StatusBadgeProps {
  status: Status;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useLanguage();

  const statusConfig = {
    'pending': {
      bg: 'bg-zinc-100',
      text: 'text-zinc-600',
      label: t('예정', 'Pending'),
    },
    'in-progress': {
      bg: 'bg-zinc-900',
      text: 'text-white',
      label: t('진행중', 'In Progress'),
    },
    'completed': {
      bg: 'bg-zinc-100',
      text: 'text-zinc-900',
      label: t('완료', 'Done'),
    },
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium tracking-wide ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  );
}
