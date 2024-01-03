import { getAuthSession } from "@/lib/authOptions";
import { db } from "@/prisma/client";

export async function GET(req: Request) {
  const session = await getAuthSession();

  if (!session?.user) return new Response("Unauthorized", { status: 401 });

  try {
    const generation = await db.generation.findMany({
      where: {
        userId: session.user.id,
        status : "COMPLETED"
      },
      orderBy : {
        createdAt : "desc"
      }
    })
    console.log("generation", generation);
    return new Response(JSON.stringify(generation));
    
  } catch (error) {
    console.log(error);
    return new Response("GET_GENERATIONS_MY_LIBRARY_ROUTE_ERROR", { status: 500 });
  }
}

export async function POST(req:Request){
  const session = await getAuthSession();
  if (!session?.user) return new Response("Unauthorized", { status: 401 });
  try {
    const data = await req.json();
    console.log("data",data);
    const generation = await db.generation.create({
      data: {
        inputPrompt: data.prompt,
        userId: session.user.id,
        visibility : "PUBLIC",
        videoUrl : data.videoUrl,
        id : data.id,
        status : "COMPLETED",
      },
    });
    return new Response(JSON.stringify(generation));
    
  } catch (error) {
    console.log(error);
    return new Response("POST_GENERATION_MY_LIBRARY_ROUTE_ERROR", { status: 500 });
  }
}
