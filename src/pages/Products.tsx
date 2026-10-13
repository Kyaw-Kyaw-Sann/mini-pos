import { useState } from 'react'
import { Plus, Search, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import type { Product } from '../types'

type ProductsProps = {
  products: Product[]
  onDeleteProduct: (productId: string) => void
}

function Products({ products, onDeleteProduct }: ProductsProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = Array.from(
    new Set(products.map((product) => product.category)),
  )

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase())
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const hasActiveFilters = searchTerm !== '' || selectedCategory !== 'All'

  function handleDelete(product: Product) {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete ${product.name}?`,
    )

    if (!shouldDelete) {
      return
    }

    onDeleteProduct(product.id)
    toast.success('Product deleted successfully.')
  }

  function clearFilters() {
    setSearchTerm('')
    setSelectedCategory('All')
  }

  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-heading">Products</h2>
          <p className="mt-2 text-body">
            View and manage all products in the store.
          </p>
        </div>

        <Link
          to="/products/new"
          className="flex w-fit items-center gap-2 rounded-md bg-primary px-4 py-2 text-on-primary hover:bg-primary-hover"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      <div className="mt-6 grid gap-3 rounded-lg border border-border bg-surface p-4 sm:grid-cols-2">
        <label className="relative">
          <span className="sr-only">Search products</span>
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search by product name"
            className="w-full rounded-md border border-border bg-surface py-2 pl-10 pr-3 text-heading outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label>
          <span className="sr-only">Filter by category</span>
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
            className="w-full rounded-md border border-border bg-surface px-3 py-2 text-heading outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="All">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      {products.length === 0 ? (
        <div className="mt-6 rounded-lg border border-border bg-surface p-8 text-center text-body">
          No products have been added yet.
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="mt-6 rounded-lg border border-border bg-surface p-8 text-center">
          <p className="text-body">No products match your search.</p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="mt-4 inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-heading hover:bg-background"
            >
              <X size={18} />
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Products
