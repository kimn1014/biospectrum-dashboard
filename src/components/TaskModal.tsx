'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Task, TaskInsert } from '@/lib/supabase';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: TaskInsert) => void;
  task?: Task | null;
  category: 'frontend' | 'backend';
}

export default function TaskModal({ isOpen, onClose, onSave, task, category }: TaskModalProps) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<TaskInsert>({
    title_ko: '',
    title_en: '',
    status: 'pending',
    category: category,
    assignee: '',
    due_date: '',
    content_ko: [],
    content_en: [],
    memo_ko: '',
    memo_en: '',
    required_info_ko: [],
    required_info_en: [],
    sort_order: 0,
  });
  const [contentKoText, setContentKoText] = useState('');
  const [contentEnText, setContentEnText] = useState('');
  const [requiredInfoKoText, setRequiredInfoKoText] = useState('');
  const [requiredInfoEnText, setRequiredInfoEnText] = useState('');

  useEffect(() => {
    if (task) {
      setFormData({
        title_ko: task.title_ko,
        title_en: task.title_en,
        status: task.status,
        category: task.category,
        assignee: task.assignee || '',
        due_date: task.due_date || '',
        content_ko: task.content_ko || [],
        content_en: task.content_en || [],
        memo_ko: task.memo_ko || '',
        memo_en: task.memo_en || '',
        required_info_ko: task.required_info_ko || [],
        required_info_en: task.required_info_en || [],
        sort_order: task.sort_order,
      });
      setContentKoText(task.content_ko?.join('\n') || '');
      setContentEnText(task.content_en?.join('\n') || '');
      setRequiredInfoKoText(task.required_info_ko?.join('\n') || '');
      setRequiredInfoEnText(task.required_info_en?.join('\n') || '');
    } else {
      setFormData({
        title_ko: '',
        title_en: '',
        status: 'pending',
        category: category,
        assignee: '',
        due_date: '',
        content_ko: [],
        content_en: [],
        memo_ko: '',
        memo_en: '',
        required_info_ko: [],
        required_info_en: [],
        sort_order: 0,
      });
      setContentKoText('');
      setContentEnText('');
      setRequiredInfoKoText('');
      setRequiredInfoEnText('');
    }
  }, [task, category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const taskData: TaskInsert = {
      ...formData,
      content_ko: contentKoText ? contentKoText.split('\n').filter(s => s.trim()) : [],
      content_en: contentEnText ? contentEnText.split('\n').filter(s => s.trim()) : [],
      required_info_ko: requiredInfoKoText ? requiredInfoKoText.split('\n').filter(s => s.trim()) : [],
      required_info_en: requiredInfoEnText ? requiredInfoEnText.split('\n').filter(s => s.trim()) : [],
    };

    onSave(taskData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4 animate-scaleIn">
        <div className="sticky top-0 bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-medium text-zinc-900">
            {task ? t('작업 수정', 'Edit Task') : t('새 작업 추가', 'Add New Task')}
          </h2>
          <button onClick={onClose} className="p-2 text-zinc-400 hover:text-zinc-900 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">
                {t('제목 (한국어)', 'Title (Korean)')} *
              </label>
              <input
                type="text"
                value={formData.title_ko}
                onChange={(e) => setFormData({ ...formData, title_ko: e.target.value })}
                className="w-full px-4 py-3 border border-zinc-200 text-sm focus:outline-none focus:border-zinc-900 transition-colors"
                required
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">
                {t('제목 (영어)', 'Title (English)')} *
              </label>
              <input
                type="text"
                value={formData.title_en}
                onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
                className="w-full px-4 py-3 border border-zinc-200 text-sm focus:outline-none focus:border-zinc-900 transition-colors"
                required
              />
            </div>
          </div>

          {/* Status & Assignee */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">
                {t('상태', 'Status')} *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as Task['status'] })}
                className="w-full px-4 py-3 border border-zinc-200 text-sm focus:outline-none focus:border-zinc-900 transition-colors bg-white"
              >
                <option value="pending">{t('예정', 'Pending')}</option>
                <option value="in-progress">{t('진행중', 'In Progress')}</option>
                <option value="completed">{t('완료', 'Completed')}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">
                {t('담당자', 'Assignee')}
              </label>
              <input
                type="text"
                value={formData.assignee}
                onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                className="w-full px-4 py-3 border border-zinc-200 text-sm focus:outline-none focus:border-zinc-900 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">
                {t('마감일', 'Due Date')}
              </label>
              <input
                type="text"
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                placeholder="예: 1월 23일"
                className="w-full px-4 py-3 border border-zinc-200 text-sm focus:outline-none focus:border-zinc-900 transition-colors"
              />
            </div>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">
                {t('작업 내용 (한국어)', 'Content (Korean)')}
                <span className="text-zinc-300 normal-case ml-1">{t('줄바꿈으로 구분', 'Separate by new line')}</span>
              </label>
              <textarea
                value={contentKoText}
                onChange={(e) => setContentKoText(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-zinc-200 text-sm focus:outline-none focus:border-zinc-900 transition-colors resize-none"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">
                {t('작업 내용 (영어)', 'Content (English)')}
              </label>
              <textarea
                value={contentEnText}
                onChange={(e) => setContentEnText(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-zinc-200 text-sm focus:outline-none focus:border-zinc-900 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Required Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">
                {t('필요 정보 (한국어)', 'Required Info (Korean)')}
              </label>
              <textarea
                value={requiredInfoKoText}
                onChange={(e) => setRequiredInfoKoText(e.target.value)}
                rows={2}
                className="w-full px-4 py-3 border border-zinc-200 text-sm focus:outline-none focus:border-zinc-900 transition-colors resize-none"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">
                {t('필요 정보 (영어)', 'Required Info (English)')}
              </label>
              <textarea
                value={requiredInfoEnText}
                onChange={(e) => setRequiredInfoEnText(e.target.value)}
                rows={2}
                className="w-full px-4 py-3 border border-zinc-200 text-sm focus:outline-none focus:border-zinc-900 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Memo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">
                {t('메모 (한국어)', 'Memo (Korean)')}
              </label>
              <textarea
                value={formData.memo_ko}
                onChange={(e) => setFormData({ ...formData, memo_ko: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-zinc-200 text-sm focus:outline-none focus:border-zinc-900 transition-colors resize-none"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-400 uppercase tracking-wider mb-2">
                {t('메모 (영어)', 'Memo (English)')}
              </label>
              <textarea
                value={formData.memo_en}
                onChange={(e) => setFormData({ ...formData, memo_en: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 border border-zinc-200 text-sm focus:outline-none focus:border-zinc-900 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              {t('취소', 'Cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors"
            >
              {task ? t('수정', 'Update') : t('추가', 'Add')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
