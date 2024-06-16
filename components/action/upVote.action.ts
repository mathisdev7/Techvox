"use server";
import { prisma } from "@/lib/prisma";

export const upVoteAction = async (
  commentId: string,
  authorId: string,
  postId: string
) => {
  const alreadyUpVoted = await prisma.upVote.findFirst({
    where: {
      commentId,
      authorId,
    },
  });
  if (alreadyUpVoted) {
    await prisma.upVote.delete({
      where: {
        id: alreadyUpVoted.id,
      },
    });
    const currentUpVote = await prisma.upVote.findMany({
      where: {
        commentId,
      },
    });
    return [currentUpVote];
  }
  const downVoted = await prisma.downVote.findFirst({
    where: {
      commentId,
      authorId,
    },
  });
  let currentDownVote;
  if (downVoted) {
    await prisma.downVote.delete({
      where: {
        id: downVoted.id,
      },
    });
    currentDownVote = await prisma.downVote.findMany({
      where: {
        commentId,
      },
    });
  }
  await prisma.upVote.create({
    data: {
      commentId,
      authorId,
      postId,
    },
  });
  const currentUpVote = await prisma.upVote.findMany({
    where: {
      commentId,
    },
  });
  return currentDownVote ? [currentUpVote, currentDownVote] : [currentUpVote];
};
