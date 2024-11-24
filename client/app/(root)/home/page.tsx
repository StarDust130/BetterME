/* eslint-disable @next/next/no-img-element */
import List from "@/components/elements/List";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const Page = async () => {
  const user = await currentUser();

  if(!user){
    redirect("/sign-in")
  }

  // Fetch quotes directly
  const response = await fetch("https://zenquotes.io/api/random");
  const data = await response.json();
  const quote = data[0]; // Access the first item in the array

  return (
    <main className="flex flex-col  items-center w-full  p-4 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-6 md:text-4xl">
        Hello 😊, {user?.firstName || "Guest"}
      </h1>
      <div className="bg-gray-100 dark:bg-neutral-800  max-w-3xl w-full p-6 rounded-lg shadow-lg">
        <blockquote className="text-xl md:text-2xl italic font-light text-center">
          &quot;{quote.q}&quot;
        </blockquote>
        <p className="mt-4 text-right text-lg md:text-xl font-semibold text-primary">
          - {quote.a}
        </p>
      </div>
      <img
        src={`https://github-readme-activity-graph.vercel.app/graph?username=StarDust130&theme=react`}
        alt="Activity Graph"
        className="mt-6 w-full  md:max-w-2xl"
      />
      <List />
    </main>
  );
};

export default Page
