import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const baseRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const bases = await ctx.db.base.findMany({
      orderBy: { createdAt: "desc" },
    });

    return bases;
  }),

  create: privateProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;
      const base = await ctx.db.base.create({
        data: { authorId, type: "base", name: input.name },
      });
      return base;
    }),
});
