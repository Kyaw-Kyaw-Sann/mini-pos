import { Calendar, Eye, Package, Receipt } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Sale } from '../types'

type SalesHistoryProps = {
  sales: Sale[]
}

function SalesHistory({ sales }: SalesHistoryProps) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-heading">Sales History</h2>
      <p className="mt-2 text-body">
        Review all completed sales.
      </p>

      {sales.length === 0 ? (
        <div className="mt-6 rounded-lg border border-border bg-surface p-10 text-center">
          <Receipt className="mx-auto text-muted" size={40} />
          <p className="mt-3 text-body">No sales have been completed yet.</p>
          <Link
            to="/pos"
            className="mt-5 inline-block rounded-md bg-primary px-4 py-2 text-on-primary hover:bg-primary-hover"
          >
            Go to POS
          </Link>
        </div>
      ) : (
        <div className="mt-6 space-y-4">
          {sales.map((sale) => {
            const totalItems = sale.items.reduce(
              (total, item) => total + item.quantity,
              0,
            )

            return (
              <article
                key={sale.id}
                className="rounded-lg border border-border bg-surface p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold text-heading">
                      Sale #{sale.id.slice(0, 8)}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-sm text-body">
                      <span className="flex items-center gap-2">
                        <Calendar size={16} />
                        {new Date(sale.date).toLocaleString()}
                      </span>
                      <span className="flex items-center gap-2">
                        <Package size={16} />
                        {totalItems} {totalItems === 1 ? 'item' : 'items'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-5 sm:justify-end">
                    <p className="text-xl font-bold text-heading">
                      ${sale.total.toFixed(2)}
                    </p>
                    <Link
                      to={`/sales/${sale.id}`}
                      className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm text-on-primary hover:bg-primary-hover"
                    >
                      <Eye size={16} />
                      Details
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}

export default SalesHistory
