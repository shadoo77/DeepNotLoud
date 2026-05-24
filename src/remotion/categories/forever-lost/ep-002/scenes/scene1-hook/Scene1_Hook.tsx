import React from "react";
import {
  AbsoluteFill,
  Img,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  interpolate,
  Easing,
} from "remotion";
import { Audio } from "@remotion/media";
import {
  LowerThird,
  AnimatedBanner,
} from "@/remotion/categories/forever-lost/ep-002/components";
import {
  ASSET_PATH,
  C,
  mg01StartFrame,
} from "@/remotion/categories/forever-lost/ep-002/constants";
import { TRASCRIPT_DATA } from "./constants";

// Import the untouched MG component!
import { MG01Timeline } from "@/remotion/categories/forever-lost/ep-002/components/MG01Timeline";
import { SCENES } from "@/remotion/categories/forever-lost/ep-002/constants";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // ─── HOOK VISUALS ───
  const kenBurns = interpolate(frame, [0, durationInFrames], [1.0, 1.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const vignette = interpolate(frame, [0, 30], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const burningOpacity = interpolate(frame, [90, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const counterOpacity = Math.sin(frame * 0.3) * 0.2 + 0.5;

  const hookFadeStart = mg01StartFrame - 30;
  const hookFadeEnd = mg01StartFrame;

  // Fade out the Hook visuals right before the Timeline takes over
  const hookOpacity = interpolate(
    frame,
    [hookFadeStart, hookFadeEnd],
    [1, 0.8],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // ─── BRIDGE: Floating Badges (Syncs with VO) ───
  const phaseABadges = [
    { year: "Apr 26 1986", event: "Explosion" },
    { year: "May 1986", event: "First sarcophagus built" },
    { year: "1990", event: "Liquidator program ends" },
  ].map((evt, i) => {
    const startFrame = 150 + i * 120;
    const opacity = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const translateX = interpolate(opacity, [0, 1], [20, 0]);
    return { ...evt, opacity, translateX };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {/* ========== PHASE A: THE HOOK ========== */}
      <AbsoluteFill style={{ opacity: hookOpacity }}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/explosion_distant.wav`)}
          volume={0.9}
        />
        <Audio src={staticFile(`${ASSET_PATH}/audio/vo/ep02L_s1.wav`)} />

        {/* Background & Vignette */}
        <AbsoluteFill>
          <Img
            src={staticFile(`${ASSET_PATH}/images/ep02L_s1_aerial.jpeg`)}
            className="h-full w-full object-cover"
            style={{ transform: `scale(${kenBurns})` }}
          />
        </AbsoluteFill>
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,${vignette}) 100%)`,
          }}
        />

        {/* LowerThird */}
        <LowerThird
          title="CHERNOBYL, UKRAINE"
          subtitle="April 26, 1986 · 01:23 Local Time"
          startFrame={30}
          exitFrame={550} // Fade out with the rest of the hook
        />

        {/* Center Text */}
        <AbsoluteFill className="items-center justify-center">
          <div
            className="font-bebas text-center"
            style={{
              fontSize: 90,
              color: C.green,
              opacity: burningOpacity,
              letterSpacing: 6,
              lineHeight: 1.1,
            }}
          >
            BURNING FOR 39 YEARS
          </div>
        </AbsoluteFill>

        {/* Frame counter */}
        <div
          className="absolute font-mono"
          style={{
            bottom: 60,
            right: 40,
            fontSize: 14,
            color: "rgba(240,238,228,0.5)",
            opacity: counterOpacity,
          }}
        >
          26.04.1986
        </div>

        {/* Bridge: Floating Timeline Badges */}
        <div className="absolute top-1/4 right-16 flex flex-col gap-6">
          {phaseABadges.map((badge, i) => (
            <div
              key={i}
              className="flex flex-col items-end"
              style={{
                opacity: badge.opacity,
                transform: `translateX(${badge.translateX}px)`,
              }}
            >
              <div className="font-mono text-lg" style={{ color: C.green }}>
                {badge.year}
              </div>
              <div
                className="text-right font-sans text-xl font-bold"
                style={{ color: C.white }}
              >
                {badge.event}
              </div>
            </div>
          ))}
        </div>

        {/* Captions & Top Banner */}
        <YouTubeCaptions
          transcript={TRASCRIPT_DATA}
          position="bottom-center"
          startFrame={0}
          mode="sentence"
        />
        <AnimatedBanner
          items={["CHERNOBYL · REACTOR 4 · FOREVER LOST · EPISODE 02"]}
          speed={1}
          position="top"
          fontSize={18}
          bgColor={C.bg}
          textColor={C.white}
        />
      </AbsoluteFill>

      {/* ========== PHASE B: THE TIMELINE ========== */}
      {/* 
        The magic: Mounts at frame 570. 
        Inside MG01Timeline, useCurrentFrame() will start at 0!
        Its whoosh_data.wav audio will also trigger perfectly at frame 570.
      */}
      <Sequence
        from={mg01StartFrame}
        durationInFrames={SCENES.mg01.durationInFrames}
      >
        <MG01Timeline />
      </Sequence>
    </AbsoluteFill>
  );
};
