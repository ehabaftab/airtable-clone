import React, { useState, useEffect } from "react";
import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import { api } from "~/utils/api";
import { LoadingPage } from "../loading";
import { VscAdd } from "react-icons/vsc";

export const Table = ({ tableId }: { tableId: number }) => {
  const { mutate, isPending: isMutating } = api.value.update.useMutation({});
  const { data, isLoading } = api.table.getTableData.useQuery({ tableId });

  // Mutation to add a column to the database
  //   const { mutate: addColumnMutate } = api.table.addColumn.useMutation();

  const table = useReactTable({
    data: data?.data ?? [],
    columns: data?.columns ?? [],
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
  });

  if (isLoading || isMutating) return <LoadingPage />;

  return (
    <div className="overflow-x-auto">
      <table
        className="table-auto border-gray-300"
        style={{ width: table.getTotalSize() }}
      >
        <thead className="border">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="relative border-r px-4 py-2 text-center font-medium last:border-none"
                  style={{ width: header.getSize() }}
                >
                  {header.column.columnDef.header?.toString()}
                  <div
                    className="absolute right-0 top-0 h-full w-[5px] rounded-md bg-blue-500 opacity-0 hover:cursor-col-resize hover:opacity-100"
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                  ></div>
                </th>
              ))}
              {/* Add Column Header */}
              <th className="border-l border-gray-300 px-4 py-2 text-center font-medium hover:cursor-pointer hover:bg-white">
                <div
                  className="flex h-full w-full items-center justify-center text-black"
                  title="Add column"
                >
                  <VscAdd />
                </div>
              </th>
            </tr>
          ))}
        </thead>
        <tbody className="divide-y">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="h-full w-full text-center last:border-none"
                  style={{ width: cell.column.getSize() }}
                >
                  {/* Editable Input */}
                  <input
                    type="text"
                    className="text-center outline-none focus:ring focus:ring-blue-200"
                    defaultValue={cell.getValue() as string}
                    onBlur={(e) => {
                      const newValue = e.target.value;

                      mutate(
                        { id: row.original.id as number, value: newValue },
                        {
                          onSuccess: (updatedValue) => {
                            console.log(
                              "Value updated successfully:",
                              updatedValue,
                            );
                          },
                        },
                      );
                    }}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
