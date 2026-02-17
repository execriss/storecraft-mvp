import { create } from 'zustand'
import { productsByTemplate } from '@/data/products'
import { mockOrders } from '@/data/orders'

const useDashboardStore = create((set) => ({
  products: productsByTemplate.vogue,
  orders: mockOrders,
  searchQuery: '',
  orderFilter: 'all',

  setSearchQuery: (query) => set({ searchQuery: query }),

  setOrderFilter: (filter) => set({ orderFilter: filter }),

  addProduct: (product) =>
    set((state) => ({
      products: [
        ...state.products,
        { ...product, id: Date.now(), rating: 0, stock: product.stock || 0 },
      ],
    })),

  updateProduct: (id, data) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...data } : p
      ),
    })),

  deleteProduct: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),

  updateOrderStatus: (id, status) =>
    set((state) => ({
      orders: state.orders.map((o) =>
        o.id === id ? { ...o, status } : o
      ),
    })),
}))

export default useDashboardStore
