import { ComponentPropsWithRef } from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { cn } from "@/lib/utils";

type CountUpProps = ComponentPropsWithRef<"div"> & {
  from?: number;
  to: number;
  durationInFrames: number;
  delay?: number;
  fontSize?: number;
  color?: string;
  suffix?: string;
};

export function CountUp({
  from = 0,
  to,
  durationInFrames,
  delay = 0,
  fontSize = 80,
  color = "oklch(0.75 0.15 185)",
  suffix = "",
  ref,
  className,
  ...rest
}: CountUpProps) {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [delay, delay + durationInFrames],
    [0, 1],
    { extrapolateRight: "clamp" },
  );

  // Ease-out curve for satisfying deceleration at the end
  const easedProgress = 1 - Math.pow(1 - progress, 3);

  const currentValue = Math.round(from + (to - from) * easedProgress);

  return (
    <div
      ref={ref}
      style={{
        fontSize,
        color,
        textShadow: `0 0 20px ${color}`,
      }}
      className={cn("font-mono font-bold", className)}
      {...rest}
    >
      {currentValue.toLocaleString()}
      {suffix}
    </div>
  );
}
