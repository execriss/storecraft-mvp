import { create } from 'zustand'
import { getTemplateById } from '@/data/templates'

const useCustomizationStore = create((set) => ({
  selectedTemplateId: null,
  storeName: 'Mi Tienda',
  logoUrl: null,
  colors: {
    primary: '#1a1a1a',
    secondary: '#f5f0eb',
    accent: '#d4a574',
    background: '#ffffff',
    text: '#1a1a1a',
  },
  previewDevice: 'desktop',

  selectTemplate: (id) => {
    const template = getTemplateById(id)
    if (template) {
      set({
        selectedTemplateId: id,
        colors: { ...template.defaultColors },
      })
    }
  },

  setStoreName: (name) => set({ storeName: name }),

  setLogoUrl: (url) => set({ logoUrl: url }),

  setColor: (key, value) =>
    set((state) => ({
      colors: { ...state.colors, [key]: value },
    })),

  resetColors: () =>
    set((state) => {
      const template = getTemplateById(state.selectedTemplateId)
      if (template) {
        return { colors: { ...template.defaultColors } }
      }
      return state
    }),

  setPreviewDevice: (device) => set({ previewDevice: device }),
}))

export default useCustomizationStore
