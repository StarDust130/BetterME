"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState, useEffect } from "react";
import axios from "axios";
import { getClerkUserID } from "@/lib/action";
import CardBox from "./CardBox";

const List = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-3 py-3 mb-6 w-full">
      {expenses.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Expenses 🎉</CardTitle>
            <CardDescription>Enjoy your savings!</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Great job, keep it up! 😊</p>
          </CardContent>
          <CardFooter>
            <p>Come back tomorrow!</p>
          </CardFooter>
        </Card>
      ) : (
        expenses.map((data) => <CardBox data={data} key={data._id} />)
      )}
    </div>
  );
};

export default List;
