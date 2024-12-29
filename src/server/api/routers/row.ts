import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const rowRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ tableId: z.number() }))
    .query(async ({ ctx, input }) => {
      const rows = await ctx.db.row.findMany({
        where: { tableId: input.tableId },
        orderBy: { createdAt: "desc" },
      });

      return rows;
    }),

  create: privateProcedure
    .input(z.object({ tableId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const row = await ctx.db.row.create({
        data: { tableId: input.tableId },
      });
      return row;
    }),
});
