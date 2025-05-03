import { defineConfig, loadEnv } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: env.PROD? env.VITE_PRODUCTION_API_URL: env.VITE_DEVELOPMENT_API_URL , // Usa só a URL da API em dev
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
