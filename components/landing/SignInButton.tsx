import { signIn } from "@/auth/auth";
import { LogIn } from "lucide-react";
import { Button } from "../ui/button";

const SignInButton = () => {
  return (
    <form>
      <Button
        variant="secondary"
        size="sm"
        formAction={async () => {
          "use server";
          await signIn("google");
        }}
        className="relative border-transparent"
      >
        <LogIn className="w-4 h-4 mr-2" />
        Login
      </Button>
    </form>
  );
};

export default SignInButton;
