import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const columnRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ tableId: z.number() }))
    .query(async ({ ctx, input }) => {
      const columns = await ctx.db.column.findMany({
        where: { tableId: input.tableId },
        orderBy: { createdAt: "desc" },
      });

      return columns;
    }),

  create: privateProcedure
    .input(
      z.object({ tableId: z.number(), name: z.string(), type: z.string() }),
    )
    .mutation(async ({ ctx, input }) => {
      const column = await ctx.db.column.create({
        data: { tableId: input.tableId, name: input.name, type: input.type },
      });
      return column;
    }),
});
