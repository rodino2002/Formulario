import axios from "axios";
interface ImportMetaEnv {
    VITE_PRODUCTION_API_URL: string;
    VITE_DEVELOPMENT_API_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  export const api = axios.create({
    baseURL: import.meta.env.PROD
      ? import.meta.env.VITE_PRODUCTION_API_URL
      : import.meta.env.VITE_DEVELOPMENT_API_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  });