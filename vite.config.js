import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const proxyTarget = env.VITE_BACKEND_URL || 
    (env.VITE_API_BASE_URL && env.VITE_API_BASE_URL.startsWith('http') ? env.VITE_API_BASE_URL : 'http://localhost:3000');

  return {
    plugins: [vue()],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
        }
      }
    }
  };
});

