import MiniCardBox from "./MiniCardBox";
import StatsList from "./StatsList";

const StatsPage = () => {
  return (
    <div className="min-h-screen w-full max-w-3xl md:mx-auto flex flex-col items-center pt-5 pb-10">
      <MiniCardBox />
      <StatsList />
    </div>
  );
};

export default StatsPage;
