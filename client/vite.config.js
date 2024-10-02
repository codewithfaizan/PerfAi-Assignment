import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import 'bootstrap/dist/css/bootstrap.min.css';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    styleImport({
      libs: [
        {
          libraryName: 'bootstrap',
          esModule: true,
          resolveStyle: (name) => `bootstrap/dist/css/${name}.css`,
        },
      ],
    }),
  ],
});
