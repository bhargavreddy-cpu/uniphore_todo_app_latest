import { FormEvent, useState } from 'react'
import { motion } from 'framer-motion'
import { useTodos } from '../hooks'
import TodoItem from '../components/TodoItem'
import FilterTabs from '../components/FilterTabs'
import DateRangePicker from '../components/DateRangePicker'
import EmptyState from '@/components/ui/EmptyState'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function TodoPage() {
  const [newTodoTitle, setNewTodoTitle] = useState('')
  const [newTodoCreatedDate, setNewTodoCreatedDate] = useState('')
  const [newTodoDueDate, setNewTodoDueDate] = useState('')
  const [newTodoEstimatedTime, setNewTodoEstimatedTime] = useState('')
  const [newTodoPriority, setNewTodoPriority] = useState<'low' | 'medium' | 'high'>('medium')
  const { filtered, items, remaining, filter, dateRange, addTodo, toggleTodo, deleteTodo, updateTodo, setTodoStatus, setFilter, setDateRange, clearCompleted, overdueCount, totalEstimatedTime } =
    useTodos()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const title = newTodoTitle.trim()
    if (!title) return

    addTodo({
      title,
      completed: false,
      createdAt: newTodoCreatedDate || new Date().toISOString(),
      dueDate: newTodoDueDate || undefined,
      estimatedTime: newTodoEstimatedTime ? parseInt(newTodoEstimatedTime) : undefined,
      priority: newTodoPriority,
    })
    setNewTodoTitle('')
    setNewTodoCreatedDate('')
    setNewTodoDueDate('')
    setNewTodoEstimatedTime('')
    setNewTodoPriority('medium')
  }

  const setTodayAsCreatedDate = () => {
    const today = new Date().toISOString().split('T')[0] // Get YYYY-MM-DD format
    setNewTodoCreatedDate(today)
  }

  const hasCompleted = items.length > 0 && items.some(todo => todo.completed)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <section className="space-y-6">
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="What needs to be done?"
            value={newTodoTitle}
            onChange={e => setNewTodoTitle(e.target.value)}
            aria-label="Add a new todo"
            className="flex-1"
          />
          <Button type="submit" disabled={!newTodoTitle.trim()}>
            Add
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Created Date</label>
            <div className="mt-1 flex gap-1">
              <Input
                type="date"
                value={newTodoCreatedDate}
                onChange={e => setNewTodoCreatedDate(e.target.value)}
                className="flex-1"
              />
              <Button
                type="button"
                onClick={setTodayAsCreatedDate}
                variant="secondary"
                size="sm"
                className="px-2 ml-1"
              >
                Today
              </Button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 ml-5">Due Date</label>
            <Input
              type="date"
              value={newTodoDueDate}
              onChange={e => setNewTodoDueDate(e.target.value)}
              className="mt-1 ml-5"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Estimated Time (days)</label>
            <Input
              type="number"
              placeholder="1"
              value={newTodoEstimatedTime}
              onChange={e => setNewTodoEstimatedTime(e.target.value)}
              className="mt-1 ml-2"
              min="1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Priority</label>
            <select
              value={newTodoPriority}
              onChange={e => setNewTodoPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-700"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </form>

      {/* Filter & Stats */}
      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <FilterTabs active={filter} onChange={setFilter} />
          <div className="text-sm text-slate-600 dark:text-slate-400">
            {remaining > 0 ? (
              <div className="space-y-1">
                <div>
                  <strong>{remaining}</strong> of <strong>{items.length}</strong> remaining
                </div>
                {overdueCount > 0 && (
                  <div className="text-red-600 dark:text-red-400">
                    <strong>{overdueCount}</strong> overdue
                  </div>
                )}
                {totalEstimatedTime > 0 && (
                  <div>
                    Est. time: <strong>{totalEstimatedTime} days</strong>
                  </div>
                )}
              </div>
            ) : (
              <span>All done! {items.length > 0 ? '🎉' : ''}</span>
            )}
          </div>
        </div>
        <DateRangePicker dateRange={dateRange} onChange={setDateRange} />
        
        {/* Date Range Stats */}
        {dateRange && (
          <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
            <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100">Date Range Summary</h3>
            <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-blue-700 dark:text-blue-300">Tasks in range:</span>
                <span className="ml-2 font-medium">{filtered.length}</span>
              </div>
              <div>
                <span className="text-blue-700 dark:text-blue-300">Completed:</span>
                <span className="ml-2 font-medium">
                  {filtered.filter(todo => todo.completed).length}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Todo List */}
      {items.length === 0 ? (
        <EmptyState title="No todos yet" subtitle="Add a new todo to get started" icon="🚀" />
      ) : (
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <EmptyState
              title={`No ${filter} todos`}
              subtitle={`Try changing the filter or adding a new todo`}
              icon="🔍"
            />
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              {filtered.map(todo => (
                <div key={todo.id} className="group">
                  <TodoItem
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    onUpdate={updateTodo}
                    onSetStatus={setTodoStatus}
                  />
                </div>
              ))}
            </motion.div>
          )}
        </div>
      )}

      {/* Clear Completed Button */}
      {hasCompleted && (
        <div className="flex justify-end pt-2">
          <Button onClick={clearCompleted} variant="secondary" size="sm">
            Clear {items.filter(t => t.completed).length} completed
          </Button>
        </div>
      )}
    </section>
  )
}
