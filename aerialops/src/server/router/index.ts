import { createRouter } from "../createRouter";
import superjson from "superjson";

import { chatRouter } from "./chat";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("msg.", chatRouter)

export type AppRouter = typeof appRouter;
