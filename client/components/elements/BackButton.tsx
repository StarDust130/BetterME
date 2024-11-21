"use client";
import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      className="absolute left-3 top-3"
      variant={"outline"}
    >
      <ChevronLeft />
    </Button>
  );
};
export default BackButton;
