import React from 'react'

const Button = React.forwardRef(({ 
  className = '', 
  variant = 'default', 
  size = 'default',
  iconRight,
  children,
  ...props 
}, ref) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background'
  
  const variants = {
    default: 'bg-yellow-500 text-black hover:bg-yellow-400 font-semibold',
    secondary: 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/20',
    'secondary-alt': 'bg-white/10 text-white hover:bg-white/20 border border-white/30 backdrop-blur-md',
    link: 'underline-offset-4 hover:underline text-yellow-400 hover:text-yellow-300',
  }
  
  const sizes = {
    default: 'h-10 py-2 px-4',
    sm: 'h-9 px-3 rounded-md text-sm',
    lg: 'h-11 px-8 rounded-md',
    link: 'p-0 h-auto',
  }
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      ref={ref}
      {...props}
    >
      {children}
      {iconRight && <span className="ml-2">{iconRight}</span>}
    </button>
  )
})

Button.displayName = 'Button'

export { Button }