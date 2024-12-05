import { Button } from "@/components/ui/button";
import Link from "next/link";

export const GitHubCard: React.FC<{
  icon: React.ReactNode;
  title: React.ReactNode;
  buttonLabel?: string;
  buttonLink?: string;
}> = ({ icon, title, buttonLabel, buttonLink }) => (
  <div className="flex justify-between items-center p-6 border rounded-lg shadow-sm bg-gray-50">
    <div className="flex items-center gap-2 text-gray-700">
      {icon}
      <span className="text-sm">{title}</span>
    </div>
    {buttonLabel && buttonLink && (
      <Link target="_blank" href={buttonLink}>
        <Button className="bg-blue-500 text-black  hover:bg-blue-700 px-4 py-2 rounded-lg">
          {buttonLabel}
        </Button>
      </Link>
    )}
  </div>
);
