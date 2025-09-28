import React from 'react'

const Card = React.forwardRef(({ 
  className = '', 
  children,
  ...props 
}, ref) => {
  return (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow-sm bg-white/5 border-white/20 backdrop-blur-md ${className}`}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = 'Card'

export { Card }