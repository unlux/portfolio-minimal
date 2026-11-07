import { defineConfig } from "prisma/config";

// Prisma 7 no longer reads .env itself; Next.js still does for the app.
try {
  process.loadEnvFile();
} catch {}

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
