import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { getPosts } from "~/pages/api/posts";
import BaseLayout from "../layouts/base-layout";
import type { NextPageWithLayout } from "../_app";

const Page: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ post }) => {
  return (
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  );
};

export async function getStaticProps({
  params,
}: GetStaticPropsContext<{ postId: string }>) {
  const post = await getPosts(params?.postId, 1000);
  return {
    props: {
      post,
      title: "current post",
      breadcrumb: [
        { text: "home", path: "/" },
        { text: "posts", path: "/posts" },
      ],
    },
  };
}

export default Page;

export async function getStaticPaths() {
  const posts = await getPosts(undefined, 1000);
  const paths = posts.map((post) => ({
    params: { postId: post.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
}

Page.getLayout = (page) => (
  <BaseLayout
    title="Post"
    breadcrumb={[
      { text: "home", path: "/" },
      { text: "posts", path: "/posts" },
    ]}
  >
    {page}
  </BaseLayout>
);
