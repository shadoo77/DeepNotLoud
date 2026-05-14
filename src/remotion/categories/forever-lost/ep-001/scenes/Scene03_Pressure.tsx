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

interface Scene03PressureProps {
  offsetFrames: number;
}

const SEGMENTS = [
  {
    text: "The pressure is 380 times greater than at sea level.",
    startRatio: 0.0,
    endRatio: 0.2,
  },
  {
    text: "5,500 pounds per square inch — pressing on everything.",
    startRatio: 0.2,
    endRatio: 0.38,
  },
  {
    text: "Imagine 50 elephants balanced on a single postage stamp.",
    startRatio: 0.38,
    endRatio: 0.55,
  },
  {
    text: "That is the force the Titanic endures. Every second.",
    startRatio: 0.55,
    endRatio: 0.7,
  },
  {
    text: "Submarines get crushed long before reaching this depth.",
    startRatio: 0.7,
    endRatio: 0.85,
  },
  {
    text: "A styrofoam cup down there? Shrinks to the size of a thimble.",
    startRatio: 0.85,
    endRatio: 1.0,
  },
];

export const Scene03Pressure: React.FC<Scene03PressureProps> = ({
  offsetFrames,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - offsetFrames;

  if (localFrame < 0) return null;

  const durationFrames = Math.floor(40 * fps);

  const segmentsTimed = SEGMENTS.map((seg) => ({
    text: seg.text,
    startFrame: Math.floor(seg.startRatio * durationFrames),
    endFrame: Math.floor(seg.endRatio * durationFrames),
  }));

  const activeIndex = segmentsTimed.findIndex(
    (seg) => localFrame >= seg.startFrame && localFrame < seg.endFrame
  );

  const pressureRings = [0, 1, 2, 3].map((i) => {
    const ringStart = i * Math.floor(durationFrames / 4);
    const ringProgress = interpolate(
      localFrame - ringStart,
      [0, Math.floor(durationFrames / 5)],
      [0, 1],
      { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
    );
    const ringScale = ringProgress * 2;
    const ringOpacity = Math.max(0, 1 - ringProgress);

    return { ringScale, ringOpacity, visible: localFrame >= ringStart };
  });

  return (
    <AbsoluteFill>
      <Background
        image="assets/forever-lost/ep-001/images/ocean-bg.jpeg"
        overlayOpacity={0.75}
      />

      {pressureRings.map(
        (ring, i) =>
          ring.visible && (
            <AbsoluteFill key={i} className="items-center justify-center">
              <div
                className="absolute rounded-full border-2"
                style={{
                  width: 200 * ring.ringScale,
                  height: 200 * ring.ringScale,
                  borderColor: "rgba(79, 195, 212, 0.3)",
                  opacity: ring.ringOpacity,
                }}
              />
            </AbsoluteFill>
          )
      )}

      <AbsoluteFill className="items-center justify-center">
        <StatsDisplay
          number="380x"
          label="Pressure at Depth"
          startFrame={5}
          durationFrames={Math.floor(0.35 * durationFrames)}
          numberColor="#FF6B6B"
        />

        <div className="h-[60px]" />

        <StatsDisplay
          number="5,500 PSI"
          label="Per Square Inch"
          startFrame={Math.floor(0.25 * durationFrames)}
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

      <Audio src={staticFile("assets/forever-lost/ep-001/voices/scene_03_pressure.wav")} />
    </AbsoluteFill>
  );
};
