"use client";
import { DownVote, UpVote } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { votePost } from "../action/vote.action";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Comment from "./Comment";
import SkeletonComments from "./SkeletonComments";

type Post = {
  id: string;
  title: string;
  firstChoice: number;
  secondChoice: number;
  firstChoiceColor: string;
  secondChoiceColor: string;
  description: string;
  published: boolean;
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
};

type Comment = {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
};

type User = {
  id: string;
  name: string | null;
  image: string | null;
};

export default function PostDetails({
  post,
  comments,
  upVotes,
  downVotes,
}: {
  post: Post;
  comments: Comment[];
  upVotes: UpVote[];
  downVotes: DownVote[];
}) {
  const [localPost, setLocalPost] = useState(post);
  const [userId, setUserId] = useState("");
  const [isUserLoading, setIsUserLoading] = useState(true);
  const session = useSession();
  useEffect(() => {
    if (session.status === "loading") return;
    if (session.data?.user) {
      setUserId(session.data.user.id as string);
    }
  }, [session]);
  const [commenters, setCommenters] = useState<User[]>([]);
  useEffect(() => {
    if (comments.length > 0) {
      const commentersId = comments.map((comment) => comment.authorId);
      const uniqueCommentersId = [...new Set(commentersId)];
      uniqueCommentersId.forEach(async (id) => {
        const res = await fetch(`/api/getUser?userId=${id}`);
        const data = await res.json();
        setCommenters((commenters) => [...commenters, data.user]);
        setIsUserLoading(false);
      });
      setIsUserLoading(false);
    }
    setIsUserLoading(false);
  }, [comments]);

  const handleVote = async (choice: "firstChoice" | "secondChoice") => {
    const voteAction = await votePost(choice, userId, localPost.id);
    if (!voteAction) {
      toast.error("You have already voted");
      return;
    }
    setLocalPost(voteAction);
  };

  const firstChoiceVotes = localPost.firstChoice;
  const secondChoiceVotes = localPost.secondChoice;
  const totalVotes = firstChoiceVotes + secondChoiceVotes;

  const firstChoicePercentage =
    totalVotes === 0 ? 50 : (firstChoiceVotes / totalVotes) * 100;
  const secondChoicePercentage =
    totalVotes === 0 ? 50 : (secondChoiceVotes / totalVotes) * 100;
  return (
    <div>
      <Card className="p-8 rounded-none max-w-5xl">
        <h1 className="text-3xl font-bold text-center p-2 truncate">
          {localPost.title}
        </h1>
        <p className="text-gray-400 text-center p-2">{localPost.description}</p>
        <div className="flex justify-center items-center">
          <div className="w-[20rem] h-8 bg-gray-700 rounded-full overflow-hidden my-2 flex flex-row">
            <div
              style={{
                width: `${firstChoicePercentage}%`,
              }}
              className={`w-full h-full flex items-center justify-center ${localPost.firstChoiceColor} animate-slideFromLeft`}
            >
              <span className="text-sm font-black truncate drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-white animation">
                {firstChoicePercentage}%
              </span>
            </div>
            <div
              style={{
                width: `${secondChoicePercentage}%`,
              }}
              className={`flex items-center justify-center ${localPost.secondChoiceColor} animate-slideFromRight`}
            >
              <span className="text-sm font-black truncate drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-white">
                {secondChoicePercentage}%
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row space-x-4 p-4 justify-center items-center">
          <Button
            className="text-white dark:text-black"
            disabled={session.data?.user ? false : true}
            onClick={() => handleVote("firstChoice")}
          >
            Vote for {localPost.title.split(" vs ")[0]}
          </Button>
          <Button
            className="text-white dark:text-black"
            disabled={session.data?.user ? false : true}
            onClick={() => handleVote("secondChoice")}
          >
            Vote for {localPost.title.split(" vs ")[1]}
          </Button>
        </div>
        {isUserLoading ? (
          <SkeletonComments comments={comments} />
        ) : (
          <Comment
            session={session}
            comments={comments}
            commenters={commenters}
            upVotes={upVotes}
            downVotes={downVotes}
            postId={localPost.id}
            authorId={userId}
          />
        )}
      </Card>
    </div>
  );
}
