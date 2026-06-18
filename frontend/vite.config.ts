import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Output to ../app/static so `npm run build` from frontend/ populates the directory
// that FastAPI serves. In Docker, the Dockerfile copies this output into the image.
// The base path is './' (relative) so asset URLs work regardless of the /{slug}-{env}
// prefix, which is only known at container runtime.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: '../app/static',
    emptyOutDir: true,
  },
})
