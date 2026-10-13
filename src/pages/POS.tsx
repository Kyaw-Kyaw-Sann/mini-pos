import { useState } from 'react'
import { Banknote, PackageOpen, ShoppingCart } from 'lucide-react'
import CartItem from '../components/CartItem'
import type { CartItem as CartItemType, Product } from '../types'

type POSProps = {
  products: Product[]
  cart: CartItemType[]
  onAddToCart: (product: Product) => void
  onIncreaseQuantity: (productId: string) => void
  onDecreaseQuantity: (productId: string) => void
  onRemoveFromCart: (productId: string) => void
  onCheckout: (cashReceived: number) => boolean
}

function POS({
  products,
  cart,
  onAddToCart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveFromCart,
  onCheckout,
}: POSProps) {
  const [cashReceived, setCashReceived] = useState('')

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )
  const cashNumber =
    cashReceived.trim() === '' ? Number.NaN : Number(cashReceived)
  const hasValidCash = Number.isFinite(cashNumber) && cashNumber >= 0
  const change = hasValidCash ? cashNumber - cartTotal : 0

  function handleCheckout() {
    const checkoutSucceeded = onCheckout(cashNumber)

    if (checkoutSucceeded) {
      setCashReceived('')
    }
  }

  return (
    <section>
      <h2 className="text-2xl font-bold text-heading">Point of Sale</h2>
      <p className="mt-2 text-body">
        Select products and manage the current cart.
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div>
          <h3 className="text-lg font-semibold text-heading">Products</h3>

          {products.length === 0 ? (
            <div className="mt-4 rounded-lg border border-border bg-surface p-8 text-center text-body">
              No products are available.
            </div>
          ) : (
            <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => {
                const isOutOfStock = product.stock === 0

                return (
                  <article
                    key={product.id}
                    className="rounded-lg border border-border bg-surface p-4 shadow-sm"
                  >
                    <p className="text-sm text-body">{product.category}</p>
                    <h4 className="mt-1 font-semibold text-heading">
                      {product.name}
                    </h4>
                    <p className="mt-3 text-lg font-bold text-heading">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="mt-1 text-sm text-body">
                      Stock: {product.stock}
                    </p>

                    <button
                      type="button"
                      onClick={() => onAddToCart(product)}
                      disabled={isOutOfStock}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-sm text-on-primary hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-muted"
                    >
                      <ShoppingCart size={17} />
                      {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </article>
                )
              })}
            </div>
          )}
        </div>

        <aside className="h-fit rounded-lg border border-border bg-surface p-5 shadow-sm lg:sticky lg:top-6">
          <div className="flex items-center gap-2">
            <ShoppingCart className="text-primary" size={22} />
            <h3 className="text-lg font-semibold text-heading">Cart</h3>
          </div>

          {cart.length === 0 ? (
            <div className="py-10 text-center text-body">
              <PackageOpen className="mx-auto text-muted" size={36} />
              <p className="mt-3">Your cart is empty.</p>
            </div>
          ) : (
            <>
              <div className="mt-2">
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onIncrease={onIncreaseQuantity}
                    onDecrease={onDecreaseQuantity}
                    onRemove={onRemoveFromCart}
                  />
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="font-medium text-body">Total</span>
                <span className="text-2xl font-bold text-heading">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="cash-received"
                  className="text-sm font-medium text-heading"
                >
                  Cash received
                </label>
                <div className="relative mt-1">
                  <Banknote
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    id="cash-received"
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="0.01"
                    value={cashReceived}
                    onChange={(event) => setCashReceived(event.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-md border border-border bg-surface py-2 pl-10 pr-3 text-heading outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              {hasValidCash && cashNumber < cartTotal && (
                <div className="mt-3 flex justify-between text-sm text-danger">
                  <span>Amount still due</span>
                  <span>${Math.abs(change).toFixed(2)}</span>
                </div>
              )}

              {hasValidCash && cashNumber >= cartTotal && (
                <div className="mt-3 flex justify-between text-sm text-success">
                  <span>Change</span>
                  <span>${change.toFixed(2)}</span>
                </div>
              )}

              <button
                type="button"
                onClick={handleCheckout}
                className="mt-5 w-full rounded-md bg-success px-4 py-3 font-semibold text-on-primary hover:opacity-90"
              >
                Complete Checkout
              </button>
            </>
          )}
        </aside>
      </div>
    </section>
  )
}

export default POS
