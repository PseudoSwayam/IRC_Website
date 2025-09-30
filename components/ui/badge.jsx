import React from 'react'

const Badge = React.forwardRef(({ 
  className = '', 
  variant = 'default',
  children,
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
  
  const variants = {
    default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80 bg-gray-900 text-white',
    secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 bg-gray-200 text-gray-900',
    destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80 bg-red-500 text-white',
    outline: 'text-foreground border-gray-300 text-gray-700',
  }
  
  return (
    <div
      className={`${baseClasses} ${variants[variant]} ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})

Badge.displayName = 'Badge'

export { Badge }