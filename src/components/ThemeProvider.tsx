
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

    // Apply comprehensive dark mode styling
    if (theme === "dark") {
      // Set dark background for entire page
      root.style.backgroundColor = '#0f172a'
      root.style.color = '#f8fafc'
      body.style.backgroundColor = '#0f172a'
      body.style.color = '#f8fafc'
      body.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
      body.style.minHeight = '100vh'
      
      // Ensure the root element covers full height
      root.style.minHeight = '100vh'
      root.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
      
      // Set all containers to inherit dark styling
      root.style.setProperty('--background', '15 23 42') // slate-900
      root.style.setProperty('--foreground', '248 250 252') // slate-50
      root.style.setProperty('--card', '30 41 59') // slate-800
      root.style.setProperty('--card-foreground', '248 250 252') // slate-50
      root.style.setProperty('--muted', '30 41 59') // slate-800
      root.style.setProperty('--muted-foreground', '148 163 184') // slate-400
      
      // Ensure #root div also has dark background
      const rootDiv = document.getElementById('root')
      if (rootDiv) {
        rootDiv.style.backgroundColor = '#0f172a'
        rootDiv.style.minHeight = '100vh'
        rootDiv.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
      }
    } else {
      // Set light background for entire page
      root.style.backgroundColor = '#ffffff'
      root.style.color = '#0f172a'
      body.style.backgroundColor = '#ffffff'
      body.style.color = '#0f172a'
      body.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      body.style.minHeight = '100vh'
      
      // Ensure the root element covers full height
      root.style.minHeight = '100vh'
      root.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      
      // Set all containers to inherit light styling
      root.style.setProperty('--background', '240 100 99') // near white
      root.style.setProperty('--foreground', '15 23 42') // slate-900
      root.style.setProperty('--card', '0 0 100') // white
      root.style.setProperty('--card-foreground', '15 23 42') // slate-900
      root.style.setProperty('--muted', '241 245 249') // slate-100
      root.style.setProperty('--muted-foreground', '100 116 139') // slate-500
      
      // Ensure #root div also has light background
      const rootDiv = document.getElementById('root')
      if (rootDiv) {
        rootDiv.style.backgroundColor = '#ffffff'
        rootDiv.style.minHeight = '100vh'
        rootDiv.style.background = 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }
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
