import { ReactNode, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from '@/components/ui/Button'

interface Props {
  children: ReactNode
}

export default function MainLayout({ children }: Props) {
  const location = useLocation()
  const [isDark, setIsDark] = useState(() =>
    typeof localStorage !== 'undefined' ? localStorage.getItem('theme') === 'dark' : false,
  )

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  const toggleTheme = () => setIsDark(prev => !prev)

  const navigation = [
    { to: '/', label: 'Todos', icon: '✓' },
    { to: '/about', label: 'About', icon: 'ℹ' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white"> Uniphore Project Task App</h1>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Built AI Modules with your Intelligence and Creativity
              </p>
            </div>
            <Button onClick={toggleTheme} variant="secondary" size="sm">
              {isDark ? '☀️' : '🌙'}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="mt-6 flex gap-2 border-b border-slate-200 dark:border-slate-700">
            {navigation.map(item => (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
                  isActive(item.to)
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        {/* Main Content */}
        <main className="mb-8">{children}</main>

        {/* Footer */}
        <footer className="border-t border-slate-200 pt-6 dark:border-slate-700">
          <p className="text-center text-xs text-slate-500 dark:text-slate-400">
            Built with React, TypeScript, Redux Toolkit, Tailwind CSS & Vite
          </p>
        </footer>
      </div>
    </div>
  )
}
