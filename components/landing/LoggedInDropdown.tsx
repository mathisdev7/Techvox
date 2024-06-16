"use client";
import { LogOut } from "lucide-react";
import { signOutAction } from "../action/signOut.action";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export type LoggedInDropdownProps = {
  children: React.ReactNode;
};

export default function LoggedInDropdown({ children }: LoggedInDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col items-center justify-center">
        <form>
          <DropdownMenuItem
            onClick={() => {
              signOutAction();
            }}
            className="bg-transparent hover:border-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
