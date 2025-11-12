'use client'

import React from 'react'
import { useTheme } from './ThemeProvider'
import { Sun, Moon, Monitor } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

interface ThemeToggleProps {
  className?: string
  showLabel?: boolean
  variant?: 'button' | 'dropdown'
}

export function ThemeToggle({ className, showLabel = false, variant = 'button' }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const themes = [
    { name: 'light', icon: Sun, label: 'Light' },
    { name: 'dark', icon: Moon, label: 'Dark' },
    { name: 'system', icon: Monitor, label: 'System' },
  ]

  if (variant === 'dropdown') {
    const currentTheme = themes.find(t => t.name === theme)

    return (
      <div className="relative group">
        <button
          className={cn(
            'flex items-center gap-2 px-3 py-2 rounded-md text-sm',
            'hover:bg-accent hover:text-accent-foreground transition-colors',
            className
          )}
        >
          <currentTheme!.icon className="h-4 w-4" />
          {showLabel && <span>{currentTheme!.label}</span>}
        </button>

        <div className="absolute right-0 top-full mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="bg-popover border rounded-md shadow-lg p-1 min-w-[8rem]">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon
              const isActive = theme === themeOption.name

              return (
                <button
                  key={themeOption.name}
                  onClick={() => setTheme(themeOption.name as any)}
                  className={cn(
                    'flex items-center gap-2 w-full px-3 py-2 text-sm rounded-md',
                    'hover:bg-accent hover:text-accent-foreground transition-colors',
                    isActive && 'bg-accent text-accent-foreground'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {themeOption.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => {
        // Cycle through themes: light -> dark -> system -> light
        const nextTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light'
        setTheme(nextTheme)
      }}
      className={cn(
        'relative inline-flex items-center justify-center rounded-md p-2',
        'hover:bg-accent hover:text-accent-foreground transition-all-300',
        'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        className
      )}
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}