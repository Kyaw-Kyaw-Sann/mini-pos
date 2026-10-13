import type { ReactNode } from 'react'

type StatCardProps = {
  title: string
  value: string | number
  children: ReactNode
}

function StatCard({ title, value, children }: StatCardProps) {
  return (
    <article className="rounded-lg border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-body">{title}</p>
          <p className="mt-2 text-2xl font-bold text-heading">{value}</p>
        </div>
        <div className="rounded-lg bg-background p-3 text-primary">
          {children}
        </div>
      </div>
    </article>
  )
}

export default StatCard
