import { PrismaClient } from '@prisma/client';

declare global {
    var prisma: PrismaClient | undefined;  // Declaring the global prisma client
}

export { };

