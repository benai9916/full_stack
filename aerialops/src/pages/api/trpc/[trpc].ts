import * as trpcNext from "@trpc/server/adapters/next";
import { AppRouter, appRouter } from "@/server/router";
import { createContext } from "@/server/createContext";

export default trpcNext.createNextApiHandler<AppRouter>({
  router: appRouter,
  createContext,
});
