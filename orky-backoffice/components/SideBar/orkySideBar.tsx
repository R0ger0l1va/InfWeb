"use client";
import { usePathname } from "next/navigation";
import {
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  Sidebar,
  SidebarGroupContent,
  SidebarMenu,
} from "../ui/sidebar";

import TopAnimation from "@/lib/sideBarNavigation/topAnimation";
import SideBarMenu from "@/lib/sideBarNavigation/sideBarMenu";

function OrkySideBar() {
  const pathname = usePathname();
  if (pathname.startsWith("/auth")) return null;

  return (
    <Sidebar variant="floating">
      <SidebarContent className="overflow-visible border-red-500!">
        <SidebarGroup />
        <SidebarGroupContent>
          <SidebarMenu>
            <TopAnimation />
            <SideBarMenu />
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default OrkySideBar;
