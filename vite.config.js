import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        scroll_base_animation: resolve(__dirname, 'pages/scroll-base-animation/index.html'),
      },
    },
  },
})