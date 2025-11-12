import React from 'react'
import { cn } from '@/lib/utils/cn'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'current'
  className?: string
}

export const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  (
    {
      size = 'md',
      color = 'primary',
      className,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12'
    }

    const colorStyles = {
      primary: 'text-primary',
      secondary: 'text-muted-foreground',
      current: 'text-current'
    }

    const classes = cn(
      'animate-spin',
      sizeStyles[size],
      colorStyles[color],
      className
    )

    return (
      <div ref={ref} className={classes} {...props}>
        <svg
          className="h-full w-full"
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
      </div>
    )
  }
)

LoadingSpinner.displayName = 'LoadingSpinner'

interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const LoadingDots = React.forwardRef<HTMLSpanElement, LoadingDotsProps>(
  (
    {
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    }

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1 loading-dots',
          sizeStyles[size],
          className
        )}
        {...props}
      >
        <span className="inline-block w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="inline-block w-1 h-1 bg-current rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="inline-block w-1 h-1 bg-current rounded-full animate-bounce"></span>
      </span>
    )
  }
)

LoadingDots.displayName = 'LoadingDots'

interface LoadingSkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
  lines?: number
}

export const LoadingSkeleton = React.forwardRef<HTMLDivElement, LoadingSkeletonProps>(
  (
    {
      className,
      variant = 'text',
      width,
      height,
      lines = 1,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      text: 'rounded',
      circular: 'rounded-full',
      rectangular: 'rounded-md'
    }

    const style = {
      width: width || (variant === 'text' ? '100%' : undefined),
      height: height || (variant === 'text' ? '1rem' : undefined)
    }

    if (variant === 'text' && lines > 1) {
      return (
        <div ref={ref} className="space-y-2" {...props}>
          {Array.from({ length: lines }, (_, index) => (
            <div
              key={index}
              className={cn(
                'loading-skeleton',
                variantStyles.text,
                index === lines - 1 ? 'w-3/4' : 'w-full',
                className
              )}
              style={{
                height: height || '1rem'
              }}
            />
          ))}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          'loading-skeleton',
          variantStyles[variant],
          className
        )}
        style={style}
        {...props}
      />
    )
  }
)

LoadingSkeleton.displayName = 'LoadingSkeleton'

export { LoadingSkeleton as Skeleton }