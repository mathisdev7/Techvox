"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Icons } from "@/lib/assets/icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createPostAction } from "../action/createPost.action";

export default function FormCreatePost() {
  const router = useRouter();
  const [color, setColor] = useState({
    firstChoice: "",
    secondChoice: "",
  });
  const [postData, setPostData] = useState({
    description: "",
    firstChoice: {
      title: "",
    },
    secondChoice: {
      title: "",
    },
  });
  const [userId, setUserId] = useState("");
  const session = useSession();
  useEffect(() => {
    if (session.status === "loading") return;
    if (session.data?.user) {
      setUserId(session.data.user.id as string);
    }
  }, [session]);

  return (
    <div className="max-w-5wl">
      <form className="flex flex-col items-center justify-center space-y-4 border-2 p-10">
        <Card className="w-full max-w-sm border-none flex flex-col space-y-4">
          <CardTitle className="text-2xl text-center py-2 relative bottom-5">
            Create a Post
          </CardTitle>

          <Card className="w-full max-w-sm p-2">
            <CardTitle className="text-center relative top-1">
              Post Information
            </CardTitle>
            <CardHeader>
              <CardDescription>
                Enter the information below to create a new post.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Description</Label>
                <Textarea
                  id="text"
                  onChange={(e) =>
                    setPostData({
                      ...postData,
                      description: e.target.value,
                      firstChoice: postData.firstChoice,
                      secondChoice: postData.secondChoice,
                    })
                  }
                  value={postData.description}
                  placeholder="Do you prefer flutter or react native?"
                  required
                />
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-2">
            <Card>
              <CardHeader>First choice</CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div>
                    <Label htmlFor="firstChoice">Title</Label>
                    <Input
                      onChange={(e) =>
                        setPostData({
                          ...postData,
                          firstChoice: {
                            title: e.target.value,
                          },
                          secondChoice: postData.secondChoice,
                          description: postData.description,
                        })
                      }
                      value={postData.firstChoice.title}
                      id="firstChoice"
                      type="text"
                      placeholder="Flutter"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="firstChoiceColor">Color</Label>
                    <div className="flex flex-row space-x-2 border-2 rounded-lg w-auto p-1.5 justify-center items-center">
                      <span
                        onClick={() =>
                          setColor({
                            firstChoice: "bg-red-500",
                            secondChoice: color.secondChoice,
                          })
                        }
                        className={`flex h-6 w-6 items-center justify-center rounded-full bg-red-500 border-2 border-black ${
                          color.firstChoice === "bg-red-500" ? "opacity-40" : ""
                        }`}
                      ></span>
                      <span
                        onClick={() =>
                          setColor({
                            firstChoice: "bg-green-500",
                            secondChoice: color.secondChoice,
                          })
                        }
                        className={`flex h-6 w-6 items-center justify-center rounded-full bg-green-500 border-2 border-black ${
                          color.firstChoice === "bg-green-500"
                            ? "opacity-40"
                            : ""
                        }`}
                      ></span>
                      <span
                        onClick={() =>
                          setColor({
                            firstChoice: "bg-blue-500",
                            secondChoice: color.secondChoice,
                          })
                        }
                        className={`flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 border-2 border-black ${
                          color.firstChoice === "bg-blue-500"
                            ? "opacity-40"
                            : ""
                        }`}
                      ></span>
                      <span
                        onClick={() =>
                          setColor({
                            firstChoice: "bg-yellow-500",
                            secondChoice: color.secondChoice,
                          })
                        }
                        className={`flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 border-2 border-black ${
                          color.firstChoice === "bg-yellow-500"
                            ? "opacity-40"
                            : ""
                        }`}
                      ></span>
                      <span
                        onClick={() =>
                          setColor({
                            firstChoice: "bg-purple-500",
                            secondChoice: color.secondChoice,
                          })
                        }
                        className={`flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 border-2 border-black ${
                          color.firstChoice === "bg-purple-500"
                            ? "opacity-40"
                            : ""
                        }`}
                      ></span>
                      <span
                        onClick={() => {
                          setColor({
                            firstChoice: "bg-pink-500",
                            secondChoice: color.secondChoice,
                          });
                        }}
                        className={`flex h-6 w-6 items-center justify-center rounded-full bg-pink-500 border-2 border-black ${
                          color.firstChoice === "bg-pink-500"
                            ? "opacity-40"
                            : ""
                        }`}
                      ></span>
                      <span
                        onClick={() =>
                          setColor({
                            firstChoice: "bg-orange-500",
                            secondChoice: color.secondChoice,
                          })
                        }
                        className={`flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 border-2 border-black ${
                          color.firstChoice === "bg-orange-500"
                            ? "opacity-40"
                            : ""
                        }`}
                      ></span>
                      <span
                        onClick={() => {
                          setColor({
                            firstChoice: "bg-indigo-500",
                            secondChoice: color.secondChoice,
                          });
                        }}
                        className={`flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 border-2 border-black ${
                          color.firstChoice === "bg-indigo-500"
                            ? "opacity-40"
                            : ""
                        }`}
                      ></span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-2">
            <Card>
              <CardHeader>Second choice</CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div>
                    <Label htmlFor="secondChoice">Title</Label>
                    <Input
                      id="secondChoice"
                      type="text"
                      onChange={(e) =>
                        setPostData({
                          ...postData,
                          secondChoice: {
                            title: e.target.value,
                          },
                          firstChoice: postData.firstChoice,
                          description: postData.description,
                        })
                      }
                      value={postData.secondChoice.title}
                      placeholder="React Native"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="secondChoiceColor">Color</Label>
                    <div className="flex flex-row space-x-2 border-2 rounded-lg w-auto p-1.5 justify-center items-center">
                      <span
                        onClick={() =>
                          setColor({
                            secondChoice: "bg-red-500",
                            firstChoice: color.firstChoice,
                          })
                        }
                        className={`flex h-6 w-6 items-center justify-center rounded-full bg-red-500 border-2 border-black ${
                          color.secondChoice === "bg-red-500"
                            ? "opacity-40"
                            : ""
                        }`}
                      ></span>
                      <span
                        onClick={() =>
                          setColor({
                            secondChoice: "bg-green-500",
                            firstChoice: color.firstChoice,
                          })
                        }
                        className={`flex h-6 w-6 items-center justify-center rounded-full bg-green-500 border-2 border-black ${
                          color.secondChoice === "bg-green-500"
                            ? "opacity-40"
                            : ""
                        }`}
                      ></span>
                      <span
                        onClick={() =>
                          setColor({
                            secondChoice: "bg-blue-500",
                            firstChoice: color.firstChoice,
                          })
                        }
                        className={`flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 border-2 border-black ${
                          color.secondChoice === "bg-blue-500"
                            ? "opacity-40"
                            : ""
                        }`}
                      ></span>
                      <span
                        onClick={() =>
                          setColor({
                            secondChoice: "bg-yellow-500",
                            firstChoice: color.firstChoice,
                          })
                        }
                        className={`flex h-6 w-6 items-center justify-center rounded-full bg-yellow-500 border-2 border-black ${
                          color.secondChoice === "bg-yellow-500"
                            ? "opacity-40"
                            : ""
                        }`}
                      ></span>
                      <span
                        onClick={() =>
                          setColor({
                            secondChoice: "bg-purple-500",
                            firstChoice: color.firstChoice,
                          })
                        }
                        className={`flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 border-2 border-black ${
                          color.secondChoice === "bg-purple-500"
                            ? "opacity-40"
                            : ""
                        }`}
                      ></span>
                      <span
                        onClick={() => {
                          setColor({
                            secondChoice: "bg-pink-500",
                            firstChoice: color.firstChoice,
                          });
                        }}
                        className={`flex h-6 w-6 items-center justify-center rounded-full bg-pink-500 border-2 border-black ${
                          color.secondChoice === "bg-pink-500"
                            ? "opacity-40"
                            : ""
                        }`}
                      ></span>
                      <span
                        onClick={() =>
                          setColor({
                            secondChoice: "bg-orange-500",
                            firstChoice: color.firstChoice,
                          })
                        }
                        className={`flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 border-2 border-black ${
                          color.secondChoice === "bg-orange-500"
                            ? "opacity-40"
                            : ""
                        }`}
                      ></span>
                      <span
                        onClick={() => {
                          setColor({
                            secondChoice: "bg-indigo-500",
                            firstChoice: color.firstChoice,
                          });
                        }}
                        className={`flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 border-2 border-black ${
                          color.secondChoice === "bg-indigo-500"
                            ? "opacity-40"
                            : ""
                        }`}
                      ></span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <CardFooter>
            <Button
              onClick={(e: any) => {
                e.preventDefault();
                if (color.firstChoice === "" || color.secondChoice === "") {
                  return toast.error("Please select a color for both choices");
                }
                if (color.firstChoice === color.secondChoice) {
                  return toast.error("Colors must be different");
                }
                createPostAction(postData, color, userId).then(() => {
                  router.push("/");
                });
              }}
              disabled={session.data?.user ? false : true}
              className="w-full relative top-6 flex flex-row space-x-2"
            >
              <Icons.plus className="size-[1.2rem] dark:text-black text-white" />
              <span className="dark:text-black text-white">Create</span>
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
