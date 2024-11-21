import { currentUser } from "@clerk/nextjs/server";

const Page = async () => {
  const user = await currentUser();

  // Fetch quotes directly
  const response = await fetch("https://zenquotes.io/api/today");
  const data = await response.json();
  const quote = data[0]; // Access the first item in the array

  return (
    <main className="flex flex-col  items-center w-full  p-4">
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
    </main>
  );
};

export default Page;
