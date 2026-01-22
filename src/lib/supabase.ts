import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Task {
  id: string;
  title_ko: string;
  title_en: string;
  status: 'pending' | 'in-progress' | 'completed';
  category: 'frontend' | 'backend';
  assignee?: string;
  due_date?: string;
  content_ko?: string[];
  content_en?: string[];
  memo_ko?: string;
  memo_en?: string;
  required_info_ko?: string[];
  required_info_en?: string[];
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type TaskInsert = Omit<Task, 'id' | 'created_at' | 'updated_at'>;
export type TaskUpdate = Partial<TaskInsert>;

// Fetch all tasks by category
export async function getTasks(category: 'frontend' | 'backend'): Promise<Task[]> {
  const { data, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('category', category)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }

  return data || [];
}

// Create a new task
export async function createTask(task: TaskInsert): Promise<Task | null> {
  const { data, error } = await supabase
    .from('tasks')
    .insert([task])
    .select()
    .single();

  if (error) {
    console.error('Error creating task:', error);
    return null;
  }

  return data;
}

// Update a task
export async function updateTask(id: string, updates: TaskUpdate): Promise<Task | null> {
  const { data, error } = await supabase
    .from('tasks')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating task:', error);
    return null;
  }

  return data;
}

// Delete a task
export async function deleteTask(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting task:', error);
    return false;
  }

  return true;
}
