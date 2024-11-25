import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
const JunkFood = () => {
  return (
    <>
      <div>
        <Label className="block text-sm font-medium mb-2">Food Name</Label>
        <Input
          placeholder="e.g. Pizza... again"
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 "
        />
      </div>
      <div>
        <Label className="block text-sm font-medium mb-2">Is Eaten Today</Label>
        <Select>
          <SelectTrigger className="w-full px-3 py-2 border rounded-lg flex items-center justify-between focus:ring-2 ">
            <SelectValue placeholder="Yes or No" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Yes</SelectItem>
            <SelectItem value="no">No</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </>
  );
};
export default JunkFood;
