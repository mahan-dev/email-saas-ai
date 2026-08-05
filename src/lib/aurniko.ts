"use server";

import axios from "axios";

import { auth } from "@clerk/nextjs/server";

const PUBLIC_URL = process.env.NEXT_PUBLIC_URL as string;
const CLIENT_ID = process.env.AURINKO_CLIENT_ID as string;

export const getAurinkoAuthUrl = async (
  serviceType: "Google" | "office365",
) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const params = new URLSearchParams({
    clientId: CLIENT_ID,
    serviceType,
    scopes: "Mail.Read Mail.ReadWrite Mail.Send Mail.Drafts Mail.All",
    responseType: "code",
    returnUrl: `${PUBLIC_URL}/api/aurinko/callback`,
  });

  return `https://api.aurinko.io/v1/auth/authorize?${params.toString()}`;
};

export const exchangeCodeForAccessToken = async (code: string) => {
  console.log("🎨 ~ aurniko.ts:27 ~ code:", code);

  try {
    const res = await axios.post(
      `https://api.aurinko.io/v1/auth/token/${code}?serviceType=Google`,

      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        auth: {
          username: process.env.AURINKO_CLIENT_ID as string,
          password: process.env.AURINKO_CLIENT_SECRET as string,
        },
      },
    );
    return res.data as {
      accountId: number;
      accessToken: string;
      userId: string;
      userSession: string;
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Aurinko status", error.response?.status);
      console.error(
        "AURINKO DATA:",
        JSON.stringify(error.response?.data, null, 2),
      );
    }
    console.log("failed to exchange code for access token");
    throw new Error("failed to exchange code for access token");
  }
};

export const getAccountDetail = async (accessToken: string) => {
  try {
    const response = await axios.get("https://api.aurinko.io/v1/account", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data as {
      email: string;
      name: string;
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("error fetching account details", error.response?.data);
    } else {
      console.error("unexpected fetching account details", error);
    }
    throw error;
  }
};
