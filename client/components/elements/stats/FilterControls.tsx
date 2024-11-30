import { Input } from "@/components/ui/input";
import { DatePicker } from "../DatePicker";
import ColumnToggleDropdown from "./ColumnToggleDropdown";
import { Stats } from "./StatsPage";
import { Table } from "@tanstack/react-table";

interface FilterControlsProps {
  table: Table<Stats>;
}

// Component for filter controls
const FilterControls: React.FC<FilterControlsProps> = ({ table }) => (
  <div className="md:flex items-center justify-between py-4 gap-4">
    <Input
      placeholder="Filter emails..."
      value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
      onChange={(event) =>
        table.getColumn("email")?.setFilterValue(event.target.value)
      }
      className="max-w-sm"
    />

    <div className="flex justify-between flex-row-reverse md:flex-row mt-3 md:mt-0 md:justify-end md:ml-auto w-full items-center gap-2">
      <DatePicker />
      <ColumnToggleDropdown table={table} />
    </div>
  </div>
);

export default FilterControls;