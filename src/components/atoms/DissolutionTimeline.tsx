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
    <div className="absolute left-1/2 bottom-[15%] -translate-x-1/2 w-[60%] flex flex-col items-center">
      <div className="relative w-full rounded-xl p-5 bg-[oklch(0.15_0.02_260_/_0.7)]">
        <div className="relative mb-5">
          <div
            className="font-mono text-[64px] text-biolumTeal text-center"
            style={{ textShadow: "0 0 20px var(--color-biolumTeal)" }}
          >
            {currentYear}
          </div>
        </div>

        <div className="w-full h-[6px] bg-steelGrey opacity-50 rounded-sm relative">
          <div
            className="h-full bg-rustOrange rounded-sm"
            style={{
              width: `${progress * 100}%`,
              boxShadow:
                "0 0 12px var(--color-rustOrange), 0 0 24px var(--color-rustOrange)",
            }}
          />

          <div
            className="absolute -top-[18px] -translate-x-1/2 w-5 h-5 rounded-full bg-rustOrange"
            style={{
              left: `${progress * 100}%`,
              opacity: hullOpacity,
              boxShadow:
                "0 0 14px var(--color-rustOrange), 0 0 28px var(--color-rustOrange)",
            }}
          />
        </div>

        <div className="w-full flex justify-between mt-[10px]">
          <span className="text-stone-200 text-4xl font-bold font-mono">
            1912
          </span>
          <span className="text-rustOrange text-4xl font-bold font-mono">
            2030
          </span>
        </div>
      </div>
    </div>
  );
}
