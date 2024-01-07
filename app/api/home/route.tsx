import { getAuthSession } from "@/lib/authOptions";
import { db } from "@/lib/prismadb";

export async function GET() {
  const session = await getAuthSession();

  if (!session?.user) return new Response("Unauthorised", { status: 401 });

  try {
    const generations = await db.generation.findMany({
      where: {
        visibility: "PUBLIC",
        status: "COMPLETED",
      },
      orderBy : {
        createdAt : "desc"
      }
    });
    return new Response(JSON.stringify(generations));
  } catch (error) {
    console.log(error);
    return new Response("POST_GENERATION_MY_LIBRARY_ROUTE_ERROR", {
      status: 500,
    });
  }
}
