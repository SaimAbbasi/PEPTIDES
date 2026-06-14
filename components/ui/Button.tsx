import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      primary: 'bg-accent text-black hover:bg-accent-hover',
      secondary: 'bg-teal text-white hover:bg-teal/80',
      ghost: 'bg-transparent text-text-secondary hover:text-white hover:bg-surface-elevated',
      outline: 'bg-transparent border border-border-subtle text-text-primary hover:border-accent hover:text-accent',
    }

    const sizes = {
      sm: 'px-4 py-2 text-sm rounded',
      md: 'px-6 py-3 text-sm rounded-md',
      lg: 'px-8 py-4 text-base rounded-md',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
