import { Separator } from "@/components/ui/separator";
import MiniCardBox from "./MiniCardBox";
import StatsList from "./StatsList";
// import StatsPrefer from "./StatsPrefer";

const StatsPage = () => {
  return (
    <div className="min-h-screen w-full max-w-3xl md:mx-auto flex flex-col items-center pt-5 pb-10">
      {/* <StatsPrefer /> */}
      <MiniCardBox />
      <Separator className="mt-3" />
      <StatsList />
    </div>
  );
};

export default StatsPage;
