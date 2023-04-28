import { createTRPCRouter } from "~/server/trpc";
import { aiRouter } from "./ai";

export const appRouter = createTRPCRouter({
	ai: aiRouter
});

export type AppRouter = typeof appRouter;