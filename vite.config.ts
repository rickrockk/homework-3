import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfig from './tsconfig.json';
import parseTsConfigPaths from "./aliasUtil";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: parseTsConfigPaths(tsconfig.compilerOptions.paths),
  },
})
