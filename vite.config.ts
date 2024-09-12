import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': {
      REACT_APP_API_KEY: process.env.REACT_APP_API_KEY,
      REACT_APP_AUTH_DOMAIN: process.env.REACT_APP_AUTH_DOMAIN,
      REACT_APP_PROJECT_ID: process.env.REACT_APP_PROJECT_ID,
      REACT_APP_STORAGE_BUCKET: process.env.REACT_APP_STORAGE_BUCKET,
      REACT_APP_MESSAGING_SENDER_ID: process.env.REACT_APP_MESSAGING_SENDER_ID,
      REACT_APP_APP_ID: process.env.REACT_APP_APP_ID,
      REACT_APP_MEASUREMENT_ID: process.env.REACT_APP_MEASUREMENT_ID,
    },
  },
});