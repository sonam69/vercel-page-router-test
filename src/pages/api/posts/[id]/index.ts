import type { NextApiRequest, NextApiResponse } from "next";
import { fetchPosts } from "~/utils";

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query);
  const { id, delay } = req.query as { delay: string; id: string };
  // Logic to fetch posts
  const posts = await fetchPosts(parseInt(id), parseInt(delay));
  res.status(200).json(posts);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      await handleGet(req, res);
      break;
    default:
      res.status(405).json({ message: "Method Not Allowed" });
      break;
  }
}
