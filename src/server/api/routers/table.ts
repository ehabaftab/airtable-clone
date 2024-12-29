import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const tableRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({ baseId: z.number() }))
    .query(async ({ ctx, input }) => {
      const tables = await ctx.db.table.findMany({
        where: { baseId: input.baseId },
        orderBy: { createdAt: "desc" },
      });

      return tables;
    }),

  getById: publicProcedure
    .input(z.object({ tableId: z.number() }))
    .query(async ({ ctx, input }) => {
      const table = await ctx.db.table.findUnique({
        where: { id: input.tableId },
      });

      return table;
    }),

  create: privateProcedure
    .input(z.object({ baseId: z.number(), name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const table = await ctx.db.table.create({
        data: { baseId: input.baseId, name: input.name },
      });
      return table;
    }),

  getTableData: privateProcedure
    .input(
      z.object({
        tableId: z.number(), // Input to identify the table
      }),
    )
    .query(async ({ ctx, input }) => {
      const columns = await ctx.db.column.findMany({
        where: { tableId: input.tableId },
        select: { id: true, name: true },
      });

      const rows = await ctx.db.row.findMany({
        where: { tableId: input.tableId },
        select: { id: true },
      });

      const values = await ctx.db.value.findMany({
        where: {
          rowId: { in: rows.map((row) => row.id) },
          columnId: { in: columns.map((column) => column.id) },
        },
        select: { rowId: true, columnId: true, value: true },
      });

      // Organize data into a format suitable for TanStack Table
      const data = rows.map((row) => {
        const rowData: Record<string, string | number> = { id: row.id }; // Include row ID for unique key
        columns.forEach((column) => {
          const cell = values.find(
            (value) => value.rowId === row.id && value.columnId === column.id,
          );
          rowData[column.name] = cell?.value ?? ""; // Use column name as key
        });
        return rowData;
      });
      return {
        columns: columns.map((column) => ({
          id: column.id,
          accessorKey: column.name,
          header: column.name,
        })),
        data,
      };
    }),
});
