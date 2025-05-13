import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials:{
    url:'postgresql://accounts:npg_5wBxLmcv2biq@ep-curly-paper-a832lo4b-pooler.eastus2.azure.neon.tech/PrepSync?sslmode=require'
  }
});
