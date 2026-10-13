import { Eye, Package, Pencil, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '../types'

type ProductCardProps = {
  product: Product
  onDelete: (product: Product) => void
}

function ProductCard({ product, onDelete }: ProductCardProps) {
  return (
    <article className="rounded-lg border border-border bg-surface p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-body">{product.category}</p>
          <h3 className="mt-1 text-lg font-semibold text-heading">
            {product.name}
          </h3>
        </div>

        <Package className="text-primary" size={24} />
      </div>

      <div className="mt-5">
        <div>
          <p className="text-xl font-bold text-heading">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-1 text-sm text-body">Stock: {product.stock}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to={`/products/${product.id}`}
            className="flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm text-on-primary hover:bg-primary-hover"
          >
            <Eye size={16} />
            Details
          </Link>
          <Link
            to={`/products/${product.id}/edit`}
            className="flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-heading hover:bg-background"
          >
            <Pencil size={16} />
            Edit
          </Link>
          <button
            type="button"
            onClick={() => onDelete(product)}
            className="flex items-center gap-2 rounded-md bg-danger px-3 py-2 text-sm text-on-primary hover:opacity-90"
          >
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
