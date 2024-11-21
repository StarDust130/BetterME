import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

const Header = () => {
  return (
    <header className="flex justify-between items-center  top-0  w-full px-3 md:px-6 py-2">
        
      <Link className="flex justify-start items-center gap-1" href={"/"}>
        <Image src="/logo.png" alt="BetterMe" width={30} height={30} />
        <h1 className="text-2xl  hidden md:block font-semibold">BetterME</h1>
      </Link>

      <div className="flex justify-end items-center gap-3">
        <ModeToggle />
        <Button asChild>
          <Link href={"/sign-in"}>Sign In</Link>
        </Button>
      </div>
    </header>
  );
};
export default Header;
