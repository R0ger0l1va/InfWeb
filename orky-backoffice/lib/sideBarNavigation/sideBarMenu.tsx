"use client";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { navItems } from "./sideNavigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Bookmark } from "lucide-react";

const SideBarMenu = () => {
  const pathname = usePathname();
  return (
    <>
      <div className=" flex w-full  flex-col gap-3  ">
        {navItems.map((nav) => {
          const isActive = pathname === nav.navigation;
          return (
            <SidebarMenuItem key={nav.name} className="w-full pl-5">
              <Link href={nav.navigation}>
                <Button
                  className={` text-2xl py-6 hover:cursor-pointer  w-full
                    ${isActive ? " rounded-l-full   bg-amber-500/10 font-semibold not-dark:bg-amber-300" : "hover:border-r-8 hover:border-amber-300"} `}
                >
                  
                  <nav.icons className="size-8" />
                  {nav.name}
                </Button>
              </Link>
            </SidebarMenuItem>
          );
        })}
      </div>
    </>
  );
};

export default SideBarMenu;
