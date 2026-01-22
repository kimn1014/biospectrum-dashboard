'use client';

import { useState, useEffect } from 'react';
import AuthWrapper from '@/components/AuthWrapper';
import { useLanguage } from '@/context/LanguageContext';
import TaskCardEditable from '@/components/TaskCardEditable';
import TaskModal from '@/components/TaskModal';
import StatusFilter from '@/components/StatusFilter';
import { Status } from '@/components/StatusBadge';
import { Task, TaskInsert, getTasks, createTask, updateTask, deleteTask } from '@/lib/supabase';

export default function BackendPage() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<Status | 'all'>('all');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setIsLoading(true);
    const data = await getTasks('backend');
    setTasks(data);
    setIsLoading(false);
  };

  const handleSave = async (taskData: TaskInsert) => {
    if (editingTask) {
      const updated = await updateTask(editingTask.id, taskData);
      if (updated) {
        setTasks(tasks.map(t => t.id === updated.id ? updated : t));
      }
    } else {
      const maxOrder = tasks.length > 0 ? Math.max(...tasks.map(t => t.sort_order)) : 0;
      const created = await createTask({ ...taskData, sort_order: maxOrder + 1 });
      if (created) {
        setTasks([...tasks, created]);
      }
    }
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const success = await deleteTask(id);
    if (success) {
      setTasks(tasks.filter(t => t.id !== id));
    }
  };

  const handleAddNew = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const statusOrder: Record<string, number> = {
    'pending': 0,
    'completed': 1,
    'in-progress': 2,
  };

  const sortedTasks = [...tasks].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);

  const filteredTasks = activeFilter === 'all'
    ? sortedTasks
    : sortedTasks.filter(task => task.status === activeFilter);

  const counts = {
    all: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    'in-progress': tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
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
            <div className="flex items-center justify-between mb-8 animate-fadeInUp stagger-3">
              <StatusFilter
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
                counts={counts}
              />
              <button
                onClick={handleAddNew}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white text-sm font-medium hover:bg-zinc-800 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                {t('작업 추가', 'Add Task')}
              </button>
            </div>

            {isLoading ? (
              <div className="text-center py-20 animate-fadeIn">
                <p className="text-zinc-400">{t('로딩 중...', 'Loading...')}</p>
              </div>
            ) : (
              <div className="space-y-px bg-zinc-200">
                {filteredTasks.map((task, index) => (
                  <div
                    key={task.id}
                    className="animate-fadeInUp"
                    style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                  >
                    <TaskCardEditable
                      task={task}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  </div>
                ))}
              </div>
            )}

            {!isLoading && filteredTasks.length === 0 && (
              <div className="text-center py-20 animate-fadeIn">
                <p className="text-zinc-400">
                  {t('해당 상태의 작업이 없습니다', 'No tasks with this status')}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSave}
        task={editingTask}
        category="backend"
      />
    </AuthWrapper>
  );
}
