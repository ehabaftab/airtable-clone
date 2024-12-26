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
  updateName: privateProcedure
    .input(z.object({ id: z.number(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.userId;
      const base = await ctx.db.base.update({
        data: { name: input.name },
        where: { id: input.id, authorId: authorId },
      });
      return base;
    }),

  getById: privateProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const authorId = ctx.userId;
      const base = await ctx.db.base.findUnique({
        where: { id: input.id, authorId: authorId },
      });
      return base;
    }),
});
