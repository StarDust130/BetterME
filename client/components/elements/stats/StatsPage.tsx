import { Button } from "@/components/ui/button";
import { Chart } from "./Chart";
import MiniCardBox from "./MiniCardBox";

const buttons = [
  { label: "All" },
  { label: "Today" },
  { label: "Week" },
  { label: "Month" },
  { label: "Year" },
];

const StatsPage = () => {
  return (
    <div className="min-h-screen w-full max-w-3xl md:mx-auto flex flex-col items-center pt-5 pb-10">
      <MiniCardBox />

      <div className="mt-5 w-full">
        {/* Horizontal Scrollable Buttons */}
        <div className="flex w-full overflow-x-auto no-scrollbar md:justify-center space-x-4 p-2">
          {buttons.map(({ label }, index) => (
            <Button
              key={index}
              variant="secondary"
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 text-xs md:text-base rounded-lg "
            >
              <span className="font-medium md:font-base md:text-center">
                {label}
              </span>
            </Button>
          ))}
        </div>

        {/* Chart Section */}
        <Chart />
      </div>
    </div>
  );
};

export default StatsPage;
