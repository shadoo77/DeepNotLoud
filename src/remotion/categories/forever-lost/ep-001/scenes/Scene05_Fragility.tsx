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

interface Scene05FragilityProps {
  offsetFrames: number;
}

const SEGMENTS = [
  {
    text: "After 113 years in saltwater — the steel is brittle as a cracker.",
    startRatio: 0.0,
    endRatio: 0.2,
  },
  {
    text: "A bacteria called Halomonas titanicae is eating the wreck.",
    startRatio: 0.2,
    endRatio: 0.4,
  },
  {
    text: "It produces rust formations consuming the hull from the inside.",
    startRatio: 0.4,
    endRatio: 0.58,
  },
  {
    text: "Scientists estimate the Titanic will be gone within 20 years.",
    startRatio: 0.58,
    endRatio: 0.75,
  },
  {
    text: "If anyone attempted to lift it today — it would disintegrate.",
    startRatio: 0.75,
    endRatio: 1.0,
  },
];

export const Scene05Fragility: React.FC<Scene05FragilityProps> = ({
  offsetFrames,
}) => {
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

  const crackOpacity = interpolate(localFrame, [0, durationFrames * 0.7], [0, 0.6], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background
        image="assets/forever-lost/ep-001/images/ocean-bg.jpeg"
        overlayOpacity={0.7}
      />

      <svg
        viewBox="0 0 1280 720"
        className="absolute h-full w-full"
        style={{ opacity: crackOpacity }}
      >
        <path
          d="M640,0 L620,180 L580,250 L640,320 L600,400 L660,500 L630,600 L650,720"
          stroke="#3D1A1A"
          strokeWidth={3}
          fill="none"
          opacity={0.6}
        />
        <path
          d="M640,320 L700,380 L680,450 L720,520 L670,620 L690,720"
          stroke="#3D1A1A"
          strokeWidth={2}
          fill="none"
          opacity={0.4}
        />
        <path
          d="M580,250 L520,310 L550,380 L500,460 L540,550 L510,640 L530,720"
          stroke="#3D1A1A"
          strokeWidth={1.5}
          fill="none"
          opacity={0.3}
        />
      </svg>

      <AbsoluteFill className="items-center justify-center">
        <StatsDisplay
          number="113 yrs"
          label="Under Extreme Pressure"
          startFrame={5}
          durationFrames={Math.floor(0.3 * durationFrames)}
          numberColor="#8B5E3C"
        />
        <div className="h-[50px]" />
        <StatsDisplay
          number="20 yrs"
          label="Until Complete Disintegration"
          startFrame={Math.floor(0.58 * durationFrames)}
          durationFrames={Math.floor(0.3 * durationFrames)}
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

      <Audio src={staticFile("assets/forever-lost/ep-001/voices/scene_05_fragility.wav")} />
    </AbsoluteFill>
  );
};
