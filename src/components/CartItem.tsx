import { Minus, Plus, Trash2 } from 'lucide-react'
import type { CartItem as CartItemType } from '../types'

type CartItemProps = {
  item: CartItemType
  onIncrease: (productId: string) => void
  onDecrease: (productId: string) => void
  onRemove: (productId: string) => void
}

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemProps) {
  const subtotal = item.price * item.quantity

  return (
    <article className="border-b border-border py-4 last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="break-words font-semibold text-heading">
            {item.name}
          </h3>
          <p className="mt-1 text-sm text-body">
            ${item.price.toFixed(2)} each
          </p>
        </div>
        <p className="shrink-0 font-semibold text-heading">
          ${subtotal.toFixed(2)}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onDecrease(item.id)}
            disabled={item.quantity <= 1}
            aria-label={`Decrease ${item.name} quantity`}
            className="rounded-md border border-border p-2 text-heading hover:bg-background disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus size={16} />
          </button>

          <span className="min-w-8 text-center font-medium text-heading">
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={() => onIncrease(item.id)}
            disabled={item.quantity >= item.stock}
            aria-label={`Increase ${item.name} quantity`}
            className="rounded-md border border-border p-2 text-heading hover:bg-background disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus size={16} />
          </button>

          <span className="text-xs text-muted">of {item.stock}</span>
        </div>

        <button
          type="button"
          onClick={() => onRemove(item.id)}
          aria-label={`Remove ${item.name} from cart`}
          className="rounded-md p-2 text-danger hover:bg-background"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </article>
  )
}

export default CartItem
