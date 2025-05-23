import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/email/send-email': process.env.VITE_API_URL || 'http://localhost:3000',  // Usamos la variable de entorno para definir el proxy
    }
  }

})
