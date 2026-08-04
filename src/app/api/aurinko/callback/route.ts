import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const GET = async (req: Response) => {
  const { userId } = await auth;
  console.log("🛫 ~ route.ts:4 ~ req:", req);
  console.log("🛫 ~ route.ts:4 ~ userId:", userId);
  return NextResponse.json({ status: "Success", message: "hello world" });
};
