"use server";
import { Post } from "@/components/landing/Post";
import Section from "@/components/landing/Section";
import { prisma } from "@/lib/prisma";

export default async function New() {
  let posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      votes: true,
      comments: true,
    },
  });
  posts.sort(
    (a, b) =>
      b.votes.length + b.comments.length - (a.votes.length + a.comments.length)
  );
  const comments = await prisma.comment.findMany();

  return (
    <main>
      <div className="flex-1 flex flex-row">
        <div className="h-full w-full flex justify-center flex-row">
          <div className="relative right-24 hidden sm:block">
            <div className="flex justify-center items-center">
              <Section />
            </div>
          </div>
          {posts.length > 0 ? (
            <div className="flex justify-center items-center relative lg:right-24">
              <Post posts={posts} comments={comments} />
            </div>
          ) : (
            <div className="flex justify-center items-center relative lg:right-24">
              <h1 className="text-2xl font-bold dark:text-white text-black">
                No posts found
              </h1>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
