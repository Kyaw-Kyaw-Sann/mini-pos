import { ArrowLeft, Pencil } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import type { Product } from '../types'

type ProductDetailsProps = {
  products: Product[]
}

function ProductDetails({ products }: ProductDetailsProps) {
  const { productId } = useParams()
  const product = products.find((item) => item.id === productId)

  if (!product) {
    return (
      <section className="rounded-lg border border-border bg-surface p-8 text-center">
        <h2 className="text-2xl font-bold text-heading">Product Not Found</h2>
        <p className="mt-2 text-body">
          The product you requested does not exist.
        </p>
        <Link
          to="/products"
          className="mt-5 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-on-primary hover:bg-primary-hover"
        >
          <ArrowLeft size={18} />
          Back to Products
        </Link>
      </section>
    )
  }

  return (
    <section>
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-primary hover:underline"
      >
        <ArrowLeft size={18} />
        Back to Products
      </Link>

      <div className="mt-5 max-w-2xl rounded-lg border border-border bg-surface p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm text-body">{product.category}</p>
            <h2 className="mt-1 break-words text-2xl font-bold text-heading">
              {product.name}
            </h2>
          </div>

          <Link
            to={`/products/${product.id}/edit`}
            className="inline-flex w-fit items-center gap-2 rounded-md bg-primary px-4 py-2 text-on-primary hover:bg-primary-hover"
          >
            <Pencil size={18} />
            Edit Product
          </Link>
        </div>

        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-md bg-background p-4">
            <dt className="text-sm text-body">Price</dt>
            <dd className="mt-1 text-xl font-bold text-heading">
              ${product.price.toFixed(2)}
            </dd>
          </div>
          <div className="rounded-md bg-background p-4">
            <dt className="text-sm text-body">Available stock</dt>
            <dd className="mt-1 text-xl font-bold text-heading">
              {product.stock}
            </dd>
          </div>
        </dl>

        <p className="mt-5 break-all text-sm text-muted">
          Product ID: {product.id}
        </p>
      </div>
    </section>
  )
}

export default ProductDetails
