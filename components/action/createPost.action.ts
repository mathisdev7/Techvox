"use server";
import { prisma } from "@/lib/prisma";

type PostData = {
  description: string;
  firstChoice: {
    title: string;
  };
  secondChoice: {
    title: string;
  };
};

type Color = {
  firstChoice: string;
  secondChoice: string;
};

export const createPostAction = async (
  postData: PostData,
  color: Color,
  authorId: string
) => {
  await prisma.post.create({
    data: {
      description: postData.description,
      title: `${postData.firstChoice.title} vs ${postData.secondChoice.title}`,
      firstChoice: 0,
      secondChoice: 0,
      firstChoiceColor: color.firstChoice,
      secondChoiceColor: color.secondChoice,
      published: false,
      authorId,
    },
  });
};
