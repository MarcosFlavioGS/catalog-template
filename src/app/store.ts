import { ProductCart } from '@/types/product'
import { create } from 'zustand'

interface Cart {
  itemCount: number
  items: ProductCart[]
  addItem: (item: ProductCart) => void
  removeItem: (itemId: string) => void
}

const useCartStore = create<Cart>((set) => ({
  itemCount: 0,
  items: [],
  addItem: (item: ProductCart) =>
    set((state) => ({
      items: [...state.items, item],
      itemCount: state.itemCount + 1
    })),
  removeItem: (itemId: string) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== itemId),
      itemCount: state.itemCount - 1
    }))
}))

export default useCartStore
