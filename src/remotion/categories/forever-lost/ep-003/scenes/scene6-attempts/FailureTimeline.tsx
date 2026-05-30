import { interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cinzel";
import { C } from "@/remotion/categories/forever-lost/ep-003/constants";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

type TimelineEntry = {
  year: string;
  institution: string;
  outcome: string;
  triggerFrame: number;
};

export const FailureTimeline: React.FC<{
  frame: number;
  fps: number;
  entries: TimelineEntry[];
}> = ({ frame, fps, entries }) => {
  return (
    <div
      className="pointer-events-none absolute overflow-hidden"
      style={{
        left: 0,
        top: 60,
        width: "33%",
        height: "75%",
      }}
    >
      <div
        className="flex h-full flex-col justify-center rounded-xl px-6 py-5"
        style={{
          backgroundColor: "rgba(10,10,10,0.92)",
          borderRight: "1px solid #222",
        }}
      >
        {entries.map((entry, i) => {
          const dotSpring = spring({
            frame: Math.max(0, frame - entry.triggerFrame),
            fps,
            config: { damping: 14, stiffness: 150 },
          });
          const dotScale = interpolate(dotSpring, [0, 1], [0, 1]);
          const textOpacity = interpolate(
            Math.max(0, frame - (entry.triggerFrame + 5)),
            [0, 10],
            [0, 1],
            { extrapolateRight: "clamp" },
          );
          const labelSlide = interpolate(
            Math.max(0, frame - (entry.triggerFrame + 5)),
            [0, 10],
            [-10, 0],
            { extrapolateRight: "clamp" },
          );

          return (
            <div key={entry.year} className="flex items-start gap-3 py-2.5">
              {/* Dot column */}
              <div className="flex flex-col items-center pt-1">
                <div
                  className="size-3.5 rounded-full"
                  style={{
                    backgroundColor: C.red,
                    transform: `scale(${dotScale})`,
                    boxShadow: `0 0 6px ${C.red}`,
                  }}
                />
                {i < entries.length - 1 && (
                  <div
                    className="w-[1px] flex-1"
                    style={{
                      backgroundColor: "#444",
                      height: 32,
                      opacity: interpolate(
                        Math.max(0, frame - entry.triggerFrame),
                        [0, 20],
                        [0, 1],
                        { extrapolateRight: "clamp" },
                      ),
                    }}
                  />
                )}
              </div>

              {/* Label column */}
              <div
                className="flex flex-col"
                style={{
                  opacity: textOpacity,
                  transform: `translateX(${labelSlide}px)`,
                }}
              >
                <div
                  className="text-xl font-bold tracking-wider"
                  style={{
                    fontFamily: "Courier New",
                    color: C.gold,
                  }}
                >
                  {entry.year}
                </div>
                <div
                  className="text-3xl leading-tight font-bold"
                  style={{ fontFamily: cinzelFont, color: C.white }}
                >
                  {entry.institution}
                </div>
                <div
                  className="mt-1 inline-block self-start rounded-full px-3 py-1.5 text-xl font-bold"
                  style={{
                    backgroundColor: C.red,
                    color: C.white,
                    fontFamily: "Courier New",
                  }}
                >
                  {entry.outcome}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
