import { UserButton } from "@clerk/nextjs";

const page = () => {
  return (
    <div>
      Home page <UserButton />
    </div>
  );
}
export default page