import type { NextApiRequest, NextApiResponse } from "next";
import { type Post, sleep } from "~/utils";
import supabaseServer from "~/utils/supabase-server";

export async function getPosts<
  T extends string | undefined,
  R = T extends string ? Post : Post[],
>(id?: T, delayMs = 0): Promise<R> {
  if (delayMs) await sleep(delayMs);

  if (id) {
    const response = (await supabaseServer
      .from("posts")
      .select("*")
      .eq("id", id)) as unknown as {
      data: Post[];
    };
    return response.data[0] as R;
  }
  const response = (await supabaseServer
    .from("posts")
    .select("*")) as unknown as {
    data: Post[];
  };
  return response.data as R;
}

export async function createPost(title: string, body: string) {
  const response = (await supabaseServer
    .from("posts")
    .insert([{ title, body }])) as unknown as {
    data: Post[];
  };
  return response.data;
}

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  // Logic to save the post
  const { delay } = req.query as { delay: string };
  const { title, body } = req.body as { title: string; body: string };

  (await supabaseServer.from("posts").insert([{ title, body }])) as unknown as {
    data: Post[];
  };

  res.status(201).json({ message: "Post created successfully" });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "POST":
      await handlePost(req, res);
      break;
    default:
      res.status(405).json({ message: "Method Not Allowed" });
      break;
  }
}
