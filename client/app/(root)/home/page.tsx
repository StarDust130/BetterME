import List from "@/components/elements/List";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MiniList from "@/components/elements/MiniList";
import GithubInfo from "@/components/elements/GitHub/GithubInfo";

const Page = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  // Fetch quotes directly
  const response = await fetch("https://zenquotes.io/api/random");
  const data = await response.json();
  const quote = data[0]; // Access the first item in the array

  return (
    <main className="flex flex-col  items-center w-full  p-4 min-h-screen">
      <h1 className="text-xl font-bold text-center mb-6 md:text-4xl">
        Hello, {user?.firstName || "Guest"} 😊
      </h1>

      <div className="border  max-w-3xl w-full p-6 rounded-lg dark:shadow-gray-500 dark:shadow-sm  shadow-xl">
        <blockquote className="text-xl md:text-2xl italic font-light text-center">
          &quot;{quote.q}&quot;
        </blockquote>
        <p className="mt-4 text-right text-lg md:text-xl font-semibold text-primary">
          - {quote.a}
        </p>
      </div>

      <Tabs
        defaultValue="overview"
        className=" text-right w-full md:max-w-3xl mx-auto mt-2"
      >
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="github">Github</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="mx-auto w-full">
          <MiniList />
          <List />
        </TabsContent>
        <TabsContent value="github">
         <GithubInfo />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default Page;
