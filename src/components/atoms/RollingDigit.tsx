import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";

export const RollingDigit: React.FC<{
  target: string;
  triggerFrame: number;
  delay: number;
}> = ({ target, triggerFrame, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const numericTarget = parseInt(target, 10);
  if (isNaN(numericTarget)) {
    return <span>{target}</span>;
  }

  const rollProgress = spring({
    frame: Math.max(0, frame - (triggerFrame + delay)),
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const currentNumber = Math.round(
    interpolate(rollProgress, [0, 1], [0, numericTarget]),
  );

  return <span>{currentNumber}</span>;
};
