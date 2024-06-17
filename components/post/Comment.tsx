"use client";
import { DownVote, UpVote } from "@prisma/client";
import type { SessionContextValue } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { commentAction } from "../action/comment.action";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import CommentsVotes from "./CommentsVotes";

type Comment = {
  id: string;
  content: string;
  authorId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
};

type Commenters = {
  id: string;
  name: string | null;
  image: string | null;
};

export default function Comment({
  session,
  comments,
  commenters,
  upVotes,
  downVotes,
  postId,
  authorId,
}: {
  session: SessionContextValue;
  comments: Comment[];
  commenters: Commenters[];
  upVotes: UpVote[];
  downVotes: DownVote[];
  postId: string;
  authorId: string;
}) {
  const [commentValue, setCommentValue] = useState("");
  const [localCommenters, setLocalCommenters] = useState(commenters);
  const [localComments, setLocalComments] = useState(comments);
  useEffect(() => {
    setLocalCommenters(commenters);
  }, [commenters]);
  const handleComment = async () => {
    const comments = await commentAction(commentValue, postId, authorId);
    setLocalComments(comments);
    const commentersId = comments.map((comment) => comment.authorId);
    const uniqueCommentersId = [...new Set(commentersId)];
    uniqueCommentersId.forEach(async (id) => {
      const res = await fetch(`/api/getUser?userId=${id}`);
      const data = await res.json();
      setLocalCommenters((commenters) => [...commenters, data.user]);
    });
    setCommentValue("");
  };
  const handleTextAreaFocus = () => {
    if (!session.data?.user) {
      const textArea = document.getElementById("textarea");
      textArea?.blur();
      return toast.error("You need to be logged in to comment.");
    }
  };
  return (
    <div>
      <div className="flex flex-col space-y-3 p-4 justify-center items-center">
        <span className="text-gray-400 text-center p-2">
          Defend your Vote : Explain why your option is superior and the other
          is inadequate.
        </span>
        <Textarea
          id="textarea"
          value={commentValue}
          onFocus={() => handleTextAreaFocus()}
          onChange={(e) => setCommentValue(e.target.value)}
          placeholder="Leave a comment"
        />
        <Button
          onClick={async () => {
            await handleComment();
            setCommentValue("");
          }}
          className="text-white dark:text-black"
          disabled={session.data?.user ? false : true}
        >
          Post Comment
        </Button>
      </div>
      <div className="flex flex-col gap-4 p-4 justify-center items-center w-auto">
        {localComments.length > 0 ? (
          <>
            <div className="flex flex-col gap-4 justify-center items-center">
              {localComments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex flex-col justify-center items-start w-full"
                >
                  <div className="flex flex-row gap-1.5 w-full">
                    <Image
                      alt={`profile image of ${
                        localCommenters.find(
                          (commenter) => commenter?.id === comment.authorId
                        )?.name
                      }`}
                      src={
                        localCommenters.find(
                          (commenter) => commenter?.id === comment.authorId
                        )?.image as string
                      }
                      width={8}
                      height={7}
                      className="rounded-full size-4"
                    />
                    <span className="text-[0.8rem] text-slate-500 relative bottom-px">
                      {
                        localCommenters.find(
                          (commenter) => commenter?.id === comment.authorId
                        )?.name
                      }
                    </span>
                  </div>
                  <div className="flex w-full">
                    <span className="relative left-[0.09rem] text-[0.95rem]">
                      {comment.content}
                    </span>
                  </div>
                  <span className="text-gray-400 text-[0.65rem]">
                    {comment.createdAt.toLocaleDateString()} at{" "}
                    {comment.createdAt.toLocaleTimeString()}
                  </span>
                  <CommentsVotes
                    upVotes={
                      upVotes.filter(
                        (upVote) => upVote.commentId === comment.id
                      ) || null
                    }
                    downVotes={
                      downVotes.filter(
                        (downVote) => downVote.commentId === comment.id
                      ) || null
                    }
                    commentId={comment.id}
                    userId={session.data?.user?.id as string}
                    postId={postId}
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <span>No comments yet :(</span>
        )}
      </div>
    </div>
  );
}
