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
import { StatsDisplay } from "../components/Captions";

interface Scene02DepthProps {
  offsetFrames: number;
}

const SEGMENTS = [
  {
    text: "The Titanic rests at 3,800 meters below the surface.",
    startRatio: 0.0,
    endRatio: 0.25,
  },
  {
    text: "That's 2.37 miles — straight down — into the North Atlantic.",
    startRatio: 0.25,
    endRatio: 0.5,
  },
  {
    text: "Stack nine Eiffel Towers — you still wouldn't reach it.",
    startRatio: 0.5,
    endRatio: 0.72,
  },
  {
    text: "Deeper than submarines can operate. Zero sunlight. Eternal darkness.",
    startRatio: 0.72,
    endRatio: 1.0,
  },
];

export const Scene02Depth: React.FC<Scene02DepthProps> = ({ offsetFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - offsetFrames;

  if (localFrame < 0) return null;

  const durationFrames = Math.floor(36 * fps);

  const segmentsTimed = SEGMENTS.map((seg) => ({
    text: seg.text,
    startFrame: Math.floor(seg.startRatio * durationFrames),
    endFrame: Math.floor(seg.endRatio * durationFrames),
  }));

  const activeIndex = segmentsTimed.findIndex(
    (seg) => localFrame >= seg.startFrame && localFrame < seg.endFrame
  );

  const depthLineOpacity = interpolate(localFrame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background
        image="assets/forever-lost/ep-001/images/depth-scroll.jpeg"
        overlayOpacity={0.7}
      />

      <AbsoluteFill className="items-center justify-center" style={{ opacity: depthLineOpacity }}>
        <StatsDisplay
          number="3,800m"
          label="Below the Surface"
          startFrame={5}
          durationFrames={Math.floor(0.3 * durationFrames)}
          numberColor="#4FC3D4"
        />

        <div className="h-[60px]" />

        <StatsDisplay
          number="2.37 mi"
          label="Straight Down"
          startFrame={Math.floor(0.28 * durationFrames)}
          durationFrames={Math.floor(0.3 * durationFrames)}
          numberColor="#C9956B"
        />

        <div className="h-[60px]" />

        <StatsDisplay
          number="9x"
          label="Eiffel Towers Deep"
          startFrame={Math.floor(0.55 * durationFrames)}
          durationFrames={Math.floor(0.25 * durationFrames)}
          numberColor="#7FB3C0"
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

      <Audio src={staticFile("assets/forever-lost/ep-001/voices/scene_02_depth.wav")} />
    </AbsoluteFill>
  );
};
