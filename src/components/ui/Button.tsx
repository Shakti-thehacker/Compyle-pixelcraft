import React from 'react'
import { cn } from '@/lib/utils/cn'
import { ButtonProps } from '@/types'

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      icon,
      iconPosition = 'left',
      fullWidth = false,
      onClick,
      ...props
    },
    ref
  ) => {
    const baseStyles = [
      'inline-flex items-center justify-center font-medium rounded-lg transition-all-300 focus-ring',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'relative overflow-hidden group'
    ]

    const variants = {
      primary: [
        'bg-primary text-primary-foreground hover:bg-primary/90',
        'shadow-md hover:shadow-lg hover-lift'
      ],
      secondary: [
        'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        'border border-border hover-lift'
      ],
      outline: [
        'border border-border bg-background hover:bg-accent hover:text-accent-foreground',
        'hover-lift'
      ],
      ghost: [
        'hover:bg-accent hover:text-accent-foreground',
        'text-foreground'
      ],
      destructive: [
        'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        'shadow-md hover:shadow-lg hover-lift'
      ]
    }

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    }

    const iconSizes = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6'
    }

    const classes = cn(
      baseStyles,
      variants[variant],
      sizes[size],
      fullWidth && 'w-full',
      className
    )

    const renderIcon = () => {
      if (!icon) return null
      return (
        <span className={cn(iconSizes[size], 'flex-shrink-0')}>
          {icon}
        </span>
      )
    }

    const renderContent = () => {
      if (loading) {
        return (
          <>
            <svg
              className={cn(
                'animate-spin',
                iconSizes[size],
                iconPosition === 'right' ? 'order-first' : 'order-last'
              )}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span className="ml-2">Loading...</span>
          </>
        )
      }

      return (
        <>
          {icon && iconPosition === 'left' && renderIcon()}
          <span className={cn(icon && 'mx-2', !icon && 'mx-0')}>
            {children}
          </span>
          {icon && iconPosition === 'right' && renderIcon()}
        </>
      )
    }

    return (
      <button
        className={classes}
        ref={ref}
        disabled={disabled || loading}
        onClick={onClick}
        {...props}
      >
        <span className="flex items-center justify-center">
          {renderContent()}
        </span>
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }