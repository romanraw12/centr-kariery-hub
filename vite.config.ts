import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/* Статический сайт без роутинга и бэкенда: все данные лежат в src/data,
   сборка — обычный Vite + Tailwind v4. */
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
})