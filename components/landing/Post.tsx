"use client";
import { Badge } from "@/components/ui/badge";
import { Icons } from "@/lib/assets/icons";
import { Comment } from "@prisma/client";
import { useRouter } from "next/navigation";

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

export const Post = ({
  posts,
  comments,
}: {
  posts: Post[];
  comments: Comment[];
}) => {
  const router = useRouter();
  const voteToPercentage = (firstChoice: number, secondChoice: number) => {
    const firstChoiceVotes = firstChoice;
    const secondChoiceVotes = secondChoice;
    const totalVotes = firstChoiceVotes + secondChoiceVotes;

    const firstChoicePercentage =
      totalVotes === 0 ? 50 : (firstChoiceVotes / totalVotes) * 100;
    const secondChoicePercentage =
      totalVotes === 0 ? 50 : (secondChoiceVotes / totalVotes) * 100;
    return [firstChoicePercentage, secondChoicePercentage];
  };
  const tailwindColorToHex = (color: string) => {
    switch (color) {
      case "bg-red-500":
        return "#EF4444";
      case "bg-blue-500":
        return "#3B82F6";
      case "bg-green-500":
        return "#10B981";
      case "bg-yellow-500":
        return "#FBBF24";
      case "bg-indigo-500":
        return "#6366F1";
      case "bg-purple-500":
        return "#8B5CF6";
      case "bg-pink-500":
        return "#EC4899";
      case "bg-orange-500":
        return "#F97316";
      default:
        return "#fff";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 px-14 border-x-2 pt-8">
      {posts.map((post) => (
        <div
          key={post.id}
          className="flex flex-col items-center justify-center w-full hover:bg-background/70"
          onClick={() => router.push(`/post/${post.id}`)}
        >
          <h2 className="text-[1.25rem] font-bold truncate relative bottom-3 dark:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]">
            <span style={{ color: tailwindColorToHex(post.firstChoiceColor) }}>
              {post.title.split(" vs ")[0]}
            </span>{" "}
            vs{" "}
            <span style={{ color: tailwindColorToHex(post.secondChoiceColor) }}>
              {post.title.split(" vs ")[1]}
            </span>
          </h2>
          <p className="text-[0.875rem] text-gray-400 truncate drop-shadow-none dark:drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] relative bottom-2">
            {post.description}
          </p>
          <div className="w-[20rem] h-8 bg-gray-700 rounded-full overflow-hidden my-2 flex flex-row">
            <div
              style={{
                width: `${
                  voteToPercentage(post.firstChoice, post.secondChoice)[0]
                }%`,
              }}
              className={`w-full h-full flex items-center justify-center ${post.firstChoiceColor} animate-slideFromLeft`}
            >
              <span className="text-sm font-black truncate drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-white animation">
                {voteToPercentage(
                  post.firstChoice,
                  post.secondChoice
                )[0].toFixed(2)}
                %
              </span>
            </div>
            <div
              style={{
                width: `${
                  voteToPercentage(post.firstChoice, post.secondChoice)[1]
                }%`,
              }}
              className={`flex items-center justify-center ${post.secondChoiceColor} animate-slideFromRight`}
            >
              <span className="text-sm font-black truncate drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] text-white">
                {voteToPercentage(
                  post.firstChoice,
                  post.secondChoice
                )[1].toFixed(2)}
                %
              </span>
            </div>
          </div>
          <div className="flex items-center justify-start w-full space-x-4 relative top-1">
            <Badge className="w-auto gap-2 h-6 bg-[#242424] text-white cursor-pointer">
              <Icons.comment className="size-3" />
              <span className="text-[0.75rem] font-normal">
                {
                  comments.filter((comment) => comment.postId === post.id)
                    .length
                }{" "}
                comments
              </span>
            </Badge>
            <Badge className="w-auto gap-2 h-6 bg-[#242424] text-white cursor-pointer">
              <Icons.date className="size-3" />
              <span className="text-[0.75rem]">
                {String(post.createdAt.toLocaleDateString())} at{" "}
                {String(post.createdAt.toLocaleTimeString())}
              </span>
            </Badge>
          </div>
          <div
            className="w-full border-b-2 border-t-gray-800 relative py-2"
            style={{ width: `calc(100% + 7.2rem)` }}
          ></div>
        </div>
      ))}
    </div>
  );
};
