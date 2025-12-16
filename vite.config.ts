import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, (process as any).cwd(), '')
  
  return {
    plugins: [react()],
    define: {
      // Explicitly define process.env.API_KEY to avoid leaking other secrets
      // and ensure it works even if it doesn't start with VITE_
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})