import { DASHBOARD } from "@/navigation/navigation";
import {
  Building2,
  Calendar,
  GraduationCap,
  HelpCircle,
  Image,
  LayoutDashboard,
  User,
} from "lucide-react";
import { ReactElement } from "react";

export type NavItem = {
  name: string;
  icon: ReactElement;
  navigation: string;
};

export const navItems = [
  {
    name: "Dashboard",
    icons: LayoutDashboard,
    navigation: DASHBOARD.root,
  },
  {
    name: "Album",
    icons: Image,
    navigation: DASHBOARD.images,
  },
  {
    name: "Eventos",
    icons: Calendar,
    navigation: DASHBOARD.events,
  },
  {
    name: "Facultad",
    icons: Building2,
    navigation: DASHBOARD.faculty,
  },
  {
    name: "Estudiantes",
    icons: GraduationCap,
    navigation: DASHBOARD.students,
  },
  {
    name: "Profesores",
    icons: User,
    navigation: DASHBOARD.teachers,
  },
  {
    name: "Preguntas Frecuentes",
    icons: HelpCircle,
    navigation: DASHBOARD.frequentQuestions,
  },
];
