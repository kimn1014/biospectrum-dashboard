'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import AuthWrapper from '@/components/AuthWrapper';
import ResourceModal from '@/components/ResourceModal';
import { Resource, getResources, createResource, updateResource, deleteResource } from '@/lib/supabase';
import Link from 'next/link';

export default function ResourcesPage() {
  const { t } = useLanguage();
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  const loadResources = async () => {
    const data = await getResources();
    setResources(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadResources();
  }, []);

  const handleSave = async (data: { title: string; url: string; sort_order: number }) => {
    if (editingResource) {
      const updated = await updateResource(editingResource.id, data);
      if (updated) {
        setResources(resources.map(r => r.id === updated.id ? updated : r));
      }
    } else {
      const created = await createResource(data);
      if (created) {
        setResources([...resources, created].sort((a, b) => a.sort_order - b.sort_order));
      }
    }
    setIsModalOpen(false);
    setEditingResource(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm(t('정말 삭제하시겠습니까?', 'Are you sure you want to delete this?'))) {
      const success = await deleteResource(id);
      if (success) {
        setResources(resources.filter(r => r.id !== id));
      }
    }
  };

  const handleEdit = (resource: Resource) => {
    setEditingResource(resource);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingResource(null);
    setIsModalOpen(true);
  };

  const nextSortOrder = resources.length > 0
    ? Math.max(...resources.map(r => r.sort_order)) + 1
    : 0;

  return (
    <AuthWrapper>
      <div className="min-h-screen">
        {/* Header */}
        <section className="pt-32 pb-12 px-6 border-b border-zinc-200">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-600 transition-colors mb-6"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {t('홈으로', 'Back to Home')}
            </Link>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-zinc-400 uppercase tracking-wider mb-2">Resources</p>
                <h1 className="text-3xl font-semibold text-zinc-900 tracking-tight">
                  {t('자료실', 'Resources')}
                </h1>
              </div>
              <button
                onClick={handleAdd}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {t('자료 추가', 'Add Resource')}
              </button>
            </div>
          </div>
        </section>

        {/* Resource List */}
        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            {isLoading ? (
              <div className="text-center py-12 text-zinc-400">
                {t('로딩 중...', 'Loading...')}
              </div>
            ) : resources.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-zinc-400 mb-4">{t('등록된 자료가 없습니다.', 'No resources found.')}</p>
                <button
                  onClick={handleAdd}
                  className="text-sm text-zinc-600 hover:text-zinc-900 underline"
                >
                  {t('첫 자료 추가하기', 'Add your first resource')}
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="group flex items-center justify-between p-4 bg-white border border-zinc-200 hover:border-zinc-300 transition-colors"
                  >
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center gap-3 min-w-0"
                    >
                      <svg className="w-4 h-4 text-zinc-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      <span className="text-zinc-900 font-medium truncate group-hover:text-zinc-600 transition-colors">
                        {resource.title}
                      </span>
                      <svg className="w-4 h-4 text-zinc-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    <div className="flex items-center gap-1 ml-4">
                      <button
                        onClick={() => handleEdit(resource)}
                        className="p-2 text-zinc-300 hover:text-zinc-600 transition-colors"
                        title={t('수정', 'Edit')}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(resource.id)}
                        className="p-2 text-zinc-300 hover:text-red-500 transition-colors"
                        title={t('삭제', 'Delete')}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-zinc-200">
          <div className="max-w-4xl mx-auto flex items-center justify-between text-sm text-zinc-400">
            <span>Biospectrum Dashboard</span>
            <span>2024</span>
          </div>
        </footer>
      </div>

      <ResourceModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingResource(null);
        }}
        onSave={handleSave}
        resource={editingResource}
        nextSortOrder={nextSortOrder}
      />
    </AuthWrapper>
  );
}
