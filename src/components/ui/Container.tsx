import React from 'react'
import { cn } from '@/lib/utils/cn'
import { ComponentBaseProps } from '@/types'

interface ContainerProps extends ComponentBaseProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'fluid'
  center?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      className,
      children,
      size = 'lg',
      center = true,
      padding = 'md',
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: 'max-w-2xl',
      md: 'max-w-4xl',
      lg: 'max-w-6xl',
      xl: 'max-w-7xl',
      full: 'max-w-full',
      fluid: 'max-w-none'
    }

    const paddingStyles = {
      none: '',
      sm: 'px-4 py-2 sm:px-6 sm:py-4',
      md: 'px-4 py-6 sm:px-6 sm:py-8 lg:py-12',
      lg: 'px-4 py-8 sm:px-6 sm:py-12 lg:py-16'
    }

    const classes = cn(
      'w-full',
      sizeStyles[size],
      center && 'mx-auto',
      paddingStyles[padding],
      className
    )

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    )
  }
)

Container.displayName = 'Container'

export { Container }