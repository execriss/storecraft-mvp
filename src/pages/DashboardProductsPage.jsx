import { useState, useMemo } from 'react'
import { Plus, Search } from 'lucide-react'
import { toast } from 'sonner'
import useDashboardStore from '@/stores/useDashboardStore'
import Button from '@/components/ui/Button'
import ProductTable from '@/components/dashboard/ProductTable'
import ProductFormModal from '@/components/dashboard/ProductFormModal'

export default function DashboardProductsPage() {
  const products = useDashboardStore((s) => s.products)
  const searchQuery = useDashboardStore((s) => s.searchQuery)
  const setSearchQuery = useDashboardStore((s) => s.setSearchQuery)
  const addProduct = useDashboardStore((s) => s.addProduct)
  const updateProduct = useDashboardStore((s) => s.updateProduct)
  const deleteProduct = useDashboardStore((s) => s.deleteProduct)

  const [modalOpen, setModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products
    const q = searchQuery.toLowerCase()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
    )
  }, [products, searchQuery])

  function handleCreate() {
    setEditingProduct(null)
    setModalOpen(true)
  }

  function handleEdit(product) {
    setEditingProduct(product)
    setModalOpen(true)
  }

  function handleDelete(id) {
    deleteProduct(id)
    toast.success('Producto eliminado')
  }

  function handleSubmit(data) {
    if (editingProduct) {
      updateProduct(editingProduct.id, data)
      toast.success('Producto actualizado')
    } else {
      addProduct(data)
      toast.success('Producto creado')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Productos</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {products.length} producto{products.length !== 1 ? 's' : ''} en tu catálogo
          </p>
        </div>
        <Button onClick={handleCreate}>
          <Plus size={18} />
          Nuevo producto
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar productos..."
          className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm placeholder:text-gray-400 focus:border-gray-300 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-600"
        />
      </div>

      {/* Table */}
      <ProductTable
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal */}
      <ProductFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        product={editingProduct}
      />
    </div>
  )
}
