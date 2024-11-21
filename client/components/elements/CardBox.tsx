import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DailyStats } from "./List";

const CardBox = ({ data }: { data: DailyStats }) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{data.topic}</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{data?.items || data?.amount }</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  );
};
export default CardBox;
