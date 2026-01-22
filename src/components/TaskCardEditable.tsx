'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Task } from '@/lib/supabase';

interface TaskCardEditableProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TaskCardEditable({ task, onEdit, onDelete }: TaskCardEditableProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t, language } = useLanguage();

  const title = language === 'ko' ? task.title_ko : task.title_en;
  const content = language === 'ko' ? task.content_ko : task.content_en;
  const memo = language === 'ko' ? task.memo_ko : task.memo_en;
  const requiredInfo = language === 'ko' ? task.required_info_ko : task.required_info_en;

  const hasDetails = (content && content.length > 0) || (memo && memo.trim()) || (requiredInfo && requiredInfo.length > 0) || task.due_date;

  const statusConfig = {
    'pending': { bg: 'bg-zinc-100', text: 'text-zinc-600', label: t('예정', 'Pending') },
    'in-progress': { bg: 'bg-zinc-900', text: 'text-white', label: t('진행중', 'In Progress') },
    'completed': { bg: 'bg-zinc-100', text: 'text-zinc-900', label: t('완료', 'Done') },
  };

  const config = statusConfig[task.status];

  return (
    <div className="group bg-white border border-zinc-200 hover:border-zinc-300 transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div
            className={`flex-1 min-w-0 ${hasDetails ? 'cursor-pointer' : ''}`}
            onClick={() => hasDetails && setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium tracking-wide ${config.bg} ${config.text}`}>
                {config.label}
              </span>
              {task.assignee && (
                <span className="text-xs text-zinc-400">{task.assignee}</span>
              )}
            </div>
            <h3 className="text-base font-medium text-zinc-900 leading-snug">{title}</h3>
            {task.due_date && (
              <p className="text-sm text-zinc-400 mt-2">{t('마감', 'Due')}: {task.due_date}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onEdit(task)}
              className="p-2 text-zinc-300 hover:text-zinc-900 transition-colors"
              title={t('수정', 'Edit')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={() => {
                if (confirm(t('정말 삭제하시겠습니까?', 'Are you sure you want to delete this?'))) {
                  onDelete(task.id);
                }
              }}
              className="p-2 text-zinc-300 hover:text-red-500 transition-colors"
              title={t('삭제', 'Delete')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            {hasDetails && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={`p-2 text-zinc-300 hover:text-zinc-500 transition-all duration-200 ${isExpanded ? 'rotate-180' : ''}`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>
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

          {memo && memo.trim() && (
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
