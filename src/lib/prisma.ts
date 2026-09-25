import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Dapatkan URL koneksi & berikan fallback aman agar build Vercel tidak crash
const connectionString = process.env.DATABASE_URL || "postgresql://placeholder:placeholder@localhost:5432/db";

const adapter = new PrismaPg({
  connectionString,
});

// ⚠️ PASSING 'adapter' KE PrismaClient MANDATORI DI PRISMA 7
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;