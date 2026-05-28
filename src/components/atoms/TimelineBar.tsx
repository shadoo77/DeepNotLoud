import { interpolate, useCurrentFrame, useVideoConfig, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cinzel";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400", "700"],
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
  trackFontSize?: number;
}> = ({ milestones, startFrame = 0, color = "#C8A96E", trackFontSize = 18 }) => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

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

  const pulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.6, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const BAR_WIDTH = width * 0.6;
  const DOT_SPACING = BAR_WIDTH / (milestones.length - 1 || 1);

  const activeLineWidth =
    activeMilestoneIndex >= 0
      ? (activeMilestoneIndex / (milestones.length - 1 || 1)) * BAR_WIDTH
      : 0;

  return (
    <div
      className="pointer-events-none absolute left-1/2 -translate-x-1/2"
      style={{
        bottom: 70,
        width: BAR_WIDTH,
      }}
    >
      <div className="relative h-7 mb-3">
        {milestones.map((m, i) => {
          const isActive = i <= activeMilestoneIndex;
          const isCurrent = i === activeMilestoneIndex;
          return (
            <div
              key={m.year}
              className="absolute -translate-x-1/2 whitespace-nowrap"
              style={{
                left: i * DOT_SPACING,
                fontFamily: cinzelFont,
                fontSize: trackFontSize,
                fontWeight: isCurrent ? 700 : 400,
                color: isCurrent ? color : isActive ? "#AAA" : "#555",
                opacity: isActive ? 1 : 0.4,
              }}
            >
              {m.year}
            </div>
          );
        })}
      </div>

      <div className="relative h-6">
        <div className="absolute top-[10px] left-0 right-0 h-[3px] rounded-sm"
          style={{ backgroundColor: "#333" }}
        />

        <div
          className="absolute top-[10px] left-0 h-[3px] rounded-sm"
          style={{
            width: activeLineWidth,
            backgroundColor: color,
            boxShadow: `0 0 8px ${color}80`,
          }}
        />

        {milestones.map((m, i) => {
          const isCurrent = i === activeMilestoneIndex;
          const isActive = i <= activeMilestoneIndex;

          const dotSpring = spring({
            frame: Math.max(0, frame - startFrame - m.frame),
            fps,
            config: { damping: 12, stiffness: 150 },
          });
          const dotSize = interpolate(
            dotSpring,
            [0, 1],
            [0, isCurrent ? 18 : 12],
          );

          return (
            <div
              key={m.year}
              className="absolute top-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: i * DOT_SPACING,
                width: dotSize,
                height: dotSize,
                backgroundColor: isCurrent ? color : isActive ? color : "#444",
                opacity: isCurrent ? pulse : isActive ? 0.8 : 0.3,
                boxShadow:
                  isCurrent && pulse > 0.8 ? `0 0 14px ${color}` : "none",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
