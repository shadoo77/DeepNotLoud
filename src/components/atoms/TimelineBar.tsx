import { interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cinzel";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

interface Milestone {
  year: string;
  label?: string;
  frame: number;
}

export const TimelineBar: React.FC<{
  milestones: Milestone[];
  startFrame?: number;
  color?: string;
}> = ({ milestones, startFrame = 0, color = "#C8A96E" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  if (milestones.length === 0) return null;

  const activeMilestoneIndex = (() => {
    let idx = -1;
    for (let i = 0; i < milestones.length; i++) {
      if (frame >= startFrame + milestones[i].frame) {
        idx = i;
      } else {
        break;
      }
    }
    return idx;
  })();

  const pulse = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0.4, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const BAR_WIDTH = 350;
  const DOT_SPACING = BAR_WIDTH / (milestones.length - 1 || 1);

  return (
    <div
      className="pointer-events-none absolute bottom-16 left-8"
      style={{ height: 50 }}
    >
      <div className="flex items-end">
        {milestones.map((m, i) => {
          const isActive = i <= activeMilestoneIndex;
          const isCurrent = i === activeMilestoneIndex;
          const dotSpring = spring({
            frame: Math.max(0, frame - startFrame - m.frame),
            fps,
            config: { damping: 12, stiffness: 150 },
          });
          const dotRadius = interpolate(dotSpring, [0, 1], [0, 6]);

          return (
            <div
              key={m.year}
              className="flex flex-col items-center"
              style={{
                width: i === milestones.length - 1 ? "auto" : DOT_SPACING,
                marginRight: i === milestones.length - 1 ? 0 : 0,
              }}
            >
              <div
                className="text-[11px] mb-1 whitespace-nowrap"
                style={{
                  fontFamily: cinzelFont,
                  color: isCurrent ? color : "#666",
                  opacity: isActive ? 1 : 0.3,
                }}
              >
                {m.year}
              </div>
              <div
                className="rounded-full"
                style={{
                  width: isCurrent ? 12 : 8,
                  height: isCurrent ? 12 : 8,
                  backgroundColor: isCurrent ? color : "#444",
                  opacity: isCurrent ? pulse : isActive ? 0.6 : 0.3,
                  boxShadow:
                    isCurrent && pulse > 0.7
                      ? `0 0 8px ${color}`
                      : "none",
                }}
              />
              <div
                style={{
                  width: isCurrent ? dotRadius : 6,
                  height: 2,
                  backgroundColor: isActive ? color : "#444",
                  opacity: isActive ? 0.5 : 0.2,
                  marginTop: 4,
                }}
              />
            </div>
          );
        })}
      </div>
      <div
        className="absolute left-0 bottom-1 h-[2px]"
        style={{
          width: BAR_WIDTH,
          backgroundColor: "#333",
          opacity: 0.4,
        }}
      />
    </div>
  );
};
