import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const valueRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ rowId: z.number(), columnId: z.number() }))
    .query(async ({ ctx, input }) => {
      const rows = await ctx.db.value.findUnique({
        where: {
          rowId_columnId: { rowId: input.rowId, columnId: input.columnId },
        },
      });

      return rows;
    }),

  create: privateProcedure
    .input(
      z.object({ rowId: z.number(), columnId: z.number(), value: z.string() }),
    )
    .mutation(async ({ ctx, input }) => {
      const value = await ctx.db.value.create({
        data: {
          rowId: input.rowId,
          columnId: input.columnId,
          value: input.value,
        },
      });
      return value;
    }),

  update: privateProcedure
    .input(z.object({ id: z.number(), value: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const value = await ctx.db.value.update({
        data: { value: input.value },
        where: { id: input.id },
      });
      return value;
    }),
});
