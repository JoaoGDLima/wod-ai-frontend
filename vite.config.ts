import { defineConfig, loadEnv  } from 'vite'
import react from '@vitejs/plugin-react'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return defineConfig({
    server: {
      host: env.VITE_HOST,
      port: Number(env.VITE_PORT),
    },
    plugins: [react()],
  })
}
