"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const TopAnimation = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <DotLottieReact
      src={
        resolvedTheme === "dark"
          ? "/animations/Killer While.json"
          : "/animations/Killer While Black.json"
      }
      loop
      autoplay
    />
  );
};

export default TopAnimation;
