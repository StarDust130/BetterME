"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { getClerkUserID } from "@/lib/action";
import CardBox from "./CardBox";
import { Loader } from "lucide-react";
import NoDataFound from "./NoDataFound";

export interface DataType {
  _id: string;
  title?: string;
  amount?: number;
  category?: string;
  foodName?: string;
  isEatenToday?: boolean;
  type: "expense" | "junkFood"; // Added type property to distinguish between expense and junk food
}

const List = () => {
  const [data, setData] = useState<DataType[]>([]); // Data will hold both expenses and junk food
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTodayExpenses = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/global/todayActivity`,
          { params: { clerkID: await getClerkUserID() } }
        );
        console.log("Today's expenses:", data);

        // Assuming the fetched data contains both expenses and junk food with a 'type' field.
        setData(data.data || []); // Set data with 'type' field
      } catch (error) {
        console.error("Error fetching today's data:", error);
        setData([]); // Handle error gracefully
      } finally {
        setLoading(false);
      }
    };

    fetchTodayExpenses();
  }, []);

  if (loading)
    return (
      <div className="flex gap-2 items-center h-full mt-10 justify-center">
        Loading... <Loader className="animate-spin" />
      </div>
    );

  // Separate data into expenses and junk food

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 w-full lg:grid-cols-4 gap-4 px-3 py-3 mb-6 mx-auto">
        {/* Show Expenses */}
        {data.length === 0 ? (
          <div className="col-span-2 md:col-span-3 lg:col-span-4">
            <NoDataFound />
          </div>
        ) : (
          data.map((data) => <CardBox data={data} key={data._id} />)
        )}
      </div>
    </>
  );
};

export default List;
