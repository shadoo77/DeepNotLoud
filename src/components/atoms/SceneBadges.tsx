import { spring, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { TranscriptEntry } from "@/types";
import { getPhraseFrames } from "@/lib/utils";

export type BadgeDef = {
  phrase: string;
  fallbackFrame: number;
  position: {
    left?: number;
    right?: number;
    top: number | string;
  };
  borderColor: string;
  title: string;
  subtitle?: string;
  subtitleColor?: string;
  titleFontFamily: string;
  subtitleFontFamily: string;
  titleSize?: "text-xl" | "text-2xl" | "text-3xl" | "text-4xl";
};

export const SceneBadges: React.FC<{
  badges: BadgeDef[];
  transcriptData: TranscriptEntry[];
  voiceOverStartFrame: number;
}> = ({ badges, transcriptData, voiceOverStartFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const badgeSpring = (trigger: number) =>
    spring({
      frame: Math.max(0, frame - trigger),
      fps,
      config: { damping: 12, stiffness: 200 },
    });

  const badgeOpacity = (trigger: number) =>
    interpolate(Math.max(0, frame - trigger), [0, 20], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  return badges.map((badge) => {
    const result = getPhraseFrames({
      phrase: badge.phrase,
      transcriptData,
      fps,
      voiceOverStartFrame,
    });
    const triggerFrame = result.from > 0 ? result.from : badge.fallbackFrame;

    if (triggerFrame <= 0) return null;

    return (
      <div
        key={badge.title}
        className="pointer-events-none absolute rounded-xl px-6 py-4"
        style={{
          left: badge.position.left,
          right: badge.position.right,
          top: badge.position.top,
          opacity: badgeOpacity(triggerFrame),
          transform: `scale(${badgeSpring(triggerFrame)})`,
          backgroundColor: "rgba(10,10,10,0.88)",
          border: `1px solid ${badge.borderColor}`,
        }}
      >
        <div
          className={`${badge.titleSize || "text-3xl"} font-black tracking-wider`}
          style={{
            fontFamily: badge.titleFontFamily,
            color: badge.borderColor,
          }}
        >
          {badge.title}
        </div>
        {badge.subtitle && (
          <div
            className="mt-1.5 text-2xl"
            style={{
              fontFamily: badge.subtitleFontFamily,
              color: badge.subtitleColor || "#AAAAAA",
            }}
          >
            {badge.subtitle}
          </div>
        )}
      </div>
    );
  });
};
