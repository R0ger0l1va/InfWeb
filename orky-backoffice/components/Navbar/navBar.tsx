"use client";
import { usePathname } from "next/navigation";
import ThemeChangeButton from "../theme/changeThemeButton";
import { SidebarTrigger } from "../ui/sidebar";
import { UserMenu } from "./userMenu";

function NavBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/auth")) return null;
  return (
    <nav className="flex items-center justify-between px-4 h-14 border-b border-zinc-800 bg-black/50 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <span className="text-zinc-500 text-sm font-medium">DASHBOARD</span>
      </div>
      <div className="flex items-center gap-4">
        <ThemeChangeButton />
        <UserMenu />
      </div>
    </nav>
  );
}

export default NavBar;
