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
    <Card className="flex items-center justify-between p-4 w-full rounded-2xl shadow-md hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300">
      <div className="flex flex-col">
        <h1 className="text-sm font-medium  tracking-wide">
          {data.title}
        </h1>
        <p className="text-2xl font-semibold  mt-1">{data.value}</p>
      </div>
      <div className="flex items-center justify-center w-12 h-12 rounded-xl ">
        {data.icon}
      </div>
    </Card>
  );
};

export default MiniCardStats;
