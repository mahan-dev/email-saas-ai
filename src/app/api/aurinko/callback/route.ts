import { exchangeCodeForAccessToken, getAccountDetail } from "@/lib/aurniko";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { userId } = await auth();

  if (!userId)
    return NextResponse.json(
      { status: "Failed", error: "Unauthorized" },
      { status: 401 },
    );

  const params = req.nextUrl.searchParams;
  const status = params.get("status");
  if (status != "success")
    return NextResponse.json(
      { status: "Failed", error: "No code provided" },
      { status: 400 },
    );

  const code = params.get("code");
  if (!code)
    return NextResponse.json(
      { status: "Failed", error: "No code provided" },
      { status: 400 },
    );

  const token = await exchangeCodeForAccessToken(code);
  if (!token)
    return NextResponse.json(
      {
        status: "Failed",
        error: "Failed to exchange code for access token",
      },
      { status: 400 },
    );

  const accountDetails = await getAccountDetail(token.accessToken);
  await db.account.upsert({
    where: {
      id: token.accountId.toString(),
    },
    update: {
      accessToken: token.accessToken,
    },
    create: {
      id: token.accountId.toString(),
      userId,
      emailAddress: accountDetails.email,
      name: accountDetails.name,
      accessToken: token.accessToken,
    },
  });

  return NextResponse.redirect(new URL("/mail"), req.url);
};
