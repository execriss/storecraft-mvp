import { create } from 'zustand'

const getInitialTheme = () => {
  const stored = localStorage.getItem('storecraft-theme')
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const applyTheme = (theme) => {
  const root = document.documentElement
  root.classList.add('theme-transition')
  root.classList.toggle('dark', theme === 'dark')
  localStorage.setItem('storecraft-theme', theme)
  setTimeout(() => root.classList.remove('theme-transition'), 300)
}

// Aplicar tema inicial sin transicion
const initialTheme = getInitialTheme()
document.documentElement.classList.toggle('dark', initialTheme === 'dark')

const useThemeStore = create((set) => ({
  theme: initialTheme,

  toggleTheme: () =>
    set((state) => {
      const next = state.theme === 'dark' ? 'light' : 'dark'
      applyTheme(next)
      return { theme: next }
    }),

  setTheme: (theme) =>
    set(() => {
      applyTheme(theme)
      return { theme }
    }),
}))

export default useThemeStore
