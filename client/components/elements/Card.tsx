import ShowDialog from "./ShowDialog";

// Define the types for card data
interface CardData {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  id: string;
}

// Define the props for the Card component with a generic type
interface CardProps<T> {
  data: T; // The data can be any type that conforms to the CardData structure
}


const Card = <T extends CardData>({ data }: CardProps<T>) => {
    console.log(data);
  return (
    <div
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
        <p className="text-base text-gray-200">
          Stay on top of your {data.title.toLowerCase()} in style.
        </p>
        {/* Button */}
        <ShowDialog data={data.title} />
      </div>
    </div>
  );
};

export default Card;
