'use client';

import { useState, useEffect } from 'react';
import AuthWrapper from '@/components/AuthWrapper';
import { useLanguage } from '@/context/LanguageContext';
import Link from 'next/link';
import { getTasks, Task, getResources, Resource } from '@/lib/supabase';

export default function Home() {
  const { t } = useLanguage();
  const [frontendTasks, setFrontendTasks] = useState<Task[]>([]);
  const [backendTasks, setBackendTasks] = useState<Task[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [frontend, backend, resourceList] = await Promise.all([
        getTasks('frontend'),
        getTasks('backend'),
        getResources(),
      ]);
      setFrontendTasks(frontend);
      setBackendTasks(backend);
      setResources(resourceList);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const frontendStats = {
    total: frontendTasks.length,
    completed: frontendTasks.filter(t => t.status === 'completed').length,
    inProgress: frontendTasks.filter(t => t.status === 'in-progress').length,
  };

  const backendStats = {
    total: backendTasks.length,
    completed: backendTasks.filter(t => t.status === 'completed').length,
    inProgress: backendTasks.filter(t => t.status === 'in-progress').length,
  };

  const pendingCount = frontendTasks.filter(t => t.status === 'pending').length +
    backendTasks.filter(t => t.status === 'pending').length;

  return (
    <AuthWrapper>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm text-zinc-400 mb-4 animate-fadeInUp">
              Shopify Renewal Project
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-zinc-900 tracking-tight leading-[1.1] mb-6 animate-fadeInUp stagger-1">
              Biospectrum<br />
              <span className="text-zinc-400">Dashboard</span>
            </h1>
            <p className="text-lg text-zinc-500 max-w-xl animate-fadeInUp stagger-2">
              {t(
                '프로젝트 진행 현황을 대시보드에서 확인하실 수 있습니다.',
                'You can check the project progress on the dashboard.'
              )}
            </p>
          </div>
        </section>

        {/* Navigation Cards */}
        <section className="py-16 px-6 border-t border-zinc-200">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-200">
              {/* Frontend */}
              <Link
                href="/frontend"
                className="group bg-white p-8 md:p-12 hover:bg-zinc-50 transition-colors duration-300 animate-fadeInUp stagger-3"
              >
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-wider mb-2">01</p>
                    <h3 className="text-2xl font-medium text-zinc-900">
                      {t('프론트엔드', 'Frontend')}
                    </h3>
                  </div>
                  <svg className="w-5 h-5 text-zinc-300 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
                <div className="flex items-end gap-8">
                  <div>
                    <p className="text-4xl font-light text-zinc-900">
                      {isLoading ? '-' : frontendStats.completed}
                    </p>
                    <p className="text-sm text-zinc-400">{t('완료', 'done')}</p>
                  </div>
                  <div>
                    <p className="text-4xl font-light text-zinc-400">
                      {isLoading ? '-' : frontendStats.inProgress}
                    </p>
                    <p className="text-sm text-zinc-400">{t('진행중', 'active')}</p>
                  </div>
                </div>
              </Link>

              {/* Backend */}
              <Link
                href="/backend"
                className="group bg-white p-8 md:p-12 hover:bg-zinc-50 transition-colors duration-300 animate-fadeInUp stagger-4"
              >
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-wider mb-2">02</p>
                    <h3 className="text-2xl font-medium text-zinc-900">
                      {t('백엔드', 'Backend')}
                    </h3>
                  </div>
                  <svg className="w-5 h-5 text-zinc-300 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
                <div className="flex items-end gap-8">
                  <div>
                    <p className="text-4xl font-light text-zinc-900">
                      {isLoading ? '-' : backendStats.completed}
                    </p>
                    <p className="text-sm text-zinc-400">{t('완료', 'done')}</p>
                  </div>
                  <div>
                    <p className="text-4xl font-light text-zinc-400">
                      {isLoading ? '-' : backendStats.inProgress}
                    </p>
                    <p className="text-sm text-zinc-400">{t('진행중', 'active')}</p>
                  </div>
                </div>
              </Link>

              {/* Tasks */}
              <Link
                href="/tasks"
                className="group bg-white p-8 md:p-12 hover:bg-zinc-50 transition-colors duration-300 animate-fadeInUp stagger-5"
              >
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-wider mb-2">03</p>
                    <h3 className="text-2xl font-medium text-zinc-900">
                      {t('진행 필요 작업', 'Pending Tasks')}
                    </h3>
                  </div>
                  <svg className="w-5 h-5 text-zinc-300 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
                <div>
                  <p className="text-4xl font-light text-zinc-900">
                    {isLoading ? '-' : pendingCount}
                  </p>
                  <p className="text-sm text-zinc-400">{t('작업 대기중', 'tasks pending')}</p>
                </div>
              </Link>

              {/* Guide */}
              <Link
                href="/guide"
                className="group bg-white p-8 md:p-12 hover:bg-zinc-50 transition-colors duration-300 animate-fadeInUp stagger-6"
              >
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-wider mb-2">04</p>
                    <h3 className="text-2xl font-medium text-zinc-900">
                      {t('어드민 가이드', 'Admin Guide')}
                    </h3>
                  </div>
                  <svg className="w-5 h-5 text-zinc-300 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
                <div>
                  <p className="text-4xl font-light text-zinc-900">3</p>
                  <p className="text-sm text-zinc-400">{t('가이드 문서', 'guide documents')}</p>
                </div>
              </Link>

              {/* Resources */}
              <Link
                href="/resources"
                className="group bg-white p-8 md:p-12 hover:bg-zinc-50 transition-colors duration-300 animate-fadeInUp stagger-6"
              >
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-wider mb-2">05</p>
                    <h3 className="text-2xl font-medium text-zinc-900">
                      {t('자료실', 'Resources')}
                    </h3>
                  </div>
                  <svg className="w-5 h-5 text-zinc-300 group-hover:text-zinc-900 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </div>
                <div>
                  <p className="text-4xl font-light text-zinc-900">
                    {isLoading ? '-' : resources.length}
                  </p>
                  <p className="text-sm text-zinc-400">{t('등록된 자료', 'resources')}</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-zinc-200">
          <div className="max-w-6xl mx-auto flex items-center justify-between text-sm text-zinc-400">
            <span>Biospectrum Dashboard</span>
            <span>2024</span>
          </div>
        </footer>
      </div>
    </AuthWrapper>
  );
}
