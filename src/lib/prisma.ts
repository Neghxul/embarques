import { PrismaClient } from '@prisma/client';

// Previene múltiples instancias de PrismaClient en desarrollo (hot-reloading)
declare global {
  var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalThis.prisma = client;

export default client;