import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";

interface CaptionsProps {
  segments: { text: string; startFrame: number; endFrame: number }[];
  bottomOffset?: number;
}

export const Captions: React.FC<CaptionsProps> = ({
  segments,
  bottomOffset = 80,
}) => {
  const frame = useCurrentFrame();

  const activeIndex = segments.findIndex(
    (seg) => frame >= seg.startFrame && frame < seg.endFrame
  );

  return (
    <AbsoluteFill className="items-center justify-end" style={{ paddingBottom: bottomOffset }}>
      <div className="max-w-[90%] text-center font-sans">
        {segments.map((seg, i) => {
          const isActive = i === activeIndex;
          const isPast = i < activeIndex;

          return (
            <span
              key={i}
              className={`text-[32px] leading-relaxed ${
                isActive
                  ? "font-medium text-white"
                  : isPast
                    ? "font-light text-slate-500"
                    : "opacity-0"
              }`}
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.8)" }}
            >
              {seg.text}{" "}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

interface WordData {
  word: string;
  startFrame: number;
  endFrame: number;
}

export const WordCaptions: React.FC<{ words: WordData[] }> = ({ words }) => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill className="items-center justify-end" style={{ paddingBottom: 80 }}>
      <div
        className="max-w-[90%] text-center font-sans text-[36px] leading-relaxed font-normal"
        style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}
      >
        {words.map((w, i) => {
          const isActive = frame >= w.startFrame && frame < w.endFrame;
          const isPast = frame >= w.endFrame;

          return (
            <span
              key={i}
              className={isActive ? "text-cyan-400" : isPast ? "text-slate-500" : "text-slate-400"}
              style={{
                opacity: isPast ? 0.5 : 1,
                fontWeight: isActive ? 600 : 400,
                fontSize: isActive ? 38 : 36,
              }}
            >
              {w.word}{" "}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

export const AnimatedTitle: React.FC<{
  text: string;
  startFrame: number;
  durationFrames: number;
  size?: number;
  color?: string;
}> = ({ text, startFrame, durationFrames, size = 64, color = "#FFFFFF" }) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  if (localFrame < 0 || localFrame > durationFrames) return null;

  const opacity = interpolate(
    localFrame,
    [0, Math.min(15, durationFrames * 0.15)],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  const y = interpolate(
    localFrame,
    [0, Math.min(20, durationFrames * 0.2)],
    [30, 0],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  return (
    <div
      className="max-w-[85%] text-center font-sans font-bold leading-tight"
      style={{
        fontSize: size,
        color,
        opacity,
        transform: `translateY(${y}px)`,
        textShadow: "0 4px 20px rgba(0,0,0,0.9)",
      }}
    >
      {text}
    </div>
  );
};

export const StatsDisplay: React.FC<{
  number: string;
  label: string;
  startFrame: number;
  durationFrames: number;
  numberColor?: string;
}> = ({
  number,
  label,
  startFrame,
  durationFrames,
  numberColor = "#4FC3D4",
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  if (localFrame < 0 || localFrame > durationFrames) return null;

  const opacity = interpolate(
    localFrame,
    [0, 15],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  const scale = interpolate(
    localFrame,
    [0, 20],
    [0.8, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  return (
    <div className="text-center" style={{ opacity, transform: `scale(${scale})` }}>
      <div
        className="font-sans text-[96px] font-extrabold leading-none tracking-tight"
        style={{
          color: numberColor,
          textShadow: `0 4px 30px ${numberColor}66`,
        }}
      >
        {number}
      </div>
      <div
        className="mt-3 font-sans text-[24px] font-normal uppercase tracking-widest text-slate-400"
        style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}
      >
        {label}
      </div>
    </div>
  );
};
