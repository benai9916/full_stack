import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { PrismaClient } from "@prisma/client";

export async function createContext(ctx: trpcNext.CreateNextContextOptions) {
  const { req, res } = ctx;
  const prisma = new PrismaClient();
  await prisma.$connect()
  return {
    req,
    res,
    prisma,
  };
}
export type Context = trpc.inferAsyncReturnType<typeof createContext>;