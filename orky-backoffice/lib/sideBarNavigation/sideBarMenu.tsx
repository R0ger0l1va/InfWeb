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
  const { resolvedTheme } = useTheme();
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
              className="w-full relative pl-5  pr-4 overflow-visible"
            >
              <Link
                href={nav.navigation}
                className="relative block w-full overflow-visible"
              >
                {isActive &&
                  // Solo mostrar la imagen si:
                  // - Es el primer ítem (índice 0)
                  // - Y el tema es dark (solo en cliente, tras montaje)
                  navItems.indexOf(nav) === 0 &&
                  resolvedTheme === "dark" && (
                    <div className="absolute z-20 in-dark:-top-9.5 bottom-0 left-0 -right-5 in-dark:right-0 pointer-events-none">
                      <Image
                        src="/assets/images/sideBarDarkMask.png"
                        alt="active indicator (dark)"
                        width={450}
                        height={300}
                      />
                    </div>
                  )}

                {isActive &&
                  // Mostrar la imagen normal (light) si:
                  // - Es el primer ítem
                  // - Y NO es dark (es light o no está resuelto aún → pero como mounted=true, resolvedTheme existe)

                  resolvedTheme !== "dark" && (
                    <div className="absolute z-20  -top-6.5 bottom-0 left-0 -right-5 in-dark:right-0 pointer-events-none">
                      <Image
                        src="/assets/images/sideBarMask.png"
                        alt="active indicator (light)"
                        width={450}
                        height={300}
                      />
                    </div>
                  )}

                <Button
                  className={`text-lg w-full hover:cursor-pointer   py-5 relative z-30
                    ${
                      isActive &&
                      navItems.indexOf(nav) !== 0 &&
                      resolvedTheme === "dark"
                        ? "rounded-lg bg-amber-custom   font-semibold text-black "
                        : !isActive && resolvedTheme === "dark"
                          ? "text-white   hover:mr-52 hover:bg-linear-330 from-amber-custom from-10% to-transparent to-45%"
                          : isActive &&
                              resolvedTheme === "dark" &&
                              navItems.indexOf(nav) === 0
                            ? "text-black"
                            : !isActive && resolvedTheme !== "dark"
                              ? " rounded-full  hover:bg-linear-120 from-amber-300 to-transparent"
                              : ""
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
