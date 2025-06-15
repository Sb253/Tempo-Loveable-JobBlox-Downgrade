
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

    // Remove any existing theme classes
    root.classList.remove("light", "dark")
    body.classList.remove("light", "dark")

    // Add the current theme class to both html and body
    root.classList.add(theme)
    body.classList.add(theme)

    // Set CSS custom properties for full page coverage
    if (theme === "dark") {
      root.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)')
      root.style.setProperty('--card-gradient', 'linear-gradient(135deg, #1e293b 0%, #334155 100%)')
      body.style.backgroundColor = '#0f172a'
      body.style.color = '#f8fafc'
    } else {
      root.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)')
      root.style.setProperty('--card-gradient', 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)')
      body.style.backgroundColor = '#ffffff'
      body.style.color = '#0f172a'
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
