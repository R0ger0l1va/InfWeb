"use client";
import { SidebarMenuItem } from "@/components/ui/sidebar";
import { navItems } from "./sideNavigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const SideBarMenu = () => {
  const pathname = usePathname();
  const {resolvedTheme} = useTheme()
  const [mounted, setMounted] = useState(false);
useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  setMounted(true);
}, []);
  if (!mounted) {
    return (
      <div className="flex w-full flex-col gap-3">
        {navItems.map((nav) => (
          <SidebarMenuItem key={nav.name} className="pl-5">
            <Button className="text-2xl py-6 w-full text-left opacity-0">
              <nav.icons className="size-8 inline mr-2" />
              {nav.name}
            </Button>
          </SidebarMenuItem>
        ))}
      </div>
    );
  }
  return (
    <>
      <div className="flex w-full flex-col   gap-3 overflow-visible">
        {navItems.map((nav) => {
          const isActive = pathname === nav.navigation;
          return (
            <SidebarMenuItem
              key={nav.name}
              className="w-full relative pl-5 overflow-visible"
            >
              <Link
                href={nav.navigation}
                className="relative block w-full overflow-visible"
              >
                {isActive && (
                  <div className="absolute z-20 in-dark:-top-14 -top-8 bottom-0 left-0  -right-5  pointer-events-none">
                    <Image
                      src={
                        resolvedTheme === "dark"
                          ? "/assets/images/sideBarDarkMask.png"
                          : "/assets/images/sideBarMask.png"
                      }
                      alt="active indicator"
                      width={450}
                      height={300}
                    />
                  </div>
                )}

                <Button
                  className={`text-lg w-full  justify-baseline relative z-30
                    ${
                      isActive
                        ? "rounded-l-full border-amber-300 font-semibold text-black not-dark:border-l-black not-dark:border-b-black not-dark:border-t-black"
                        : "hover:border-r-8 hover:border-amber-300 not-dark:hover:border-black"
                    }
                  `}
                >
                  <nav.icons className="size-7 inline mr-2" />
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
