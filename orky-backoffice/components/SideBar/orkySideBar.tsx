import { navItems } from "@/lib/sideBarNavigation/sideNavigation";
import {
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  Sidebar,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Button } from "../ui/button";
import Link from "next/link";
import TopAnimation from "@/lib/sideBarNavigation/topAnimation";
import SideBarMenu from "@/lib/sideBarNavigation/sideBarMenu";
function OrkySideBar() {
  
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupContent>
          <SidebarMenu>
            <TopAnimation />
            <SideBarMenu/>
          </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}

export default OrkySideBar;
