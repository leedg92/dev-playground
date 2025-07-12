// src/config/index.ts
const config = {
    api: {
      boardUrl: import.meta.env.VITE_BOARD_API_URL || 'http://localhost:3000',
      timeout: 10000,
    },
  };
  
  export default config;