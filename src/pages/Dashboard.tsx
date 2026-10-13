import { CircleDollarSign, Package, Receipt, TriangleAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import StatCard from '../components/StatCard'
import type { Product, Sale } from '../types'

type DashboardProps = {
  products: Product[]
  sales: Sale[]
}

function Dashboard({ products, sales }: DashboardProps) {
  const totalRevenue = sales.reduce(
    (total, sale) => total + sale.total,
    0,
  )
  const lowStockCount = products.filter((product) => product.stock <= 5).length
  const recentSales = sales.slice(0, 3)

  return (
    <section>
      <h2 className="text-2xl font-bold text-heading">Dashboard</h2>
      <p className="mt-2 text-body">
        A quick overview of products and completed sales.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Products" value={products.length}>
          <Package size={24} />
        </StatCard>
        <StatCard title="Completed Sales" value={sales.length}>
          <Receipt size={24} />
        </StatCard>
        <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`}>
          <CircleDollarSign size={24} />
        </StatCard>
        <StatCard title="Low Stock" value={lowStockCount}>
          <TriangleAlert size={24} />
        </StatCard>
      </div>

      <div className="mt-8 rounded-lg border border-border bg-surface p-5 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold text-heading">Recent Sales</h3>
          <Link to="/sales" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div>

        {recentSales.length === 0 ? (
          <p className="mt-5 text-body">No sales have been completed yet.</p>
        ) : (
          <div className="mt-4 divide-y divide-border">
            {recentSales.map((sale) => (
              <Link
                key={sale.id}
                to={`/sales/${sale.id}`}
                className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-heading">
                    Sale #{sale.id.slice(0, 8)}
                  </p>
                  <p className="mt-1 text-sm text-body">
                    {new Date(sale.date).toLocaleString()}
                  </p>
                </div>
                <p className="font-semibold text-heading">
                  ${sale.total.toFixed(2)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Dashboard
