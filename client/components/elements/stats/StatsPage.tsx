import { Button } from "@/components/ui/button";
import { Chart } from "./Chart";
import MiniCardBox from "./MiniCardBox";

const buttons = [
  { label: "Expenses" },
  { label: "JunkFood" },
  { label: "Habits" },
  { label: "Todos" },
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
              className="flex-shrink-0 flex items-center gap-2 px-4 py-3 text-xs md:text-base rounded-lg "
            >
              <span className="font-medium md:font-base md:text-center">
                {label}
              </span>
            </Button>
          ))}
        </div>

        {/* Chart Section */}
        <div className="w-full mt-3 overflow-x-auto no-scrollbar md:overflow-visible">
          <div className="flex md:grid md:grid-cols-2 gap-4">
            <Chart />
            <Chart />
            <Chart />
            <Chart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
