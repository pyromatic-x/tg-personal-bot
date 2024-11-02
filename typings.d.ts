declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      MONGO_CONNECTION_STRING: string;
    }
  }
}

export {};
