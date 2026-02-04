"use client";

import { usePathname } from "next/navigation";
import SideBar from "@/components/SideBar/orkySideBar";
import NavBar from "@/components/Navbar/navBar";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen w-full">
      <SideBar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <NavBar />
        <div className="flex-1 overflow-auto p-4 md:p-6 border-t-2 border-yellow-600">
          {children}
        </div>
      </main>
    </div>
  );
}
