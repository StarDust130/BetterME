import { Chart } from "./Chart";
import MiniCardBox from "./MiniCardBox";

const StatsPage = () => {
  return (
    <div className="min-h-screen w-full  max-w-3xl md:mx-auto  flex flex-col items-center pt-5 pb-10">
      <MiniCardBox />

      <div className="mt-5">
        <Chart />
        <Chart />
      </div>
    </div>
  );
};

export default StatsPage;
