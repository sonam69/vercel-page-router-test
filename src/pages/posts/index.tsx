import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getPosts } from "../api/posts";
import Link from "next/link";
import BaseLayout from "../layouts/base-layout";
import type { NextPageWithLayout } from "../_app";

const Page: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ posts }) => {
  return (
    <>
      {posts?.map((post) => (
        <Link
          key={post.id}
          className="mt-5 flex max-w-xs flex-col gap-4 rounded-xl bg-black/100 p-4 text-white hover:bg-black/20 hover:text-black"
          href={`/posts/${post.id}`}
        >
          <h3 className="text-2xl font-bold">{post.title} →</h3>
        </Link>
      ))}
    </>
  );
};

export default Page;

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const posts = await getPosts(undefined, 1000);
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=60, stale-while-revalidate=59",
  );
  return {
    props: {
      posts,
      title: "Posts",
      breadcrumb: [{ text: "home", path: "/" }],
    },
  };
}

Page.getLayout = (page) => (
  <BaseLayout title="Posts" breadcrumb={[{ text: "home", path: "/" }]}>
    {page}
  </BaseLayout>
);
