import type { ReactNode } from "react"

type PillProps = {
  children: ReactNode
  className?: string
  icon?: ReactNode
}

export const Pill = ({ children, className = "", icon }: PillProps) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-xl border border-border/60 bg-surface-secondary/50 px-2.5 py-0.5 text-xs font-medium tracking-wide text-content-secondary  ${className}`}
    >
      {icon && (
        <span className="shrink-0 opacity-70 [&>svg]:h-3.5 [&>svg]:w-3.5">
          {icon}
        </span>
      )}
      {children}
    </span>
  )
}
