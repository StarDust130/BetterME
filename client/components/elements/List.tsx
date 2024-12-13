/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { getClerkUserID } from "@/lib/action";
import CardBox from "./Cards/CardBox";
import NoDataFound from "./NoDataFound";
import { Separator } from "../ui/separator";
import TodoCards from "./Cards/TodoCards";
import HabitsCards from "./Cards/HabitsCards";
import ActivitySkeleton from "./Loading/ActivitySkeleton";

export interface DataType {
  _id: string;
  title?: string;
  amount?: number;
  category?: string;
  foodName?: string;
  isEatenToday?: boolean;
  type: "expenses" | "junkFood";
}

export interface TodoType {
  _id: string;
  task: string;
  isCompleted: boolean;
  description?: string;
  priority: "low" | "medium" | "high";
}

const List = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [todoData, setTodoData] = useState<TodoType[]>([]);
  const [habitsData, setHabitsData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  const fetchTodayData = async () => {
    try {
      const clerkID = await getClerkUserID();
      const { data: response } = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/today?clerkID=${clerkID}`
      );

      console.log("Today's data:", response);

      const transformedData: DataType[] = [
        ...(response.data?.expenses?.map((expense: any) => ({
          _id: expense._id,
          title: expense.title,
          amount: expense.amount,
          type: "expenses",
        })) || []),
        ...(response.data?.junkFood?.map((food: any) => ({
          _id: food._id,
          foodName: food.foodName,
          amount: food.amount,
          type: "junkFood",
        })) || []),
      ];

      setData(transformedData);

      const todo =
        response.data?.todo?.map((todo: TodoType) => ({
          _id: todo._id,
          task: todo.task,
          priority: todo.priority,
          description: todo.description,
          isCompleted: todo.isCompleted,
        })) || [];
      setTodoData(todo);

      const habits =
        response.data?.habits?.map((habit: any) => ({
          _id: habit._id,
          habitName: habit.habitName,
          isCompleted: habit.isCompleted,
        })) || [];
      setHabitsData(habits);
    } catch (error) {
      console.error("Error fetching today's data:", error);
      setData([]);
      setTodoData([]);
      setHabitsData([]);
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };

  useEffect(() => {
    fetchTodayData();
  }, []);

  return (
    <div className="w-full px-3 py-3 mb-6 mx-auto">
      {/* Show Today Activity */}
      {loading ? ( // Show loading state (skeleton or loading UI)
        <ActivitySkeleton />
      ) : data.length === 0 &&
        todoData.length === 0 &&
        habitsData.length === 0 ? (
        <NoDataFound title="No Today Activity! ✏️ " />
      ) : (
        <div className="w-full flex flex-col gap-3">
          <Separator />
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Today Todo */}
            {todoData.length > 0 ? (
              <div className="flex flex-col text-center md:flex-row justify-center w-full md:max-w-sm items-center md:justify-between gap-2 md:gap-8 p-4">
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
              </div>
            ) : (
              <div className="flex flex-col text-center items-center justify-center py-4">
                <NoDataFound
                  title="No Habits tracked today"
                  url="dog.png"
                  size={200}
                />
              </div>
            )}
          </div>

          {/* Today Activity */}
          {data.length > 0 ? (
            <>
              <Separator />
              <div className="md:mt-3 rounded-xl">
                <div className="flex justify-between items-center w-full py-4 rounded-lg">
                  <h1 className="flex-grow text-center text-xl ml-6 md:text-2xl font-semibold">
                    Today’s Activity
                  </h1>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-6">
                  {data.map((item) => (
                    <CardBox data={item} key={item._id} setData={setData} />
                  ))}
                </div>
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
  );
};

export default List;
