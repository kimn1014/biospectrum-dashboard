'use client';

import { useState } from 'react';
import AuthWrapper from '@/components/AuthWrapper';
import { useLanguage } from '@/context/LanguageContext';
import TaskCard from '@/components/TaskCard';
import StatusFilter from '@/components/StatusFilter';
import { backendTasks } from '@/data/backendTasks';
import { Status } from '@/components/StatusBadge';

export default function BackendPage() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<Status | 'all'>('all');

  const statusOrder: Record<string, number> = {
    'pending': 0,
    'completed': 1,
    'in-progress': 2,
  };

  const sortedTasks = [...backendTasks].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);

  const filteredTasks = activeFilter === 'all'
    ? sortedTasks
    : sortedTasks.filter(task => task.status === activeFilter);

  const counts = {
    all: backendTasks.length,
    pending: backendTasks.filter(t => t.status === 'pending').length,
    'in-progress': backendTasks.filter(t => t.status === 'in-progress').length,
    completed: backendTasks.filter(t => t.status === 'completed').length,
  };

  return (
    <AuthWrapper>
      <div className="min-h-screen">
        {/* Header */}
        <section className="pt-28 pb-12 px-6 border-b border-zinc-200">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs text-zinc-400 uppercase tracking-wider mb-3 animate-fadeInUp">
              Development
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold text-zinc-900 tracking-tight mb-4 animate-fadeInUp stagger-1">
              {t('백엔드', 'Backend')}
            </h1>
            <p className="text-zinc-500 animate-fadeInUp stagger-2">
              {t('백엔드 개발 현황', 'Backend development status')}
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 px-6 border-b border-zinc-200 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="animate-fadeInUp stagger-2">
                <p className="text-xs text-zinc-400 uppercase tracking-wider mb-2">
                  {t('전체', 'Total')}
                </p>
                <p className="text-3xl font-light text-zinc-900">{counts.all}</p>
              </div>
              <div className="animate-fadeInUp stagger-3">
                <p className="text-xs text-zinc-400 uppercase tracking-wider mb-2">
                  {t('진행중', 'Active')}
                </p>
                <p className="text-3xl font-light text-zinc-900">{counts['in-progress']}</p>
              </div>
              <div className="animate-fadeInUp stagger-4">
                <p className="text-xs text-zinc-400 uppercase tracking-wider mb-2">
                  {t('완료', 'Done')}
                </p>
                <p className="text-3xl font-light text-zinc-900">{counts.completed}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter & List */}
        <section className="py-8 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 animate-fadeInUp stagger-3">
              <StatusFilter
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                counts={counts}
              />
            </div>

            <div className="space-y-px bg-zinc-200">
              {filteredTasks.map((task, index) => (
                <div
                  key={task.id}
                  className="animate-fadeInUp"
                  style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                >
                  <TaskCard task={task} />
                </div>
              ))}
            </div>

            {filteredTasks.length === 0 && (
              <div className="text-center py-20 animate-fadeIn">
                <p className="text-zinc-400">
                  {t('해당 상태의 작업이 없습니다', 'No tasks with this status')}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </AuthWrapper>
  );
}
