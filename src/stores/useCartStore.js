import { create } from 'zustand'

const useCartStore = create((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.id === product.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }
      }
      return { items: [...state.items, { ...product, quantity: 1 }] }
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== id),
    })),

  updateQuantity: (id, quantity) =>
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter((i) => i.id !== id)
          : state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    })),

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  openCart: () => set({ isOpen: true }),

  closeCart: () => set({ isOpen: false }),

  clearCart: () => set({ items: [], isOpen: false }),

  get totalItems() {
    return get().items.reduce((sum, item) => sum + item.quantity, 0)
  },

  get totalPrice() {
    return get().items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    )
  },
}))

export default useCartStore
