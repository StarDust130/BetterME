import { Card } from "@/components/ui/card";

interface MiniCardStatsProps {
  data: {
    title: string;
    value: number | string;
    icon: React.ReactNode;
  };
}

const MiniCardStats = ({ data }: MiniCardStatsProps) => {
  return (
    <Card className=" p-4 0 rounded-3xl border-none shadow-md hover:shadow-lg transition-all duration-300">
      <h3 className="text-sm md:text-base mb-2 w-full font-bold">
        {data.title}
      </h3>
      <div className="flex items-center justify-between">
        <div className="md:text-xl">{data.value}</div>
        <div className="md:text-4xl">{data.icon}</div>
      </div>
    </Card>
  );
};

export default MiniCardStats;
