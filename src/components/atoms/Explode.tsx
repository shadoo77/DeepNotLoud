import { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, interpolate, random } from "remotion";

interface ExplodeProps {
  text: string;
  triggerFrame: number; // The frame the word starts being spoken
  color?: string;
  fontSize?: number;
}

export function Explode({
  text,
  triggerFrame,
  color = "oklch(0.75 0.15 185)",
  fontSize = 120,
}: ExplodeProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Generate random velocity vectors ONCE so they don't change on re-renders
  const vectors = useMemo(() => {
    return text.split("").map((_, i) => ({
      x: (random(`x-${i}-${text}`) - 0.5) * 800,
      y: (random(`y-${i}-${text}`) - 0.5) * 600,
      rotation: (random(`r-${i}-${text}`) - 0.5) * 90,
    }));
  }, [text]);

  // Give the word 1 second to exist normally before exploding
  const explodeStartFrame = triggerFrame + fps * 0.8;

  return (
    <div className="flex justify-center">
      {text.split("").map((char, i) => {
        const progress = interpolate(
          frame,
          [explodeStartFrame, explodeStartFrame + fps * 1.5],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        const translateX = interpolate(progress, [0, 1], [0, vectors[i].x]);
        const translateY = interpolate(progress, [0, 1], [0, vectors[i].y]);
        const rotate = interpolate(progress, [0, 1], [0, vectors[i].rotation]);
        const opacity = interpolate(progress, [0, 0.8], [1, 0]);
        const blur = interpolate(progress, [0, 1], [0, 20]);

        return (
          <span
            key={i}
            className="inline-block font-sans font-extrabold"
            style={{
              color,
              fontSize,
              textShadow: `0 0 20px ${color}`,
              transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`,
              opacity,
              filter: `blur(${blur}px)`,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        );
      })}
    </div>
  );
}
