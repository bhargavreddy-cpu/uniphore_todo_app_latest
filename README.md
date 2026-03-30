# React Todo App - TypeScript + Redux + Tailwind

A production-ready todo application showcasing best practices in React development.

## 🎯 Features

- ✅ **Add, Edit, Delete Todos** - Full CRUD operations
- ✅ **Smart Filtering** - View All, Active, or Completed todos
- ✅ **Dark Mode** - Theme toggle with localStorage persistence
- ✅ **Responsive Design** - Mobile-first Tailwind CSS
- ✅ **Data Persistence** - localStorage integration
- ✅ **Type Safe** - 100% TypeScript
- ✅ **Code Splitting** - Lazy-loaded routes
- ✅ **Error Boundaries** - Route-level error handling
- ✅ **Redux Toolkit** - Predictable state management
- ✅ **Accessible** - ARIA roles and semantic HTML

## 📁 Project Structure

```
src/
├── app/                    # Redux store & hooks
│   ├── store.ts           # Redux store configuration
│   └── hooks.ts           # useAppDispatch, useAppSelector
├── routes/                 # Routing configuration
│   ├── AppRoutes.tsx      # Route definitions with code splitting
│   └── RouteErrorBoundary.tsx
├── features/
│   └── todos/
│       ├── components/    # Feature components
│       │   ├── TodoItem.tsx
│       │   └── FilterTabs.tsx
│       ├── pages/         # Feature pages
│       │   ├── TodoPage.tsx
│       │   └── AboutPage.tsx
│       ├── types.ts       # Feature types
│       ├── todosSlice.ts  # Redux slice
│       └── hooks.ts       # Feature hooks
├── components/            # Reusable UI components
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Checkbox.tsx
│       ├── Modal.tsx
│       ├── EmptyState.tsx
│       └── Loader.tsx
├── layouts/               # Layout components
│   └── MainLayout.tsx
├── services/              # API & storage services
│   └── localStorageService.ts
├── constants/             # App constants
│   └── index.ts
├── styles/                # Global styles
│   └── index.css
└── main.tsx               # App entry point
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 🏗️ Architecture Highlights

### Feature-Based Structure
Code is organized by features, not by technical layers. This improves scalability and maintainability.

### Redux Toolkit
Uses Redux Toolkit's `createSlice` for simplified reducer creation and built-in immer support.

### Custom Hooks
- `useTodos()` - Feature-specific hook combining Redux calls with business logic
- `useAppDispatch()` - Typed dispatch hook
- `useAppSelector()` - Typed selector hook

### Components
- All UI components are fully typed with TypeScript
- Components use Tailwind CSS with no external UI libraries
- Memoized components to prevent unnecessary re-renders

### Routing
- Lazy-loaded routes using `React.lazy()` with `Suspense`
- Route-level error boundary
- Automatic redirects to home for 404s

## 💾 Data Persistence

Todos are automatically saved to localStorage (`todo_app_v1` key) on every action:
- Add todo
- Update todo
- Delete todo
- Toggle completion
- Clear completed

The app loads saved todos on startup.

## 🌙 Dark Mode

Theme preference is stored in localStorage and persists across sessions. Toggle with the theme button in the header.

## 🎨 Styling

- **Framework**: Tailwind CSS 3.4+
- **Dark Mode**: Class-based with automatic detection
- **Responsive**: Mobile-first approach
- **Transitions**: Smooth animations using Tailwind utilities

## 📦 Key Dependencies

- **react**: 18.3.0
- **react-dom**: 18.3.0
- **react-router-dom**: 6.20.0
- **@reduxjs/toolkit**: 1.9.7
- **react-redux**: 8.1.3
- **tailwindcss**: 3.4.1
- **vite**: 5.0.8
- **typescript**: 5.3.3

## 🔧 Configuration Files

- **vite.config.ts** - Vite bundler config with path aliases
- **tsconfig.json** - TypeScript configuration
- **tailwind.config.ts** - Tailwind CSS theme config
- **postcss.config.js** - PostCSS plugins

## ✨ Code Quality Features

- Strict TypeScript (`strict: true`)
- No unused variables warning
- Proper error handling
- Accessible components (ARIA roles)
- Semantic HTML
- ESM modules

## 🎯 Next Steps (Optional Enhancements)

- Add unit tests (Vitest + React Testing Library)
- Add E2E tests (Cypress/Playwright)
- Implement categories/tags
- Add due dates
- Implement undo/redo
- Add keyboard shortcuts (more than just Enter)
- Backend API integration
- Real-time sync

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Feel free to fork and create pull requests.
