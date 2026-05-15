import { useCurrentFrame, interpolate } from "remotion";

interface DissolutionTimelineProps {
  startFrame: number;
  durationFrames: number;
}

export function DissolutionTimeline({
  startFrame,
  durationFrames,
}: DissolutionTimelineProps) {
  const frame = useCurrentFrame();

  const progress = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const currentYear = Math.round(1912 + progress * (2030 - 1912));
  const hullOpacity = interpolate(progress, [0, 1], [0.9, 0.1]);

  return (
    <div className="absolute left-1/2 -translate-x-1/2 w-[60%] flex flex-col items-center"
      style={{ bottom: "15%" }}
    >
      <div
        className="font-mono text-[64px] text-biolumTeal mb-5"
        style={{ textShadow: "0 0 20px var(--color-biolumTeal)" }}
      >
        {currentYear}
      </div>

      <div className="w-full h-1 bg-steelGrey opacity-30 rounded-sm relative">
        <div
          className="h-full bg-rustOrange rounded-sm"
          style={{
            width: `${progress * 100}%`,
            boxShadow: "0 0 10px var(--color-rustOrange)",
          }}
        />

        <div
          className="absolute -top-5 -translate-x-1/2 w-10 h-1 bg-surfaceWhite"
          style={{
            left: `${progress * 100}%`,
            opacity: hullOpacity,
            boxShadow: "0 0 8px var(--color-oceanBlue)",
          }}
        />
      </div>

      <div className="w-full flex justify-between mt-[10px]">
        <span className="text-steelGrey text-sm font-mono">1912</span>
        <span className="text-rustOrange text-sm font-mono">2030</span>
      </div>
    </div>
  );
}
