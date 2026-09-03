type CardProps = {
  children: React.ReactNode
  className?: string
}

export default function Card({ children, className }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-border bg-surface-elevated p-4 text-content shadow-sm hover:border-primary-light transition-colors cursor-pointer ${className}`}
    >
      {children}
    </div>
  )
}
