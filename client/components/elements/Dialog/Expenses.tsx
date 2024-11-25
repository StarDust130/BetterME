import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Expenses = () => {
  if (typeof window === "undefined") return null;
  return (
    <>
      <div>
        <Label className="block text-sm font-medium mb-2">Title</Label>
        <Input
          placeholder={"e.g. Spent 200 on snacks"}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 "
        />
      </div>
      <div>
        <Label className="block text-sm font-medium mt-4 mb-2">
          Enter Amount <span className="text-red-600">*</span>
        </Label>
        <Input
          placeholder="e.g. 100"
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 "
        />
      </div>
    </>
  );
};
export default Expenses;
