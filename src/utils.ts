export interface Post {
  id: number;
  title: string;
  body: string;
}

const posts: Post[] = [
  { id: 1, title: "Post 1", body: "Content of post 1" },
  { id: 2, title: "Post 2", body: "Content of post 2" },
  { id: 3, title: "Post 3", body: "Content of post 3" },
  { id: 4, title: "Post 4", body: "Content of post 4" },
  { id: 5, title: "Post 5", body: "Content of post 5" },
  { id: 6, title: "Post 6", body: "Content of post 6" },
  { id: 7, title: "Post 7", body: "Content of post 7" },
  { id: 8, title: "Post 8", body: "Content of post 8" },
  { id: 9, title: "Post 9", body: "Content of post 9" },
  { id: 10, title: "Post 10", body: "Content of post 10" },
  // Add more posts as needed
];

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const submitPost = async (_: string, __: string, delayMs = 0) => {
  if (delayMs) await new Promise((resolve) => setTimeout(resolve, delayMs));
};

export const fetchPosts = async (
  postId?: number,
  delayMs = 0,
): Promise<Post[]> => {
  // Simulate a delay if specified
  if (delayMs) {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }

  if (postId) {
    // Return a specific post if postId is provided
    const post = posts.find((p) => p.id === postId);
    return post ? [post] : [];
  } else {
    // Return all posts if no postId is provided
    return posts;
  }
};
