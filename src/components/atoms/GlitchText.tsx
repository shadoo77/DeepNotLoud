import { ComponentPropsWithRef } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { cn } from "@/lib/utils";

type GlitchTextProps = ComponentPropsWithRef<"span"> & {
  text: string;
  triggerFrame: number;
  color?: string;
};

export function GlitchText({
  text,
  triggerFrame,
  color = "var(--color-rustOrange)",
  className,
  ref,
  ...rest
}: GlitchTextProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = (frame - triggerFrame) / fps;

  // Glitch is most intense in the first 0.3 seconds, then stabilizes
  const glitchIntensity =
    progress < 0.3 ? 1 : Math.max(0, 1 - (progress - 0.3) * 3);

  // Randomly generate jumps based on frame to prevent flickering on re-renders
  const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };

  const translateX = (pseudoRandom(frame) - 0.5) * 40 * glitchIntensity;
  const skewX = (pseudoRandom(frame + 100) - 0.5) * 30 * glitchIntensity;
  const opacity = 0.7 + pseudoRandom(frame + 200) * 0.3;

  return (
    <span
      ref={ref}
      className={cn("inline-block", className)}
      style={{
        color,
        textShadow:
          glitchIntensity > 0.1
            ? `-5px 0 var(--color-oceanBlue), 5px 0 var(--color-biolumTeal)` // Chromatic aberration
            : "none",
        transform: `translateX(${translateX}px) skewX(${skewX}deg)`,
        opacity,
      }}
      {...rest}
    >
      {text}
    </span>
  );
}
