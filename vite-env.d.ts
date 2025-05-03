interface ImportMetaEnv {
    VITE_PRODUCTION_API_URL: string;
    VITE_DEVELOPMENT_API_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }