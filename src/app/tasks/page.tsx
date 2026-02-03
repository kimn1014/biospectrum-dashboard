'use client';

import AuthWrapper from '@/components/AuthWrapper';
import { useLanguage } from '@/context/LanguageContext';
import { pendingTasks } from '@/data/pendingTasks';

export default function TasksPage() {
  const { t, language } = useLanguage();

  return (
    <AuthWrapper>
      <div className="min-h-screen">
        {/* Header */}
        <section className="pt-12 pb-12 px-6 border-b border-zinc-200">
          <div className="max-w-4xl mx-auto">
            <p className="text-xs text-zinc-400 uppercase tracking-wider mb-3 animate-fadeInUp">
              Action Items
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold text-zinc-900 tracking-tight mb-4 animate-fadeInUp stagger-1">
              {t('진행 필요 작업', 'Pending Tasks')}
            </h1>
            <p className="text-zinc-500 animate-fadeInUp stagger-2">
              {t('개발 외 진행이 필요한 작업 목록', 'Tasks that need to be done outside of development')}
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 px-6 border-b border-zinc-200 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-12">
              <div className="animate-fadeInUp stagger-2">
                <p className="text-xs text-zinc-400 uppercase tracking-wider mb-2">
                  {t('전체', 'Total')}
                </p>
                <p className="text-3xl font-light text-zinc-900">{pendingTasks.length}</p>
              </div>
              <div className="animate-fadeInUp stagger-3">
                <p className="text-xs text-zinc-400 uppercase tracking-wider mb-2">
                  {t('진행중', 'In Progress')}
                </p>
                <p className="text-3xl font-light text-amber-600">{pendingTasks.filter(t => t.status === 'in-progress').length}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Task List */}
        <section className="py-8 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-px bg-zinc-200">
              {pendingTasks.map((task, index) => (
                <div
                  key={task.id}
                  className="bg-white p-6 animate-fadeInUp"
                  style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                >
                  <div className="flex items-start justify-between gap-6 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium tracking-wide ${
                          task.priority === 'high'
                            ? 'bg-zinc-900 text-white'
                            : task.priority === 'medium'
                            ? 'bg-zinc-200 text-zinc-700'
                            : 'bg-zinc-100 text-zinc-500'
                        }`}>
                          {task.priority === 'high' ? t('높음', 'High') : task.priority === 'medium' ? t('중간', 'Medium') : t('낮음', 'Low')}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-1 text-xs font-medium tracking-wide ${
                          task.status === 'in-progress'
                            ? 'bg-amber-100 text-amber-700'
                            : task.status === 'done'
                            ? 'bg-emerald-100 text-emerald-700'
                            : task.status === 'scheduled'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-zinc-100 text-zinc-500'
                        }`}>
                          {task.status === 'in-progress' ? t('진행중', 'In Progress') : task.status === 'done' ? t('완료', 'Done') : task.status === 'scheduled' ? t('예정', 'Scheduled') : t('대기', 'Pending')}
                        </span>
                      </div>
                      <h3 className="text-base font-medium text-zinc-900 leading-snug">
                        {language === 'ko' ? task.titleKo : task.titleEn}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-500 leading-relaxed mb-4">
                    {language === 'ko' ? task.descriptionKo : task.descriptionEn}
                  </p>

                  {(task.memoKo || task.memoEn) && (
                    <div className="p-4 bg-zinc-50 border-l-2 border-zinc-300">
                      <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">
                        {t('메모', 'Note')}
                      </p>
                      <p className="text-sm text-zinc-600">
                        {language === 'ko' ? task.memoKo : task.memoEn}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {pendingTasks.length === 0 && (
              <div className="text-center py-20 animate-fadeIn">
                <p className="text-zinc-400">
                  {t('진행 필요한 작업이 없습니다', 'No pending tasks')}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </AuthWrapper>
  );
}
