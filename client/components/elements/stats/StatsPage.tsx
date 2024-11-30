"use client";

import * as React from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import columns from "./Columns";

import StatsHeader from "./StatsHeader";
import FilterControls from "./FilterControls";
import DataTable from "./DataTable";
import PaginationControls from "./PaginationControls";

const data: Stats[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    date: "today",
    junkFood: "No",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    date: "yestaday",
    junkFood: "Pasta",
  },
  {
    id: "derv1ws0",
    amount: 837,
    date: "28-11-2024",
    junkFood: "Momos,fanta,cake",
  },
  {
    id: "5kma53ae",
    amount: 874,
    date: "27-11-2024",
    junkFood: "gupchup",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    date: "26-11-2024",
    junkFood: "Chocolate",
  },
];

export type Stats = {
  id: string;
  amount: number;
  date: Date | string;
  junkFood: string;
};

const StatsPage: React.FC = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <>
      <StatsHeader />
      <div
        className="w-full px-3 md:px-10 mx-auto py-5 mb-10"
        suppressHydrationWarning
      >
        <FilterControls table={table} />
        <DataTable table={table} columns={columns} />
        <PaginationControls table={table} />
      </div>
    </>
  );
};

export default StatsPage;
