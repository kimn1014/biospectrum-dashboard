'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Resource } from '@/lib/supabase';

interface ResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { title: string; url: string; sort_order: number }) => void;
  resource?: Resource | null;
  nextSortOrder: number;
}

export default function ResourceModal({ isOpen, onClose, onSave, resource, nextSortOrder }: ResourceModalProps) {
  const { t } = useLanguage();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [sortOrder, setSortOrder] = useState(nextSortOrder);

  useEffect(() => {
    if (resource) {
      setTitle(resource.title);
      setUrl(resource.url);
      setSortOrder(resource.sort_order);
    } else {
      setTitle('');
      setUrl('');
      setSortOrder(nextSortOrder);
    }
  }, [resource, nextSortOrder]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !url.trim()) {
      alert(t('제목과 URL을 입력해주세요.', 'Please enter title and URL.'));
      return;
    }

    onSave({
      title: title.trim(),
      url: url.trim(),
      sort_order: sortOrder,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-zinc-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-medium text-zinc-900">
              {resource ? t('자료 수정', 'Edit Resource') : t('자료 추가', 'Add Resource')}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              {t('제목', 'Title')} *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 border border-zinc-200 focus:border-zinc-400 focus:outline-none transition-colors"
              placeholder={t('자료 제목을 입력하세요', 'Enter resource title')}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              URL *
            </label>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-4 py-2.5 border border-zinc-200 focus:border-zinc-400 focus:outline-none transition-colors"
              placeholder="https://..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2">
              {t('정렬 순서', 'Sort Order')}
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2.5 border border-zinc-200 focus:border-zinc-400 focus:outline-none transition-colors"
              min="0"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-zinc-200 text-zinc-600 hover:bg-zinc-50 transition-colors"
            >
              {t('취소', 'Cancel')}
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-zinc-900 text-white hover:bg-zinc-800 transition-colors"
            >
              {t('저장', 'Save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
