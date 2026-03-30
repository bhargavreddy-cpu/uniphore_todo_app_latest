import { memo, useState } from 'react'
import { motion } from 'framer-motion'
import Checkbox from '@/components/ui/Checkbox'
import Button from '@/components/ui/Button'
import { Todo } from '../types'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (todo: Todo) => void
  onSetStatus: (id: string, status: Todo['status']) => void
}

function TodoItem({ todo, onToggle, onDelete, onUpdate, onSetStatus }: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)

  const handleSave = () => {
    const trimmed = editTitle.trim()
    if (trimmed && trimmed !== todo.title) {
      onUpdate({ ...todo, title: trimmed })
    }
    setIsEditing(false)
    setEditTitle(todo.title)
  }

  const handleCancel = () => {
    setEditTitle(todo.title)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') handleCancel()
  }

  const isOverdue = todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed
  const isDueToday = todo.dueDate && new Date(todo.dueDate).toDateString() === new Date().toDateString()

  const priorityColors = {
    high: 'text-red-600 dark:text-red-400',
    medium: 'text-yellow-600 dark:text-yellow-400',
    low: 'text-green-600 dark:text-green-400'
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      variants={itemVariants}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`group flex items-center gap-3 rounded-lg border p-4 shadow-sm transition-all hover:border-blue-300 dark:bg-slate-800 dark:hover:border-blue-500 ${
        isOverdue ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/20' : 'border-slate-200 bg-white dark:border-slate-700'
      }`}
      role="article"
    >
      <Checkbox
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Toggle ${todo.title} complete`}
      />

      <select
        value={todo.status}
        onChange={(e) => onSetStatus(todo.id, e.target.value as Todo['status'])}
        className="rounded-md border border-slate-300 px-2 py-1 text-xs dark:border-slate-600 dark:bg-slate-700"
        aria-label={`Set status for ${todo.title}`}
      >
        <option value="todo">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      <div className="flex flex-1 items-center gap-3">
        {isEditing ? (
          <>
            <input
              type="text"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              className="flex-1 rounded-md border border-slate-300 px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-700"
              aria-label="Edit todo title"
            />
            <Button onClick={handleSave} variant="primary" size="sm">
              Save
            </Button>
            <Button onClick={handleCancel} variant="ghost" size="sm">
              Cancel
            </Button>
          </>
        ) : (
          <>
            <div className="flex-1">
              <span
                className={`block text-sm transition-all ${
                  todo.completed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-900 dark:text-white'
                }`}
              >
                {todo.title}
              </span>
              <div className="mt-1 flex flex-wrap gap-2 text-xs text-slate-500 dark:text-slate-400">
                {todo.priority && (
                  <span className={priorityColors[todo.priority]}>
                    {todo.priority.toUpperCase()}
                  </span>
                )}
                <span>
                  Created: {new Date(todo.createdAt).toLocaleDateString()}
                </span>
                {todo.dueDate && (
                  <span className={isOverdue ? 'text-red-600 dark:text-red-400' : isDueToday ? 'text-blue-600 dark:text-blue-400' : ''}>
                    Due: {new Date(todo.dueDate).toLocaleDateString()}
                  </span>
                )}
                {todo.estimatedTime && (
                  <span>
                    Est: {todo.estimatedTime} days
                  </span>
                )}
                {todo.completedAt && (
                  <span className="text-green-600 dark:text-green-400">
                    ✓ {new Date(todo.completedAt).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              <Button onClick={() => setIsEditing(true)} variant="ghost" size="sm">
                Edit
              </Button>
              <Button onClick={() => onDelete(todo.id)} variant="danger" size="sm">
                Delete
              </Button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  )
}

export default memo(TodoItem)
