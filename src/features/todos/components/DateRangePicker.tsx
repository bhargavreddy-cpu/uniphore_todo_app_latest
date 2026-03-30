import { DateRange } from '../types'

interface DateRangePickerProps {
  dateRange?: DateRange
  onChange: (range: DateRange | undefined) => void
}

export default function DateRangePicker({ dateRange, onChange }: DateRangePickerProps) {
  const handleFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const from = e.target.value || undefined
    onChange({
      ...dateRange,
      from
    })
  }

  const handleToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const to = e.target.value || undefined
    onChange({
      ...dateRange,
      to
    })
  }

  const clearRange = () => {
    onChange(undefined)
  }

  return (
    <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-sm dark:bg-slate-800">
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">From:</label>
        <input
          type="date"
          value={dateRange?.from || ''}
          onChange={handleFromChange}
          className="rounded-md border border-slate-300 px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-700"
        />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">To:</label>
        <input
          type="date"
          value={dateRange?.to || ''}
          onChange={handleToChange}
          className="rounded-md border border-slate-300 px-2 py-1 text-sm dark:border-slate-600 dark:bg-slate-700"
        />
      </div>
      <button
        onClick={clearRange}
        className="rounded-md bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
      >
        Clear
      </button>
    </div>
  )
}