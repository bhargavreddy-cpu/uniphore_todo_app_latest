export interface Todo {
  id: string
  title: string
  description?: string
  completed: boolean
  status: 'todo' | 'in-progress' | 'done'
  createdAt: string
  completedAt?: string // ISO date string when task was completed
  dueDate?: string // ISO date string
  estimatedTime?: number // in days
  priority?: 'low' | 'medium' | 'high'
}

export type TodoFilter = 'all' | 'active' | 'completed' | 'today' | 'overdue' | 'upcoming' | 'todo' | 'in-progress' | 'done'

export interface DateRange {
  from?: string // ISO date string
  to?: string // ISO date string
}

export interface TodosState {
  items: Todo[]
  filter: TodoFilter
  dateRange?: DateRange
}
