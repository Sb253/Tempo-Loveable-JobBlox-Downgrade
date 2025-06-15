
import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

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
  theme: "system",
  setTheme: () => null,
  actualTheme: "light",
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "lovable-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )
  const [actualTheme, setActualTheme] = useState<"dark" | "light">("light")

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove("light", "dark")

    let resolvedTheme: "dark" | "light"

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      resolvedTheme = systemTheme
      root.classList.add(systemTheme)
    } else {
      resolvedTheme = theme
      root.classList.add(theme)
    }

    setActualTheme(resolvedTheme)

    // Add modern gradient backgrounds
    if (resolvedTheme === "dark") {
      root.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)')
      root.style.setProperty('--card-gradient', 'linear-gradient(135deg, #1e293b 0%, #334155 100%)')
    } else {
      root.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)')
      root.style.setProperty('--card-gradient', 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)')
    }
  }, [theme])

  const value = {
    theme,
    actualTheme,
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
