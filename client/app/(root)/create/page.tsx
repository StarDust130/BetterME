import Card from "@/components/elements/Cards/Card";
import { cardData } from "@/lib/constants";

const Page = () => {
  return (
    <div
      suppressHydrationWarning
      className="flex flex-col items-center w-full min-h-screen  p-6"
    >
      {/* Page Header */}
      <h1 className="text-3xl md:text-5xl font-bold  bg-clip-text mb-6">
        Your Daily Hub 📝
      </h1>
      <p className="text-center text-gray-400 text-sm md:text-lg mb-8 max-w-xl">
        Simplify your day—track expenses, manage tasks, and log your habits with
        ease!
      </p>

      {/* Cards Container */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-3xl sm:max-w-5xl">
        {cardData.map((card) => (
          <Card data={card} key={card.id} />
        ))}         
      </div>

      {/* Footer */}
      <div className="my-8 md:my-40 text-center">
        <p className="text-gray-400 text-sm">
          Start building your productive habits today! 🚀
        </p>
      </div>
    </div>
  );
};

export default Page;
