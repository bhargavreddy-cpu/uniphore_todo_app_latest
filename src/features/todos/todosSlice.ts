import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Todo, TodosState, TodoFilter, DateRange } from './types'
import { loadTodos, persistTodos } from '@/services/localStorageService'

const initialState: TodosState = {
  items: loadTodos(),
  filter: 'all',
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<Omit<Todo, 'id' | 'status'>>) {
      const { createdAt, ...todoData } = action.payload
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        createdAt: createdAt || new Date().toISOString(),
        status: 'todo',
        ...todoData,
      }
      state.items.push(newTodo)
      persistTodos(state.items)
    },

    updateTodo(state, action: PayloadAction<Todo>) {
      const index = state.items.findIndex(todo => todo.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
        persistTodos(state.items)
      }
    },

    deleteTodo(state, action: PayloadAction<string>) {
      state.items = state.items.filter(todo => todo.id !== action.payload)
      persistTodos(state.items)
    },

    toggleTodo(state, action: PayloadAction<string>) {
      const todo = state.items.find(item => item.id === action.payload)
      if (todo) {
        const wasCompleted = todo.completed
        todo.completed = !todo.completed
        // Update status based on completed
        todo.status = todo.completed ? 'done' : 'todo'
        // Set completedAt when task becomes completed
        if (todo.completed && !wasCompleted) {
          todo.completedAt = new Date().toISOString()
        } else if (!todo.completed) {
          todo.completedAt = undefined
        }
        persistTodos(state.items)
      }
    },

    setTodoStatus(state, action: PayloadAction<{ id: string; status: Todo['status'] }>) {
      const todo = state.items.find(item => item.id === action.payload.id)
      if (todo) {
        const wasCompleted = todo.completed
        todo.status = action.payload.status
        // Update completed based on status
        todo.completed = action.payload.status === 'done'
        // Set completedAt when task becomes completed
        if (todo.completed && !wasCompleted) {
          todo.completedAt = new Date().toISOString()
        } else if (!todo.completed) {
          todo.completedAt = undefined
        }
        persistTodos(state.items)
      }
    },

    setFilter(state, action: PayloadAction<TodoFilter>) {
      state.filter = action.payload
    },

    setDateRange(state, action: PayloadAction<DateRange | undefined>) {
      state.dateRange = action.payload
    },

    clearCompleted(state) {
      state.items = state.items.filter(todo => !todo.completed)
      persistTodos(state.items)
    },
  },
})

export const { addTodo, updateTodo, deleteTodo, toggleTodo, setTodoStatus, setFilter, setDateRange, clearCompleted } = todosSlice.actions
export default todosSlice.reducer
