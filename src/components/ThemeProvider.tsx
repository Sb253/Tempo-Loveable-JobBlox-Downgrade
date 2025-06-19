
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
  actualTheme: "dark" | "light"
}

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
  actualTheme: "light",
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "lovable-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    const root = window.document.documentElement
    const body = window.document.body

    root.classList.remove("light", "dark")
    body.classList.remove("light", "dark")

    root.classList.add(theme)
    body.classList.add(theme)

    if (theme === "dark") {
      root.style.backgroundColor = '#0f172a'
      root.style.color = '#f8fafc'
      body.style.backgroundColor = '#0f172a'
      body.style.color = '#f8fafc'
      body.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
      body.style.minHeight = '100vh'
    } else {
      root.style.backgroundColor = '#ffffff'
      root.style.color = '#0f172a'
      body.style.backgroundColor = '#ffffff'
      body.style.color = '#0f172a'
      body.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      body.style.minHeight = '100vh'
    }
  }, [theme])

  const value = {
    theme,
    actualTheme: theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
