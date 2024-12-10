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

export interface TodoType {
  _id: string;
  task: string;
  isCompleted: boolean;
  description?: string;
  priority: "low" | "medium" | "high";
}

const List = () => {
  const [data, setData] = useState<DataType[]>([]); // Data will hold both expenses and junk food
  const [todoData, setTodoData] = useState<TodoType[]>([]);
  const [habitsData, setHabitsData] = useState<any[]>([]); // Habits data
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTodayExpenses = async () => {
      setLoading(true);
      try {
        const clerkID = await getClerkUserID();
        const { data: response } = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/today?clerkID=${clerkID}`
        );

        console.log("Today's data:", response);

        // Transform `expenses` and `junkFood` data
        const transformedData: DataType[] = [
          ...(response.data?.expenses?.map((expense: any) => ({
            _id: expense._id,
            title: expense.title,
            amount: expense.amount,
            type: "expense",
          })) || []),
          ...(response.data?.junkFood?.map((food: any) => ({
            _id: food._id,
            foodName: food.foodName,
            amount: food.amount,
            type: "junkFood",
          })) || []),
        ];

        setData(transformedData);

        // Transform `todo` data
        const todo =
          response.data?.todo?.map((todo: TodoType) => ({
            _id: todo._id,
            task: todo.task,
            priority: todo.priority,
            description: todo.description,
            isCompleted: todo.isCompleted,
          })) || []; // Fallback to empty array

        setTodoData(todo); // Update the state
        console.log("Today's todo 🤖:", todo); // Log the mapped array

        // Transform `habits` data
        const habits =
          response.data?.habits?.map((habit: any) => ({
            _id: habit._id,
            habitName: habit.habitName,
            isCompleted: habit.isCompleted,
          })) || []; // Fallback to empty array

        setHabitsData(habits); // Update the state
        console.log("Today's habits 🧘‍♂️:", habits); // Log the mapped array
      } catch (error) {
        console.error("Error fetching today's data:", error);
        setData([]);
        setTodoData([]); // Ensure `todoData` is also reset on error
      } finally {
        setLoading(false);
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
      <div className="w-full px-3 py-3 mb-6 mx-auto">
        {/* Show Today Activity */}
        {data.length === 0 && todoData.length === 0 ? (
          <div className="col-span-2 md:col-span-3 lg:col-span-4">
            <NoDataFound title="No Today Activity! ✏️ " />
          </div>
        ) : (
          <div className="w-full flex flex-col gap-3">
            <Separator />

            <div className="flex flex-col md:flex-row justify-between items-center">
              {/* Today Todo */}
              {todoData.length > 0 ? (
                <div className="flex flex-col  text-center   md:flex-row justify-center w-full md:max-w-sm items-center md:justify-between gap-2 md:gap-8 p-4">
                  <TodoCards todoData={todoData} setTodoData={setTodoData} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-4">
                 
                  <NoDataFound title="No Todo Found!" url="pencil.png" />
                </div>
              )}

              <Separator className="w-full h-px md:hidden my-2" />

              {/* Today Habits */}
              {habitsData?.length > 0 ? (
                <div className="flex flex-col items-center w-full md:w-auto text-center rounded-lg p-4">
                  <h1 className="text-lg font-semibold md:text-xl mb-2">
                    Today’s Habits
                  </h1>
                  <HabitsCards />
                  {/* habitsData={habitsData} */}
                </div>
              ) : (
                <div className="flex flex-col text-center items-center justify-center py-4">
                  <NoDataFound title="No Habits tracked today" url="dog.png" />
                </div>
              )}
            </div>

            {/* Today Activity */}
            {data.length > 0 ? (
              <>
                {" "}
                <Separator />
                <div className="flex justify-between items-center w-full py-4 rounded-lg">
                  <h1 className="flex-grow text-center text-xl ml-6 md:text-2xl font-semibold">
                    Today’s Activity
                  </h1>
                  <Button
                    className="flex items-center gap-2 text-sm md:text-base pl-4 py-2 rounded-lg transition-colors duration-300"
                    variant={"outline"}
                  >
                    <Share className="w-5 h-5" />
                    <span className="hidden md:block">Share</span>
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
                  {data.map((item) => (
                    <CardBox data={item} key={item._id} />
                  ))}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-4">
                <Separator className="w-full h-px my-2" />
                <NoDataFound
                  title="No activities found for today"
                  url="hand.png"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default List;
