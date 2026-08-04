import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (req: Response) => {
  const { userId } = await getAuth;
  console.log("🛫 ~ route.ts:4 ~ userId:", userId);
  return NextResponse.json({ status: "Success", message: "hello world" });
};
