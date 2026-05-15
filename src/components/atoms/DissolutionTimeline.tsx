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
    <div className="absolute bottom-[15%] left-1/2 flex w-[60%] -translate-x-1/2 flex-col items-center">
      <div className="relative w-full rounded-xl bg-[oklch(0.15_0.02_260_/_0.7)] p-5">
        <div className="relative mb-5">
          <div
            className="text-biolumTeal text-center font-mono text-[64px]"
            style={{ textShadow: "0 0 20px var(--color-biolumTeal)" }}
          >
            {currentYear}
          </div>
        </div>

        <div className="bg-steelGrey relative h-[6px] w-full rounded-sm opacity-80">
          <div
            className="bg-rustOrange h-full rounded-sm"
            style={{
              width: `${progress * 100}%`,
              boxShadow:
                "0 0 10px var(--color-rustOrange), 0 0 24px var(--color-rustOrange)",
            }}
          />

          <div
            className="bg-rustOrange absolute -top-[8px] h-5 w-5 -translate-x-1/2 rounded-full"
            style={{
              left: `${progress * 100}%`,
              opacity: hullOpacity,
              boxShadow:
                "0 0 14px var(--color-rustOrange), 0 0 28px var(--color-rustOrange)",
            }}
          />
        </div>

        <div className="mt-[10px] flex w-full justify-between">
          <span className="font-mono text-4xl font-bold text-stone-200">
            1912
          </span>
          <span className="text-rustOrange font-mono text-4xl font-bold">
            2030
          </span>
        </div>
      </div>
    </div>
  );
}
