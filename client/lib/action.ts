"use server";
import { currentUser } from "@clerk/nextjs/server";

export const getClerkUserID = async () => {
  const user = await currentUser();

  return user?.id;
};
