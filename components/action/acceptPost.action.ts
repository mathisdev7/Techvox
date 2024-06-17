"use server";
import { prisma } from "@/lib/prisma";

export const acceptPostAction = async (postId: string) => {
  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      published: true,
    },
  });
  const posts = await prisma.post.findMany({
    where: {
      published: false,
    },
  });
  return posts;
};
