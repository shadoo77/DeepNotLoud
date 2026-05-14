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

interface Scene07OutroProps {
  offsetFrames: number;
}

const SEGMENTS = [
  {
    text: "But beyond all the physics and the engineering — there is one more reason.",
    startRatio: 0.0,
    endRatio: 0.18,
  },
  {
    text: "Over 1,500 people never made it to the surface that night.",
    startRatio: 0.18,
    endRatio: 0.34,
  },
  {
    text: "Many of them are still down there.",
    startRatio: 0.34,
    endRatio: 0.46,
  },
  {
    text: "The wreck is — legally and morally — a cemetery.",
    startRatio: 0.46,
    endRatio: 0.62,
  },
  {
    text: "Governments. Families. Historians. They all agree:",
    startRatio: 0.62,
    endRatio: 0.74,
  },
  {
    text: "Some things should stay where they rest.",
    startRatio: 0.74,
    endRatio: 0.88,
  },
  {
    text: "The Titanic chose the ocean floor. And the ocean floor chose to keep it.",
    startRatio: 0.88,
    endRatio: 1.0,
  },
];

export const Scene07Outro: React.FC<Scene07OutroProps> = ({ offsetFrames }) => {
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

  const vignetteOpacity = interpolate(
    localFrame,
    [0, durationFrames * 0.3],
    [0.3, 0.7],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  const titleOpacity = interpolate(
    localFrame,
    [durationFrames * 0.85, durationFrames],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill>
      <Background
        image="assets/forever-lost/ep-001/images/ocean-bg.jpeg"
        overlayOpacity={vignetteOpacity}
        blur={2}
      />

      <AbsoluteFill className="items-center justify-center" style={{ paddingBottom: 100, opacity: titleOpacity }}>
        <div
          className="mb-4 font-sans text-[56px] font-bold tracking-widest text-cyan-400"
          style={{ textShadow: "0 4px 30px rgba(0,0,0,0.9)" }}
        >
          FOREVER LOST
        </div>
        <div
          className="font-sans text-[28px] font-light italic text-slate-400"
          style={{ textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}
        >
          Some things should stay where they rest.
        </div>
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

      <Audio src={staticFile("assets/forever-lost/ep-001/voices/scene_07_outro.wav")} />
    </AbsoluteFill>
  );
};
