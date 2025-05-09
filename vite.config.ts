import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }: any) => {
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    server: {
      host: env.VITE_HOST,
      port: Number(env.VITE_PORT),
      allowedHosts: ['wod-ai-frontend.onrender.com'],
    },
    plugins: [react()],
  })
}
