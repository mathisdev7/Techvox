"use server";
import { prisma } from "@/lib/prisma";

export const commentAction = async (
  commentValue: string,
  postId: string,
  authorId: string
) => {
  await prisma.comment.create({
    data: {
      content: commentValue,
      postId,
      authorId,
    },
  });
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return comments;
};
