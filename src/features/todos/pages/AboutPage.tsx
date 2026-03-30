import { Link } from 'react-router-dom'
import Button from '@/components/ui/Button'

export default function AboutPage() {
  const features = [
    { title: 'Fully Typed', description: 'TypeScript for type safety' },
    { title: 'Redux Toolkit', description: 'Predictable state management' },
    { title: 'Lazy Loading', description: 'Code splitting with React.lazy' },
    { title: 'Dark Mode', description: 'Theme toggle support' },
    { title: 'Responsive', description: 'Mobile-first design' },
    { title: 'LocalStorage', description: 'Data persistence' },
  ]

  return (
    <section className="space-y-8">
      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">About This App</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">
          A production-ready Todo Application built with modern web technologies. This project demonstrates best practices
          in React development including feature-based architecture, state management with Redux Toolkit, and a clean
          component structure.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {features.map(feature => (
          <div
            key={feature.title}
            className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50"
          >
            <h3 className="font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Tech Stack */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Tech Stack</h3>
        <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <li>
            <strong>Framework:</strong> React 18 with TypeScript
          </li>
          <li>
            <strong>State Management:</strong> Redux Toolkit
          </li>
          <li>
            <strong>Routing:</strong> React Router DOM v6
          </li>
          <li>
            <strong>Styling:</strong> Tailwind CSS
          </li>
          <li>
            <strong>Build Tool:</strong> Vite
          </li>
          <li>
            <strong>Architecture:</strong> Feature-based folder structure
          </li>
        </ul>
      </div>

      {/* CTA */}
      <div className="text-center">
        <Link to="/">
          <Button variant="primary">Back to Todos</Button>
        </Link>
      </div>
    </section>
  )
}
