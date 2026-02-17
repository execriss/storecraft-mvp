import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

function buildFormState(product) {
  if (!product) {
    return { name: '', price: '', originalPrice: '', category: '', stock: '', image: '', description: '' }
  }
  return {
    name: product.name || '',
    price: product.price?.toString() || '',
    originalPrice: product.originalPrice?.toString() || '',
    category: product.category || '',
    stock: product.stock?.toString() || '',
    image: product.image || '',
    description: product.description || '',
  }
}

export default function ProductFormModal({ open, onClose, onSubmit, product }) {
  const [form, setForm] = useState(() => buildFormState(product))
  const [prevProduct, setPrevProduct] = useState(product)

  if (product !== prevProduct) {
    setPrevProduct(product)
    setForm(buildFormState(product))
  }

  function handleChange(field) {
    return (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({
      ...form,
      price: parseFloat(form.price) || 0,
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : undefined,
      stock: parseInt(form.stock) || 0,
    })
    onClose()
  }

  const isEditing = !!product

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? 'Editar producto' : 'Nuevo producto'}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Nombre"
            value={form.name}
            onChange={handleChange('name')}
            placeholder="Nombre del producto"
            required
          />
          <Input
            label="Categoría"
            value={form.category}
            onChange={handleChange('category')}
            placeholder="Ej: Camisas, Audio"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Input
            label="Precio"
            type="number"
            step="0.01"
            value={form.price}
            onChange={handleChange('price')}
            placeholder="0.00"
            required
          />
          <Input
            label="Precio anterior"
            type="number"
            step="0.01"
            value={form.originalPrice}
            onChange={handleChange('originalPrice')}
            placeholder="Opcional"
          />
          <Input
            label="Stock"
            type="number"
            value={form.stock}
            onChange={handleChange('stock')}
            placeholder="0"
          />
        </div>

        <Input
          label="URL de imagen"
          value={form.image}
          onChange={handleChange('image')}
          placeholder="https://..."
        />

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Descripción
          </label>
          <textarea
            value={form.description}
            onChange={handleChange('description')}
            rows={3}
            className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-white dark:focus:ring-white resize-none"
            placeholder="Descripción del producto..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            {isEditing ? 'Guardar cambios' : 'Crear producto'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
