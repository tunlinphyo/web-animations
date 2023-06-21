import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        scroll_base_animation: resolve(__dirname, 'pages/scroll-base-animation/index.html'),
        card_animation: resolve(__dirname, 'pages/card-animation/index.html'),
        card_list: resolve(__dirname, 'pages/card-list/index.html'),
      },
    },
  },
})