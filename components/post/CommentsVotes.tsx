"use client";

import { Icons } from "@/lib/assets/icons";
import { DownVote, UpVote } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";
import { downVoteAction } from "../action/downVote.action";
import { upVoteAction } from "../action/upVote.action";

export default function CommentsVotes({
  upVotes,
  downVotes,
  commentId,
  userId,
  postId,
}: {
  upVotes: UpVote[] | null;
  downVotes: DownVote[] | null;
  commentId: string;
  userId: string;
  postId: string;
}) {
  const [localUpVotes, setLocalUpVotes] = useState(upVotes);
  const [localDownVotes, setLocalDownVotes] = useState(downVotes);
  const handleUpVote = async () => {
    const [newUpVote, newDownVote] = await upVoteAction(
      commentId,
      userId,
      postId
    );
    setLocalUpVotes(newUpVote as UpVote[]);
    if (newDownVote) {
      setLocalDownVotes(newDownVote as DownVote[]);
    }
  };

  const handleDownVote = async () => {
    const [newDownVote, newUpVote] = await downVoteAction(
      commentId,
      userId,
      postId
    );
    setLocalDownVotes(newDownVote as UpVote[]);
    if (newUpVote) {
      setLocalUpVotes(newUpVote as DownVote[]);
    }
  };
  return (
    <div className="flex flex-row gap-3">
      <div className="flex flex-row gap-px">
        <Icons.chevronsUp
          className="size-5"
          onClick={async () => {
            if (!userId) {
              return toast.error("You need to be logged in to upvote");
            }
            handleUpVote();
          }}
        />
        <span className="relative top-px text-sm">{localUpVotes?.length}</span>
      </div>
      <div className="flex flex-row gap-px">
        <Icons.chevronsDown
          onClick={async () => {
            if (!userId) {
              return toast.error("You need to be logged in to downvote");
            }
            handleDownVote();
          }}
          className="size-5"
        />
        <span className="relative top-px text-sm">
          {localDownVotes?.length}
        </span>
      </div>
    </div>
  );
}
