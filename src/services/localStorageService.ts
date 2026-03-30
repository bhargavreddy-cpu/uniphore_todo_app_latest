import type { Todo } from '@/features/todos/types'

const STORAGE_KEY = 'todo_app_v1'

export const loadTodos = (): Todo[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    const todos = stored ? JSON.parse(stored) : []
    // Migration: add status and completedAt fields to existing todos
    return todos.map((todo: any) => ({
      ...todo,
      status: todo.status || (todo.completed ? 'done' : 'todo'),
      completedAt: todo.completedAt || (todo.completed ? todo.createdAt : undefined)
    }))
  } catch (error) {
    console.error('Failed to load todos from localStorage:', error)
    return []
  }
}

export const persistTodos = (todos: Todo[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  } catch (error) {
    console.error('Failed to persist todos to localStorage:', error)
  }
}
