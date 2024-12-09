/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { getClerkUserID } from "@/lib/action";
import CardBox from "./Cards/CardBox";
import NoDataFound from "./NoDataFound";
import CardSkeleton from "./Cards/CardSkeleton";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { Share } from "lucide-react";
import TodoCards from "./Cards/TodoCards";
import HabitsCards from "./Cards/HabitsCards";

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
      setLoading(true); // Set loading to true
      try {
        const clerkID = await getClerkUserID(); // Get Clerk ID

        // Fetch data from the backend
        const { data: response } = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/today?clerkID=${clerkID}`
        );

        console.log("Today's data:", response);

        // Transform data
        const transformedData: DataType[] = [
          ...response.data.expenses.map((expense: any) => ({
            _id: expense._id,
            title: expense.title,
            amount: expense.amount,
            type: "expense",
          })),
          ...response.data.junkFood.map((food: any) => ({
            _id: food._id,
            foodName: food.foodName,
            amount: food.amount,
            type: "junkFood",
          })),
        ];

        setData(transformedData); // Safely set the data
      } catch (error) {
        console.error("Error fetching today's data:", error);
        setData([]); // Handle error gracefully
      } finally {
        setLoading(false); // Set loading to false
      }
    };

    fetchTodayExpenses();
  }, []);

  if (loading)
    return (
      <div className="flex gap-2 items-center h-full mb-20 md:mt-10 justify-center">
        <CardSkeleton />
      </div>
    );

  return (
    <>
      <div className=" w-full  px-3 py-3 mb-6 mx-auto">
        {/* Show Today Activity */}
        {data.length === 0 ? (
          <div className="col-span-2 md:col-span-3 lg:col-span-4">
            <NoDataFound />
          </div>
        ) : (
          <div className="w-full flex flex-col gap-3">
            <Separator />

            <div className="flex flex-col md:flex-row justify-center items-center md:justify-between gap-2 md:gap-8 p-4">
              {/* Today Todo */}
              <div className="flex flex-col items-center w-full md:w-auto text-center   rounded-lg p-4">
                <h1 className="text-lg font-semibold mb-2  md:text-xl">
                  Today’s Todo
                </h1>
                <TodoCards />
              </div>

              <Separator className="w-full h-px  md:hidden my-2" />

              {/* Today Habits */}
              <div className="flex flex-col items-center w-full md:w-auto text-center   rounded-lg p-4">
                <h1 className="text-lg font-semibold  md:text-xl mb-2">
                  Today’s Habits
                </h1>
                <HabitsCards />
              </div>
            </div>

            <Separator />

            {/* Today Activity */}

            <div className="flex justify-between items-center w-full  py-4  rounded-lg">
              <h1 className="flex-grow text-center text-xl ml-6 md:text-2xl  font-semibold">
                Today’s Activity
              </h1>
              <Button
                className="flex items-center gap-2 text-sm md:text-base pl-4 py-2  rounded-lg transition-colors duration-300"
                variant={"outline"}
              >
                <Share className="w-5 h-5" />
                <span className="hidden md:block">Share</span>
              </Button>
            </div>

            {/* Card Box of Today Activity  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
              {data.map((item) => (
                <CardBox data={item} key={item._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default List;
