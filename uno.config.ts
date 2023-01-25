import {
  defineConfig, presetAttributify, presetIcons,
  presetTypography, presetUno, transformerAttributifyJsx,
} from 'unocss'

export default defineConfig({
  theme: {
  },
  shortcuts: {
    'b-btn': 'h-48px w-100%  bg-#C1E9F8 b-none text-#666666 font-black text-lg rounded-8px',
    'b-input-text': 'h-48px px-16px leading-32px py-8px b-#7fc08e b-1 focus:shadow focus:shadow-inset rounded-8px text-18px',
    'b-form': 'px-16px flex flex-col gap-y-24px children-flex children-flex-col',
    'b-form-label': 'text-18px mb-8px',
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
