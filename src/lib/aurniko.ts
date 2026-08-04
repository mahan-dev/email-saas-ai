"use server";

import { auth } from "@clerk/nextjs/server";

const PUBLIC_URL = process.env.NEXT_PUBLIC_URL as string;

export const getAurinkoAuthUrl = async (
  serviceType: "Google" | "office365",
) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const params = new URLSearchParams({
    clientId: process.env.AURNIKO_CLIENT_ID as string,
    serviceType,
    scope: "Mail.Read Mail.ReadWrite Mail.Send Mail.Drafts Mail.All",
    responseType: "code",
    returnUrl: `${PUBLIC_URL}/api/aurinko/callback`,
  });

  return `https://api.aurinko.io/v1/auth/authorize?${params.toString()}`;
};
