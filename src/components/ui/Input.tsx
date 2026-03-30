import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className = '', ...props }: Props) {
  const baseStyles =
    'w-full px-3 py-2 border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:border-slate-600 dark:text-white dark:placeholder:text-slate-500 transition-colors duration-200'

  return <input className={`${baseStyles} ${className}`} {...props} />
}
