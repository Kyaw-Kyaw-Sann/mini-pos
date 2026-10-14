import { initialProducts } from './initialProducts'
import type { CartItem, Product, Sale } from '../types'

const PRODUCTS_STORAGE_KEY = 'mini-pos-products'
const SALES_STORAGE_KEY = 'mini-pos-sales'

function isProduct(value: unknown): value is Product {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const product = value as Record<string, unknown>

  return (
    typeof product.id === 'string' &&
    typeof product.name === 'string' &&
    typeof product.category === 'string' &&
    typeof product.price === 'number' &&
    Number.isFinite(product.price) &&
    product.price >= 0 &&
    typeof product.stock === 'number' &&
    Number.isInteger(product.stock) &&
    product.stock >= 0
  )
}

function isCartItem(value: unknown): value is CartItem {
  if (!isProduct(value)) {
    return false
  }

  const item = value as Record<string, unknown>

  return (
    typeof item.quantity === 'number' &&
    Number.isInteger(item.quantity) &&
    item.quantity > 0
  )
}

function isSale(value: unknown): value is Sale {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const sale = value as Record<string, unknown>

  return (
    typeof sale.id === 'string' &&
    Array.isArray(sale.items) &&
    sale.items.every(isCartItem) &&
    typeof sale.total === 'number' &&
    Number.isFinite(sale.total) &&
    sale.total >= 0 &&
    typeof sale.cashReceived === 'number' &&
    Number.isFinite(sale.cashReceived) &&
    sale.cashReceived >= 0 &&
    typeof sale.change === 'number' &&
    Number.isFinite(sale.change) &&
    sale.change >= 0 &&
    typeof sale.date === 'string' &&
    !Number.isNaN(Date.parse(sale.date))
  )
}

export function loadProducts() {
  try {
    const storedProducts = localStorage.getItem(PRODUCTS_STORAGE_KEY)

    if (!storedProducts) {
      return initialProducts
    }

    const parsedProducts: unknown = JSON.parse(storedProducts)

    if (Array.isArray(parsedProducts) && parsedProducts.every(isProduct)) {
      return parsedProducts
    }
  } catch {
    return initialProducts
  }

  return initialProducts
}

export function loadSales() {
  try {
    const storedSales = localStorage.getItem(SALES_STORAGE_KEY)

    if (!storedSales) {
      return []
    }

    const parsedSales: unknown = JSON.parse(storedSales)

    if (Array.isArray(parsedSales) && parsedSales.every(isSale)) {
      return parsedSales
    }
  } catch {
    return []
  }

  return []
}

export function saveProducts(products: Product[]) {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products))
  } catch {
    // Keep the app usable when browser storage is unavailable.
  }
}

export function saveSales(sales: Sale[]) {
  try {
    localStorage.setItem(SALES_STORAGE_KEY, JSON.stringify(sales))
  } catch {
    // Keep the app usable when browser storage is unavailable.
  }
}
