import React from "react";
import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { Background } from "../components/Background";

interface Scene06PlansProps {
  offsetFrames: number;
}

const PLANS = [
  { text: "Fill it with ping-pong balls", result: "Crushed before reaching the wreck" },
  { text: "Attach balloons to the hull", result: "Implode on the way down" },
  { text: "Freeze it in liquid nitrogen", result: "Would need 500,000 tons of nitrogen" },
  { text: "Just build a crane and lift it", result: "Would cost over $100 billion" },
];

const SEGMENTS = [
  {
    text: "People have been trying to solve this for over a century.",
    startRatio: 0.0,
    endRatio: 0.12,
  },
  {
    text: "Fill it with ping-pong balls. The balls get crushed.",
    startRatio: 0.12,
    endRatio: 0.28,
  },
  {
    text: "Attach balloons to the hull. Same problem — implode.",
    startRatio: 0.28,
    endRatio: 0.42,
  },
  {
    text: "Freeze it in liquid nitrogen. Would need 500,000 tons.",
    startRatio: 0.42,
    endRatio: 0.56,
  },
  {
    text: "Build a crane. Would cost over $100 billion. Minimum.",
    startRatio: 0.56,
    endRatio: 0.78,
  },
  {
    text: "And even if we could — where would you put a 269-meter deteriorating shipwreck?",
    startRatio: 0.78,
    endRatio: 1.0,
  },
];

export const Scene06Plans: React.FC<Scene06PlansProps> = ({ offsetFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - offsetFrames;

  if (localFrame < 0) return null;

  const durationFrames = Math.floor(50 * fps);

  const segmentsTimed = SEGMENTS.map((seg) => ({
    text: seg.text,
    startFrame: Math.floor(seg.startRatio * durationFrames),
    endFrame: Math.floor(seg.endRatio * durationFrames),
  }));

  const activeIndex = segmentsTimed.findIndex(
    (seg) => localFrame >= seg.startFrame && localFrame < seg.endFrame
  );

  return (
    <AbsoluteFill>
      <Background
        image="assets/forever-lost/ep-001/images/ocean-bg.jpeg"
        overlayOpacity={0.72}
      />

      <AbsoluteFill className="items-center justify-center" style={{ paddingBottom: 120 }}>
        <div
          className="mb-10 font-sans text-[36px] font-semibold uppercase tracking-wider text-amber-400/90"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}
        >
          Failed Attempts
        </div>

        {PLANS.map((plan, i) => {
          const planStart = Math.floor((0.12 + i * 0.15) * durationFrames);
          const planEnd = Math.floor((0.12 + (i + 1) * 0.15) * durationFrames);
          const isVisible = localFrame >= planStart;
          const isFading = localFrame > planEnd;

          const opacity = isVisible
            ? interpolate(
                localFrame - planStart,
                [0, 8],
                [0, 1],
                { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
              ) *
              (isFading
                ? interpolate(
                    localFrame - planEnd,
                    [0, 10],
                    [1, 0.3],
                    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
                  )
                : 1)
            : 0;

          return (
            <div
              key={i}
              className="mb-4 font-sans text-[28px] font-normal"
              style={{
                color: isFading ? "#6B7B9B" : "#E2E8F0",
                opacity,
                textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                textDecoration: isFading ? "line-through" : "none",
                textDecorationColor: "rgba(255,107,107,0.5)",
              }}
            >
              ✕ {plan.text}
            </div>
          );
        })}
      </AbsoluteFill>

      <AbsoluteFill className="items-center justify-end" style={{ paddingBottom: 80 }}>
        <div className="max-w-[90%] text-center font-sans leading-relaxed" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}>
          {segmentsTimed.map((seg, i) => {
            const isActive = i === activeIndex;
            const isPast = i < activeIndex;
            return (
              <span
                key={i}
                className={`text-[32px] ${
                  isActive
                    ? "font-medium text-white opacity-100"
                    : isPast
                      ? "font-light text-slate-500 opacity-40"
                      : "opacity-0"
                }`}
              >
                {seg.text}{" "}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>

      <Audio src={staticFile("assets/forever-lost/ep-001/voices/scene_06_plans.wav")} />
    </AbsoluteFill>
  );
};
