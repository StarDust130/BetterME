import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { BadgePlus } from "lucide-react";

const NoDataFound = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full text-center">
      <div className="bg-white rounded-xl">
        <Image
          src="/no-data.png"
          width={300}
          height={300}
          alt="No-Data-Found"
        />
      </div>
      <h1 className="text-xl md:text-2xl mt-4">No Today Activity Found</h1>
      <Button asChild variant={"outline"}>
        <Link href={"/create"} className="flex justify-center items-center gap-2 mt-2">
          <BadgePlus /> Create
        </Link>
      </Button>
    </div>
  );
};

export default NoDataFound;
