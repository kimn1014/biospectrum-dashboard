'use client';

import { useState } from 'react';
import StatusBadge, { Status } from './StatusBadge';
import { useLanguage } from '@/context/LanguageContext';

export interface TaskData {
  id: string;
  titleKo: string;
  titleEn: string;
  status: Status;
  assignee?: string;
  dueDate?: string;
  contentKo?: string[];
  contentEn?: string[];
  memoKo?: string;
  memoEn?: string;
  requiredInfoKo?: string[];
  requiredInfoEn?: string[];
}

interface TaskCardProps {
  task: TaskData;
}

export default function TaskCard({ task }: TaskCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t, language } = useLanguage();

  const title = language === 'ko' ? task.titleKo : task.titleEn;
  const content = language === 'ko' ? task.contentKo : task.contentEn;
  const memo = language === 'ko' ? task.memoKo : task.memoEn;
  const requiredInfo = language === 'ko' ? task.requiredInfoKo : task.requiredInfoEn;

  const hasDetails = content?.length || memo || requiredInfo?.length || task.dueDate;

  return (
    <div className="group bg-white border border-zinc-200 hover:border-zinc-300 transition-all duration-300">
      <div
        className={`p-6 ${hasDetails ? 'cursor-pointer' : ''}`}
        onClick={() => hasDetails && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <StatusBadge status={task.status} />
              {task.assignee && (
                <span className="text-xs text-zinc-400">
                  {task.assignee}
                </span>
              )}
            </div>
            <h3 className="text-base font-medium text-zinc-900 leading-snug">
              {title}
            </h3>
            {task.dueDate && (
              <p className="text-sm text-zinc-400 mt-2">
                {t('마감', 'Due')}: {task.dueDate}
              </p>
            )}
          </div>
          {hasDetails && (
            <button className={`p-1 text-zinc-300 group-hover:text-zinc-500 transition-all duration-200 ${isExpanded ? 'rotate-180' : ''}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {isExpanded && hasDetails && (
        <div className="px-6 pb-6 border-t border-zinc-100 pt-5 animate-fadeIn">
          {content && content.length > 0 && (
            <div className="mb-5">
              <h4 className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">
                {t('작업 내용', 'Details')}
              </h4>
              <ul className="space-y-2">
                {content.map((item, index) => (
                  <li key={index} className="text-sm text-zinc-600 flex items-start gap-3">
                    <span className="w-1 h-1 rounded-full bg-zinc-300 mt-2 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {requiredInfo && requiredInfo.length > 0 && (
            <div className="mb-5 p-4 bg-zinc-50 border border-zinc-100">
              <h4 className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-3">
                {t('필요 정보', 'Required Info')}
              </h4>
              <ul className="space-y-1">
                {requiredInfo.map((item, index) => (
                  <li key={index} className="text-sm text-zinc-600">{item}</li>
                ))}
              </ul>
            </div>
          )}

          {memo && (
            <div className="p-4 bg-zinc-50 border-l-2 border-zinc-300">
              <h4 className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2">
                {t('메모', 'Note')}
              </h4>
              <p className="text-sm text-zinc-600 leading-relaxed">{memo}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
