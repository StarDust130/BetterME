import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { Stats } from "./StatsPage";

interface PaginationControlsProps {
  table: Table<Stats>;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ table }) => (
  <div className="flex items-center justify-end space-x-2 py-4">
    <div className="flex-1 text-sm text-muted-foreground">Babu is Best 😙</div>
    <div className="space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  </div>
);

export default PaginationControls;
