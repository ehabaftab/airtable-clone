import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const baseRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const bases = await ctx.db.base.findMany();

    return bases;
  }),
});
