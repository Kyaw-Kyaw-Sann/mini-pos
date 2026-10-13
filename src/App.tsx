import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { initialProducts } from './data/initialProducts'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import POS from './pages/POS'
import ProductDetails from './pages/ProductDetails'
import ProductFormPage from './pages/ProductFormPage'
import Products from './pages/Products'
import SaleDetails from './pages/SaleDetails'
import SalesHistory from './pages/SalesHistory'
import type { CartItem, Product, ProductFormData, Sale } from './types'

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

function loadProducts() {
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

function loadSales() {
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

function App() {
  const [products, setProducts] = useState<Product[]>(loadProducts)
  const [cart, setCart] = useState<CartItem[]>([])
  const [sales, setSales] = useState<Sale[]>(loadSales)

  useEffect(() => {
    try {
      localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products))
    } catch {
      // Keep the app usable when browser storage is unavailable.
    }
  }, [products])

  useEffect(() => {
    try {
      localStorage.setItem(SALES_STORAGE_KEY, JSON.stringify(sales))
    } catch {
      // Keep the app usable when browser storage is unavailable.
    }
  }, [sales])

  function addProduct(productData: ProductFormData) {
    const newProduct: Product = {
      id: crypto.randomUUID(),
      ...productData,
    }

    setProducts((currentProducts) => [...currentProducts, newProduct])
  }

  function updateProduct(productId: string, productData: ProductFormData) {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === productId
          ? { ...product, ...productData }
          : product,
      ),
    )

    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                ...productData,
                quantity: Math.min(item.quantity, productData.stock),
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  function deleteProduct(productId: string) {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId),
    )
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId),
    )
  }

  function addToCart(product: Product) {
    const existingItem = cart.find((item) => item.id === product.id)

    if (product.stock === 0) {
      toast.error('This product is out of stock.')
      return
    }

    if (existingItem && existingItem.quantity >= product.stock) {
      toast.error('Cannot add more than the available stock.')
      return
    }

    setCart((currentCart) => {
      const itemAlreadyExists = currentCart.some(
        (item) => item.id === product.id,
      )

      if (itemAlreadyExists) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...currentCart, { ...product, quantity: 1 }]
    })

    toast.success(`${product.name} added to cart.`)
  }

  function increaseCartQuantity(productId: string) {
    const item = cart.find((cartItem) => cartItem.id === productId)

    if (!item) {
      return
    }

    if (item.quantity >= item.stock) {
      toast.error('Cannot add more than the available stock.')
      return
    }

    setCart((currentCart) =>
      currentCart.map((cartItem) =>
        cartItem.id === productId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem,
      ),
    )
  }

  function decreaseCartQuantity(productId: string) {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    )
  }

  function removeFromCart(productId: string) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId),
    )
    toast.success('Product removed from cart.')
  }

  function checkout(cashReceived: number) {
    if (cart.length === 0) {
      toast.error('Add at least one product to the cart.')
      return false
    }

    if (!Number.isFinite(cashReceived) || cashReceived < 0) {
      toast.error('Enter a valid cash amount.')
      return false
    }

    const total = Number(
      cart
        .reduce(
          (currentTotal, item) =>
            currentTotal + item.price * item.quantity,
          0,
        )
        .toFixed(2),
    )

    if (cashReceived < total) {
      toast.error('Cash received is not enough.')
      return false
    }

    const hasInvalidStock = cart.some((item) => {
      const currentProduct = products.find(
        (product) => product.id === item.id,
      )

      return !currentProduct || item.quantity > currentProduct.stock
    })

    if (hasInvalidStock) {
      toast.error('Some cart items no longer have enough stock.')
      return false
    }

    const change = Number((cashReceived - total).toFixed(2))
    const newSale: Sale = {
      id: crypto.randomUUID(),
      items: cart.map((item) => ({ ...item })),
      total,
      cashReceived,
      change,
      date: new Date().toISOString(),
    }

    setProducts((currentProducts) =>
      currentProducts.map((product) => {
        const cartItem = cart.find((item) => item.id === product.id)

        if (!cartItem) {
          return product
        }

        return {
          ...product,
          stock: product.stock - cartItem.quantity,
        }
      }),
    )
    setSales((currentSales) => [newSale, ...currentSales])
    setCart([])
    toast.success(`Checkout complete. Change: $${change.toFixed(2)}`)

    return true
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={<Dashboard products={products} sales={sales} />}
          />
          <Route
            path="pos"
            element={
              <POS
                products={products}
                cart={cart}
                onAddToCart={addToCart}
                onIncreaseQuantity={increaseCartQuantity}
                onDecreaseQuantity={decreaseCartQuantity}
                onRemoveFromCart={removeFromCart}
                onCheckout={checkout}
              />
            }
          />
          <Route
            path="products"
            element={
              <Products
                products={products}
                onDeleteProduct={deleteProduct}
              />
            }
          />
          <Route
            path="products/new"
            element={
              <ProductFormPage
                products={products}
                onAddProduct={addProduct}
                onUpdateProduct={updateProduct}
              />
            }
          />
          <Route
            path="products/:productId"
            element={<ProductDetails products={products} />}
          />
          <Route
            path="products/:productId/edit"
            element={
              <ProductFormPage
                products={products}
                onAddProduct={addProduct}
                onUpdateProduct={updateProduct}
              />
            }
          />
          <Route
            path="sales"
            element={<SalesHistory sales={sales} />}
          />
          <Route
            path="sales/:saleId"
            element={<SaleDetails sales={sales} />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>

      <Toaster position="top-right" />
    </>
  )
}

export default App
