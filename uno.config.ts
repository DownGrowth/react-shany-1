import {
  defineConfig, presetAttributify, presetIcons,
  presetTypography, presetUno, transformerAttributifyJsx,
} from 'unocss'

export default defineConfig({
  theme: {
  },
  shortcuts: {
    'b-btn': 'h-48px w-100%  bg-#C1E9F8 b-none text-#666666 font-black text-lg rounded-8px'
  },
  safelist: [],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: { 'display': 'inline-block', 'vertical-align': 'middle' },
    }),
    presetTypography(),
  ],
  transformers: [
    transformerAttributifyJsx(),
  ],
})
