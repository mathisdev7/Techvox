import { Icons } from "@/lib/assets/icons";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { Textarea } from "../ui/textarea";

export default function SkeletonComments({ comments }: { comments: any[] }) {
  return (
    <>
      <div className="flex flex-col space-y-3 p-4 justify-center items-center">
        <span className="text-gray-400 text-center p-2">
          Defend your Vote : Explain why your option is superior and the other
          is inadequate.
        </span>
        <Textarea placeholder="Leave a comment" />
        <Button className="text-white dark:text-black" disabled={false}>
          Post Comment
        </Button>
      </div>
      <div className="flex flex-col gap-4 p-4 justify-center items-center w-full">
        {comments.length > 0 ? (
          <>
            <div className="flex flex-col gap-4 justify-center items-center">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex flex-col justify-center items-start w-full space-y-1"
                >
                  <div className="flex flex-row gap-1.5 w-full relative right-4">
                    <Skeleton className="rounded-full w-5 h-5 relative bottom-1" />
                    <Skeleton className="w-12 h-3 rounded-full" />
                  </div>
                  <div className="flex w-full relative right-4">
                    <Skeleton className="h-3 w-32" />
                  </div>
                  <Skeleton className="h-2 w-24 relative right-4" />
                  <div className="flex flex-row gap-2 relative right-4">
                    <div className="flex flex-row gap-px">
                      <Icons.chevronsUp className="size-5" />
                      <span className="relative top-px text-sm">0</span>
                    </div>
                    <div className="flex flex-row gap-px">
                      <Icons.chevronsDown className="size-5" />
                      <span className="relative top-px text-sm">0</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>No comments yet :(</p>
        )}
      </div>
    </>
  );
}
