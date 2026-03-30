import { TodoFilter } from '../types'

interface Props {
  active: TodoFilter
  onChange: (filter: TodoFilter) => void
}

const filters: Array<{ value: TodoFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
  { value: 'today', label: 'Today' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'overdue', label: 'Overdue' },
  { value: 'completed', label: 'Completed' },
]

export default function FilterTabs({ active, onChange }: Props) {
  return (
    <div className="flex gap-2 rounded-lg bg-white p-2 shadow-sm dark:bg-slate-800">
      {filters.map(filter => (
        <button
          key={filter.value}
          onClick={() => onChange(filter.value)}
          type="button"
          className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
            active === filter.value
              ? 'bg-blue-600 text-white'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700'
          }`}
          aria-pressed={active === filter.value}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}
