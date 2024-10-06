/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_CLERK_PUBLISHABLE_KEY: string | undefined;
    VITE_CLERK_FRONTEND_API: string | undefined;
    VITE_IMAGE_KIT_ENDPOINT: string | undefined;
    VITE_IMAGE_KIT_PUBLIC_KEY: string | undefined;
  }
  
  declare const import.meta: {
    env: ImportMetaEnv;
  };
  