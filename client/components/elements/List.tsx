"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { getClerkUserID } from "@/lib/action";
import CardBox from "./CardBox";
import NoDataCard from "../cards/NoDataCard";
import {  Loader  } from "lucide-react";

export interface ExpensesType {
  _id: string;
  title: string;
  amount: number;
  category: string;
}

const List = () => {
  const [expenses, setExpenses] = useState<ExpensesType[]>([]); // Note the array type
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTodayExpenses = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/expenses/today`,
          { params: { clerkID: await getClerkUserID() } }
        );
        setExpenses(data.data || []); // Handle cases where data might be missing
      } catch (error) {
        console.error("Error fetching today's expenses:", error);
        setExpenses([]); // Assume no expenses in case of an error
      } finally {
        setLoading(false);
      }
    };
    fetchTodayExpenses();
  }, []);

  if (loading) return (
    <div className="flex gap-2 items-center h-full mt-10 justify-center ">
      Loading... <Loader className="animate-spin" />
    </div>
  );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-3 py-3 mb-6  mx-auto">
      {expenses.length === 0 ? (
        <NoDataCard
          title="No Expenses 🎉"
          desc="Enjoy your savings!"
          content="Great job, keep it up! 😊"
        />
      ) : (
        expenses.map((data) => <CardBox data={data} key={data._id} />)
      )}
    </div>
  );
};

export default List;
