import { useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Todo, TodoFilter, DateRange } from './types'
import { addTodo, updateTodo, deleteTodo, toggleTodo, setTodoStatus, setFilter, setDateRange, clearCompleted } from './todosSlice'

export const useTodos = () => {
  const dispatch = useAppDispatch()
  const { items, filter, dateRange } = useAppSelector(state => state.todos)

  const filtered = useMemo(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const todayStr = today.toISOString().split('T')[0]

    // Helper function to check if date is within range
    const isWithinDateRange = (dateStr?: string) => {
      if (!dateRange || !dateStr) return true
      const date = new Date(dateStr)
      const from = dateRange.from ? new Date(dateRange.from) : null
      const to = dateRange.to ? new Date(dateRange.to) : null
      
      if (from && to) {
        return date >= from && date <= to
      } else if (from) {
        return date >= from
      } else if (to) {
        return date <= to
      }
      return true
    }

    return items.filter(todo => {
      // Apply status/filter first
      let passesFilter = true
      if (filter === 'active') passesFilter = !todo.completed
      else if (filter === 'completed') passesFilter = todo.completed
      else if (filter === 'todo') passesFilter = todo.status === 'todo'
      else if (filter === 'in-progress') passesFilter = todo.status === 'in-progress'
      else if (filter === 'done') passesFilter = todo.status === 'done'
      else if (filter === 'today') {
        passesFilter = !!(todo.dueDate && todo.dueDate.split('T')[0] === todayStr && !todo.completed)
      }
      else if (filter === 'overdue') {
        passesFilter = !!(todo.dueDate && new Date(todo.dueDate) < today && !todo.completed)
      }
      else if (filter === 'upcoming') {
        passesFilter = !!(todo.dueDate && new Date(todo.dueDate) > today && !todo.completed)
      }

      // Apply date range filter
      let passesDateRange = true
      if (dateRange) {
        // For completed tasks, check completedAt; for others, check createdAt or dueDate
        if (todo.completed && todo.completedAt) {
          passesDateRange = isWithinDateRange(todo.completedAt)
        } else if (todo.dueDate) {
          passesDateRange = isWithinDateRange(todo.dueDate)
        } else {
          passesDateRange = isWithinDateRange(todo.createdAt)
        }
      }

      return passesFilter && passesDateRange
    }).sort((a, b) => {
      // Sort by priority first
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      const aPriority = priorityOrder[a.priority || 'low']
      const bPriority = priorityOrder[b.priority || 'low']
      if (aPriority !== bPriority) return bPriority - aPriority

      // Then by due date
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      }
      if (a.dueDate) return -1
      if (b.dueDate) return 1
      return 0
    })
  }, [items, filter, dateRange])

  const remaining = useMemo(() => items.filter(todo => !todo.completed).length, [items])
  const completedCount = useMemo(() => items.filter(todo => todo.completed).length, [items])
  const overdueCount = useMemo(() => {
    const today = new Date()
    return items.filter(todo => todo.dueDate && new Date(todo.dueDate) < today && !todo.completed).length
  }, [items])
  const totalEstimatedTime = useMemo(() => {
    return items.filter(todo => !todo.completed).reduce((sum, todo) => sum + (todo.estimatedTime || 0), 0)
  }, [items])

  return {
    items,
    filtered,
    filter,
    dateRange,
    remaining,
    completedCount,
    total: items.length,
    overdueCount,
    totalEstimatedTime,
    addTodo: (todo: Omit<Todo, 'id' | 'status'>) => dispatch(addTodo(todo)),
    updateTodo: (todo: Todo) => dispatch(updateTodo(todo)),
    deleteTodo: (id: string) => dispatch(deleteTodo(id)),
    toggleTodo: (id: string) => dispatch(toggleTodo(id)),
    setTodoStatus: (id: string, status: Todo['status']) => dispatch(setTodoStatus({ id, status })),
    setFilter: (filter: TodoFilter) => dispatch(setFilter(filter)),
    setDateRange: (range: DateRange | undefined) => dispatch(setDateRange(range)),
    clearCompleted: () => dispatch(clearCompleted()),
  }
}
