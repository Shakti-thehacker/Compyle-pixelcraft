import React from 'react'
import { cn } from '@/lib/utils/cn'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  floatingLabel?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      id,
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      floatingLabel = false,
      disabled = false,
      required = false,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${React.useId()}`
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true)
      props.onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      props.onBlur?.(e)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0)
      props.onChange?.(e)
    }

    const showFloatingLabel = floatingLabel && (isFocused || hasValue)

    const baseInputStyles = [
      'flex h-11 w-full rounded-md border border-input bg-background px-3 py-2',
      'text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium',
      'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2',
      'focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed',
      'disabled:opacity-50 transition-all-300'
    ]

    const inputWithIconStyles = leftIcon ? 'pl-10' : rightIcon ? 'pr-10' : ''

    const errorStyles = error
      ? 'border-destructive focus-visible:ring-destructive'
      : 'focus-visible:ring-primary'

    const inputClasses = cn(
      baseInputStyles,
      inputWithIconStyles,
      errorStyles,
      className
    )

    const labelClasses = cn(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed',
      'peer-disabled:opacity-70 transition-all-300',
      error ? 'text-destructive' : 'text-foreground'
    )

    const floatingLabelClasses = cn(
      'absolute text-sm transition-all-300 pointer-events-none',
      'bg-background px-1',
      isFocused || hasValue
        ? '-top-2 left-2 text-xs text-primary'
        : 'top-3 left-3 text-muted-foreground',
      error && 'text-destructive'
    )

    if (floatingLabel) {
      return (
        <div className="relative">
          <input
            type={type}
            id={inputId}
            className={cn(
              inputClasses,
              'pt-6 pb-2',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10'
            )}
            ref={ref}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />

          {label && (
            <label
              htmlFor={inputId}
              className={floatingLabelClasses}
            >
              {label}
              {required && <span className="text-destructive ml-1">*</span>}
            </label>
          )}

          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}

          {error && (
            <p id={`${inputId}-error`} className="mt-2 text-sm text-destructive">
              {error}
            </p>
          )}

          {helperText && !error && (
            <p id={`${inputId}-helper`} className="mt-2 text-sm text-muted-foreground">
              {helperText}
            </p>
          )}
        </div>
      )
    }

    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={inputId} className={labelClasses}>
            {label}
            {required && <span className="text-destructive ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            type={type}
            id={inputId}
            className={inputClasses}
            ref={ref}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            {...props}
          />

          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {leftIcon}
            </div>
          )}

          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              {rightIcon}
            </div>
          )}
        </div>

        {error && (
          <p id={`${inputId}-error`} className="text-sm text-destructive">
            {error}
          </p>
        )}

        {helperText && !error && (
          <p id={`${inputId}-helper`} className="text-sm text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }