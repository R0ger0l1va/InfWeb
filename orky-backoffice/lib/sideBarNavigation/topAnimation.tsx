"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useTheme } from "next-themes";



const TopAnimation = () => {
    const { resolvedTheme } = useTheme();
  return (
    <>
      <DotLottieReact
        src={
          resolvedTheme === "dark"
            ? "/animations/Killer While.json"
            : "/animations/Killer While Black.json"
        }
        loop
        autoplay
      />
    </>
  );
};

export default TopAnimation;
