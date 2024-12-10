import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { BadgePlus } from "lucide-react";

interface NoDataFoundProps {
  url?: string;
  title?: string;
}

const NoDataFound = ({ url, title }: NoDataFoundProps) => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full text-center">
      <h1 className="text-xl my-2 md:text-2xl mt-4 text-gray-800 dark:text-gray-200 font-semibold flex items-center space-x-2">
        <span>{title || "No Data Found"}</span>
      </h1>
      <div className=" rounded-xl">
        <Image
          src={`/${url || "no-data.png"}`}
          width={150}
          height={150}
          alt="No-Data-Found"
          className="md:hidden"
        />
        <Image
          src={`/${url || "no-data.png"}`}
          width={300}
          height={300}
          alt="No-Data-Found"
          className="hidden md:block"
        />
      </div>

      <Button asChild variant={"outline"} size={"sm"}>
        <Link
          href={"/create"}
          className="flex justify-center items-center gap-2 mt-2"
        >
          <BadgePlus /> Create
        </Link>
      </Button>
    </div>
  );
};

export default NoDataFound;
