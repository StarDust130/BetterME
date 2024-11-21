import CardBox from "./CardBox";

export interface DailyStats {
  topic: string;
  items?: string[];
  calories?: number;
  amount?: string;
  categories?: string[];
  hours?: number;
  focusLevel?: string;
  task?: string;
  dueInDays?: number;
}

const dailyStats = [
  {
    topic: "What junk I eat today",
    items: ["Pizza", "Ice Cream", "Burger", "Chips"],
    calories: Math.floor(Math.random() * 1500) + 500, // Random calories (500-2000)
  },
  {
    topic: "How much money I spend",
    amount: `$${(Math.random() * 100).toFixed(2)}`, // Random amount (0-100 USD)
    categories: ["Food", "Travel", "Subscriptions", "Shopping"],
  },
  {
    topic: "How many hours I code",
    hours: Math.floor(Math.random() * 10) + 1, // Random hours (1-10)
    focusLevel: ["High", "Moderate", "Low"][Math.floor(Math.random() * 3)], // Random focus level
  },
  {
    topic: "Upcoming deadline",
    task: [
      "Finish project",
      "Submit assignment",
      "Prepare for meeting",
      "Debug app",
    ][Math.floor(Math.random() * 4)], // Random task
    dueInDays: Math.floor(Math.random() * 7) + 1, // Random days (1-7)
  },
];

const List = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-col-4 gap-4 px-3 py-3 mb-6 w-full">
      {dailyStats.map((data: DailyStats) => {
        return <CardBox data={data} key={data.topic} />;
      })}
    </div>
  );
};
export default List;
