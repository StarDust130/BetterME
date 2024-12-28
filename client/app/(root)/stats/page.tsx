// import DatePicker from "@/components/elements/stats/DatePicker";
import StatsPage from "@/components/elements/stats/StatsPage";
import { Card } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import { CalendarIcon } from "lucide-react";

const Page = async () => {
  const user = await currentUser();
  return (
    <main className="flex flex-col items-center w-full p-4 min-h-screen ">
      {/* Welcome Card */}
      <Card className="flex flex-col items-start w-full md:w-[80%] p-6 mx-auto shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col w-full mb-6">
          {/* Header Section */}
          <div className="flex items-center justify-between w-full mb-4">
            <h1 className="text-lg md:text-2xl font-medium md:font-semibold leading-tight">
              Hi, {user?.firstName || "Guest"}
              <span className="ml-1 text-yellow-400 animate-bounce">🌟</span>
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold py-1 px-2 bg-green-100 text-green-800 rounded-full shadow-sm">
                Active
              </span>
              <CalendarIcon className="w-6 h-6 text-gray-500 hover:scale-110 transition-transform duration-200" />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4 shadow-inner">
            <div
              className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 h-2 rounded-full animate-pulse"
              style={{ width: "60%" }}
            ></div>
          </div>

          {/* Insights Section */}
          <p className="text-sm md:text-base leading-relaxed">
            You are on track, completing{" "}
            <span className="font-semibold text-green-600">60%</span> of your
            tasks! <span className="text-yellow-500">👍</span>
          </p>
          <p className="mt-3 px-4 py-3 text-sm bg-yellow-100 text-yellow-700 border-l-4 border-yellow-500 rounded-md flex items-center gap-2 shadow">
            <span className="text-lg">🚀</span> Keep an eye on your progress and
            maintain consistency!
          </p>
        </div>
      </Card>

      {/* Additional Stats */}
      <StatsPage />
    </main>
  );
};

export default Page;
