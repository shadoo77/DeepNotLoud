import React from "react";
import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Background } from "../components/Background";
import { StatsDisplay } from "../components/Captions";

interface Scene04ScaleProps {
  offsetFrames: number;
}

const SEGMENTS = [
  {
    text: "The Titanic weighs 52,000 tons. 269 meters long.",
    startRatio: 0.0,
    endRatio: 0.2,
  },
  {
    text: "Longer than two and a half football fields end to end.",
    startRatio: 0.2,
    endRatio: 0.35,
  },
  {
    text: "But it didn't sink in one piece. The ship split apart.",
    startRatio: 0.35,
    endRatio: 0.55,
  },
  {
    text: "The two sections landed 600 meters apart on the ocean floor.",
    startRatio: 0.55,
    endRatio: 0.7,
  },
  {
    text: "Over 100,000 objects scattered across 27 square kilometers.",
    startRatio: 0.7,
    endRatio: 0.88,
  },
  {
    text: "There is no ship to raise. There is a graveyard of wreckage.",
    startRatio: 0.88,
    endRatio: 1.0,
  },
];

export const Scene04Scale: React.FC<Scene04ScaleProps> = ({ offsetFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - offsetFrames;

  if (localFrame < 0) return null;

  const durationFrames = Math.floor(44 * fps);

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
        overlayOpacity={0.7}
      />

      <AbsoluteFill className="items-center justify-center">
        <StatsDisplay
          number="52,000 T"
          label="Weight of Titanic"
          startFrame={5}
          durationFrames={Math.floor(0.25 * durationFrames)}
          numberColor="#7FB3C0"
        />

        <div className="h-[40px]" />

        <StatsDisplay
          number="269m"
          label="Length (2.5 Football Fields)"
          startFrame={Math.floor(0.25 * durationFrames)}
          durationFrames={Math.floor(0.25 * durationFrames)}
          numberColor="#C9956B"
        />

        <div className="h-[40px]" />

        <StatsDisplay
          number="27 km²"
          label="Debris Field"
          startFrame={Math.floor(0.72 * durationFrames)}
          durationFrames={Math.floor(0.28 * durationFrames)}
          numberColor="#FF6B6B"
        />
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

      <Audio src={staticFile("assets/forever-lost/ep-001/voices/scene_04_scale.wav")} />
    </AbsoluteFill>
  );
};
