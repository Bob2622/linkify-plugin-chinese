import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'linkify-plugin-chinese',
      fileName: 'linkify-plugin-chinese'
    }
  }
})
