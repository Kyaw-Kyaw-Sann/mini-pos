import { useState, type FormEvent } from 'react'
import toast from 'react-hot-toast'
import type { Product, ProductFormData } from '../types'

type ProductFormProps = {
  initialProduct?: Product
  submitLabel: string
  onSubmit: (productData: ProductFormData) => void
}

function ProductForm({
  initialProduct,
  submitLabel,
  onSubmit,
}: ProductFormProps) {
  const [name, setName] = useState(initialProduct?.name ?? '')
  const [category, setCategory] = useState(initialProduct?.category ?? '')
  const [price, setPrice] = useState(initialProduct?.price.toString() ?? '')
  const [stock, setStock] = useState(initialProduct?.stock.toString() ?? '')
  const [error, setError] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const cleanName = name.trim()
    const cleanCategory = category.trim()
    const priceNumber = Number(price)
    const stockNumber = Number(stock)

    if (!cleanName || !cleanCategory) {
      const message = 'Name and category are required.'
      setError(message)
      toast.error(message)
      return
    }

    if (price.trim() === '' || !Number.isFinite(priceNumber) || priceNumber < 0) {
      const message = 'Price must be a valid number of zero or more.'
      setError(message)
      toast.error(message)
      return
    }

    if (
      stock.trim() === '' ||
      !Number.isInteger(stockNumber) ||
      stockNumber < 0
    ) {
      const message = 'Stock must be a whole number of zero or more.'
      setError(message)
      toast.error(message)
      return
    }

    setError('')
    onSubmit({
      name: cleanName,
      category: cleanCategory,
      price: priceNumber,
      stock: stockNumber,
    })
  }

  const inputClasses =
    'mt-1 w-full rounded-md border border-border bg-surface px-3 py-2 text-heading outline-none focus:border-primary focus:ring-2 focus:ring-primary/20'

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 max-w-2xl space-y-5 rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-6"
    >
      <div>
        <label htmlFor="name" className="text-sm font-medium text-heading">
          Product name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={inputClasses}
          placeholder="Example: Iced Coffee"
        />
      </div>

      <div>
        <label htmlFor="category" className="text-sm font-medium text-heading">
          Category
        </label>
        <input
          id="category"
          type="text"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className={inputClasses}
          placeholder="Example: Drinks"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="price" className="text-sm font-medium text-heading">
            Price
          </label>
          <input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            className={inputClasses}
            placeholder="0.00"
          />
        </div>

        <div>
          <label htmlFor="stock" className="text-sm font-medium text-heading">
            Stock
          </label>
          <input
            id="stock"
            type="number"
            min="0"
            step="1"
            value={stock}
            onChange={(event) => setStock(event.target.value)}
            className={inputClasses}
            placeholder="0"
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="rounded-md bg-primary px-4 py-2 font-medium text-on-primary hover:bg-primary-hover"
      >
        {submitLabel}
      </button>
    </form>
  )
}

export default ProductForm
