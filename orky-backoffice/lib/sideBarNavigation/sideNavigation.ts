import { DASHBOARD } from "@/navigation/navigation";
import { Image, LayoutDashboard } from "lucide-react";
import { ReactElement } from "react";

export type NavItem = {
    name:string;
    icon: ReactElement
    navigation:string
}

export const navItems = [
    {
        name:'Dashboard',
        icons:LayoutDashboard,
        navigation:DASHBOARD.root
    },
    {
        name:'Album',
        icons: Image,
        navigation:DASHBOARD.images
    }
]