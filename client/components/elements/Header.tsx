import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between items-center  top-0  w-full px-6">
      <Link href={"/"}>
        <Image src="/logo.png" alt="BetterMe" width={50} height={50} />
      </Link>

      <div>
        <Button asChild>
          <Link href={"/sign-in"}>Sign In</Link>
        </Button>
      </div>
    </header>
  );
};
export default Header;
