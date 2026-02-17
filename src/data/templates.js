export const templates = [
  {
    id: 'vogue',
    name: 'Vogue',
    category: 'Moda y Ropa',
    description:
      'Diseño minimalista y elegante, perfecto para marcas de moda, joyería y accesorios. Tipografía limpia e imágenes protagonistas.',
    previewImage:
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    defaultColors: {
      primary: '#1a1a1a',
      secondary: '#f5f0eb',
      accent: '#d4a574',
      background: '#ffffff',
      text: '#1a1a1a',
    },
    features: [
      'Hero con imagen fullscreen',
      'Grid de productos minimal',
      'Lookbook integrado',
      'Tipografía elegante',
    ],
  },
  {
    id: 'bytestore',
    name: 'ByteStore',
    category: 'Electrónica y Tecnología',
    description:
      'Moderno y audaz con tema oscuro. Ideal para tiendas de gadgets, componentes y tecnología. Badges de descuento y specs destacados.',
    previewImage:
      'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&q=80',
    defaultColors: {
      primary: '#0f172a',
      secondary: '#1e293b',
      accent: '#06b6d4',
      background: '#0f172a',
      text: '#f8fafc',
    },
    features: [
      'Tema oscuro impactante',
      'Cards con especificaciones',
      'Badges de descuento',
      'Filtros por categoría',
    ],
  },
  {
    id: 'freshmarket',
    name: 'FreshMarket',
    category: 'Comida y Orgánico',
    description:
      'Cálido y acogedor, diseñado para tiendas de alimentos, cafés y productos naturales. Colores vivos y secciones por categoría.',
    previewImage:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    defaultColors: {
      primary: '#166534',
      secondary: '#fef3c7',
      accent: '#ea580c',
      background: '#fffbeb',
      text: '#1c1917',
    },
    features: [
      'Secciones por categoría',
      'Banner de delivery',
      'Colores cálidos naturales',
      'Diseño acogedor',
    ],
  },
]

export function getTemplateById(id) {
  return templates.find((t) => t.id === id)
}
