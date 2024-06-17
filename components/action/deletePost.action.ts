"use server";
import { prisma } from "@/lib/prisma";

export const deletePostAction = async (postId: string) => {
  await prisma.post.delete({
    where: {
      id: postId,
    },
  });
  const posts = await prisma.post.findMany({
    where: {
      published: false,
    },
  });
  return posts;
};
