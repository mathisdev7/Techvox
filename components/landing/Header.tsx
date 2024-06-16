import { ToggleMode } from "@/components/ui/toggleMode";
import LoggedInButton from "./LoggedInButton";
import Logo from "./Logo";
import MobileSection from "./MobileSection";

export default function Header() {
  return (
    <header className="flex-1 border-b-2 border-t-gray-800 p-1">
      <div className="flex gap-4">
        <div className="flex-1 flex relative left-2 flex-row space-x-4">
          <Logo />
          <h1 className="text-2xl relative top-1">TechVox</h1>
        </div>
        <MobileSection />

        <ToggleMode />

        <div className="relative top-px">
          <LoggedInButton />
        </div>
      </div>
    </header>
  );
}
