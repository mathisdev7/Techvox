"use server";
import { prisma } from "@/lib/prisma";

export const downVoteAction = async (
  commentId: string,
  authorId: string,
  postId: string
) => {
  const alreadydownVoted = await prisma.downVote.findFirst({
    where: {
      commentId,
      authorId,
    },
  });
  if (alreadydownVoted) {
    await prisma.downVote.delete({
      where: {
        id: alreadydownVoted.id,
      },
    });
    const currentdownVote = await prisma.downVote.findMany({
      where: {
        commentId,
      },
    });
    return [currentdownVote];
  }
  const upVoted = await prisma.upVote.findFirst({
    where: {
      commentId,
      authorId,
    },
  });
  let currentUpVote;
  if (upVoted) {
    await prisma.upVote.delete({
      where: {
        id: upVoted.id,
      },
    });
    currentUpVote = await prisma.upVote.findMany({
      where: {
        commentId,
      },
    });
  }
  await prisma.downVote.create({
    data: {
      commentId,
      authorId,
      postId,
    },
  });
  const currentdownVote = await prisma.downVote.findMany({
    where: {
      commentId,
    },
  });
  return currentUpVote ? [currentdownVote, currentUpVote] : [currentdownVote];
};
