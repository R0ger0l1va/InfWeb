"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

function ThemeChangeButton() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
   // Solo después de montar en el cliente, permitimos renderizar el ícono real
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    // Renderiza un placeholder neutro mientras tanto (mismo tamaño, sin contenido visible)
    return <Button size="icon" variant="ghost" aria-label="Cargando tema" className="opacity-0" />;
  }



  function toogleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <>
      {" "}
      <Button
        onClick={toogleTheme}
        size={"icon"}
        
        aria-label={`Cambiar a tema ${resolvedTheme === "dark" ? "claro" : "oscuro"}`}
        className="rounded-full group "
      >
        {resolvedTheme === "dark" ? (
          <Sun className="group-hover:text-yellow-300 transition-colors" />
        ) : (
          <Moon className="group-hover:text-blue-600 transition-colors" />
        )}
      </Button>
    </>
  );
}

export default ThemeChangeButton;
