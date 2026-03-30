import { InputHTMLAttributes } from 'react'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>

export default function Checkbox({ className = '', ...props }: Props) {
  const baseStyles =
    'w-4 h-4 border border-slate-300 rounded text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer transition-colors dark:border-slate-600 dark:bg-slate-800 dark:checked:bg-blue-600'

  return <input type="checkbox" className={`${baseStyles} ${className}`} {...props} />
}
