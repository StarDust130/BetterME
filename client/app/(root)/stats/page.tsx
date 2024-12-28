// import DatePicker from "@/components/elements/stats/DatePicker";
import StatsPage from "@/components/elements/stats/StatsPage";
import { currentUser } from "@clerk/nextjs/server";

const Page = async () => {
  const user = await currentUser();
  return (
    <main className="flex flex-col  items-center w-full  p-4 min-h-screen">
      <div className="w-full max-w-3xl p-6 rounded-lg bg-[#2E2E2E] dark:shadow-gray-500 dark:shadow-sm  shadow-xl">
        <h1 className="text-xl font-bold w-full  text-left mb-6 md:text-4xl">
          Hi {user?.firstName || "Guest"}! 😉
        </h1>
      </div>

      <StatsPage />
    </main>
  );
};
export default Page;
