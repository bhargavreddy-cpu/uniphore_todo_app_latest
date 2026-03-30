import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import MainLayout from '@/layouts/MainLayout'
import RouteErrorBoundary from './RouteErrorBoundary'
import Loader from '@/components/ui/Loader'

const TodoPage = lazy(() => import('@/features/todos/pages/TodoPage'))
const AboutPage = lazy(() => import('@/features/todos/pages/AboutPage'))

export default function AppRoutes() {
  const location = useLocation()

  return (
    <MainLayout>
      <RouteErrorBoundary>
        <Suspense fallback={<Loader message="Loading route..." />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <TodoPage />
                </motion.div>
              } />
              <Route path="/about" element={
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <AboutPage />
                </motion.div>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </RouteErrorBoundary>
    </MainLayout>
  )
}
