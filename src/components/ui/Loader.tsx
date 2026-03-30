import { motion } from 'framer-motion'

interface Props {
  message?: string
}

export default function Loader({ message = 'Loading...' }: Props) {
  return (
    <div className="flex min-h-96 flex-col items-center justify-center gap-3 p-6">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="h-8 w-8 rounded-full border-4 border-slate-300 border-t-blue-600 dark:border-slate-600 dark:border-t-blue-500"
      />
      <p className="text-sm text-slate-600 dark:text-slate-400">{message}</p>
    </div>
  )
}
