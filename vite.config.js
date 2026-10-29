import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite runs the React development server.
export default defineConfig({ plugins: [react()] });
