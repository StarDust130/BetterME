import { currentUser } from "@clerk/nextjs/server";

const page = async () => {
  const user = await currentUser();
  return (
    <>
      <h1 className=" text-2xl  mx-auto w-full text-center md:text-4xl">Hello 😊, {user?.firstName}</h1>
    </>
  );
};
export default page;
