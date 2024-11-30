import { ColumnDef } from "@tanstack/react-table";
import { Stats } from "./StatsPage";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, Calendar, EllipsisVertical, MoreHorizontal, SmilePlus } from "lucide-react";

const columns: ColumnDef<Stats>[] = [
  {
    accessorKey: "mood",
    header: () => {
      return (
        <Button
          variant="ghost"
          className="text-left md:text-center w-4 md:w-full"
        >
          Mood
          <SmilePlus />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("mood")}</div>,
  },
  {
    accessorKey: "date",
    header: () => {
      return (
        <Button variant="ghost" className="text-center  w-full">
          Date
          <Calendar />
        </Button>
      );
    },
    cell: ({ row }) => <div className="capitalize">{row.getValue("date")}</div>,
  },
  {
    accessorKey: "junkFood",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-center  w-full"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          JunkFood
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("junkFood")}</div>
    ),
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="hidden md:block" />
              <EllipsisVertical className="md:hidden" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default columns;
