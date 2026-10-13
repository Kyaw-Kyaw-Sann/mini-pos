import { ArrowLeft, Calendar } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import type { Sale } from '../types'

type SaleDetailsProps = {
  sales: Sale[]
}

function SaleDetails({ sales }: SaleDetailsProps) {
  const { saleId } = useParams()
  const sale = sales.find((item) => item.id === saleId)

  if (!sale) {
    return (
      <section className="rounded-lg border border-border bg-surface p-8 text-center">
        <h2 className="text-2xl font-bold text-heading">Sale Not Found</h2>
        <p className="mt-2 text-body">
          The sale you requested does not exist.
        </p>
        <Link
          to="/sales"
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-on-primary hover:bg-primary-hover"
        >
          <ArrowLeft size={18} />
          Back to Sales
        </Link>
      </section>
    )
  }

  const totalItems = sale.items.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  return (
    <section>
      <Link
        to="/sales"
        className="inline-flex items-center gap-2 text-primary hover:underline"
      >
        <ArrowLeft size={18} />
        Back to Sales
      </Link>

      <div className="mt-5 max-w-3xl rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-2 border-b border-border pb-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 className="text-2xl font-bold text-heading">Sale Details</h2>
            <p className="mt-1 break-all text-sm text-muted">ID: {sale.id}</p>
          </div>
          <p className="flex items-center gap-2 text-sm text-body">
            <Calendar className="shrink-0" size={16} />
            {new Date(sale.date).toLocaleString()}
          </p>
        </div>

        <div className="mt-5">
          <h3 className="font-semibold text-heading">
            Purchased Items ({totalItems})
          </h3>
          <div className="mt-3 divide-y divide-border rounded-md border border-border">
            {sale.items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="break-words font-medium text-heading">
                    {item.name}
                  </p>
                  <p className="mt-1 text-sm text-body">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </p>
                </div>
                <p className="font-semibold text-heading">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <dl className="mt-6 space-y-3 border-t border-border pt-5">
          <div className="flex justify-between gap-4 text-body">
            <dt>Cash received</dt>
            <dd>${sale.cashReceived.toFixed(2)}</dd>
          </div>
          <div className="flex justify-between gap-4 text-body">
            <dt>Change</dt>
            <dd>${sale.change.toFixed(2)}</dd>
          </div>
          <div className="flex justify-between gap-4 text-xl font-bold text-heading">
            <dt>Total</dt>
            <dd>${sale.total.toFixed(2)}</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}

export default SaleDetails
