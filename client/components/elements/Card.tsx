import ShowDialog from "./ShowDialog";

// Define the types for card data
export interface CardData {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  id: string;
  example: string;
  desc: string;
}

// Define the props for the Card component with a generic type
interface CardProps<T> {
  data: T; // The data can be any type that conforms to the CardData structure
}

const Card = <T extends CardData>({ data }: CardProps<T>) => {
  return (
    <div
      suppressHydrationWarning
      className={`relative p-6 rounded-2xl shadow-xl transform md:hover:scale-105 transition-all bg-gradient-to-tr ${data.color} `}
    >
      {/* Icon */}
      <data.icon className="absolute top-4 right-4 w-10 h-10 opacity-70 text-white" />
      <div className="flex flex-col items-start">
        {/* Title */}
        <h2 className="text-2xl opacity-90 font-semibold text-white mb-3">
          {data.title}
        </h2>
        {/* Description */}
        <p className="text-base text-gray-200">{data.desc}</p>
        {/* Button */}
        <div suppressHydrationWarning>
          <ShowDialog data={data}  />
        </div>
      </div>
    </div>
  );
};

export default Card;
