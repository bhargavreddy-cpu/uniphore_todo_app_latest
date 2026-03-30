import { motion } from 'framer-motion'

interface Props {
  title?: string
  subtitle?: string
  icon?: string
}

export default function EmptyState({
  title = 'No todos yet',
  subtitle = 'Add a new todo to get started',
  icon = '📝',
}: Props) {
  return (
    <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-12 text-center dark:border-slate-600 dark:bg-slate-800/50">
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="text-4xl"
      >
        {icon}
      </motion.div>
      <h3 className="mt-3 text-lg font-semibold text-slate-700 dark:text-slate-300">{title}</h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>
    </div>
  )
}
