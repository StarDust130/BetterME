/* eslint-disable @typescript-eslint/no-explicit-any */
import ShowDialog from "../ShowDialog";

// Define the types for card data
export interface CardData {
  title: string;
  icon?: any;
  color: string;
  id: string;
  example?: string;
  desc: string;
}

// Define the Card component
const Card = <T extends CardData>({ data }: { data: T }) => {
  return (
    <div
      suppressHydrationWarning
      className={`relative p-6 rounded-2xl shadow-xl transform md:hover:scale-105 transition-all bg-gradient-to-tr ${data.color}`}
    >
      {/* Render the icon here */}
      <data.icon className="absolute top-4 right-4 w-10 h-10 opacity-70 text-white" />
      <div className="flex flex-col items-start">
        <h2 className="text-2xl opacity-90 font-semibold text-white mb-3">
          {data.title}
        </h2>
        <div className="text-base text-gray-200">{data.desc}</div>

        {/* Pass only serializable data to ShowDialog */}
        <ShowDialog title={data.title} />
      </div>
    </div>
  );
};

export default Card;
