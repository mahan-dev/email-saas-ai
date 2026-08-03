import { db } from "@/server/db";

export async function POST(req: Request) {
  const { data } = await req.json();

  const emailAddress = data.email_addresses?.[0]?.email_address ?? "";

  await db.user.create({
    data: {
      id: data.id,
      emailAddress,
      firstName: data.first_name ?? "",
      lastName: data.last_name ?? "",
      imageUrl: data.image_url ?? "",
    },
  });

  console.log("data created");

  return new Response("web received", { status: 200 });
}
