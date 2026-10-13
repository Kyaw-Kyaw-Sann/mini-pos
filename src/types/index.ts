export type Product = {
  id: string
  name: string
  price: number
  category: string
  stock: number
}

export type ProductFormData = {
  name: string
  price: number
  category: string
  stock: number
}

export type CartItem = Product & {
  quantity: number
}

export type Sale = {
  id: string
  items: CartItem[]
  total: number
  cashReceived: number
  change: number
  date: string
}
