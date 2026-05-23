import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  useVideoConfig, // Added to dynamically get scene duration
  staticFile,
  interpolate,
  Easing,
} from "remotion";
import { Audio } from "@remotion/media";
import { TiktokCaptions } from "@/components/atoms/TiktokCaptions";
import { LowerThird } from "../../components/LowerThird";
import { AnimatedBanner } from "../../components/AnimatedBanner";
import { ASSET_PATH, C } from "../../constants"; // Added C for colors
import { TRASCRIPT_DATA } from "./constants";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig(); // Gets 600 frames (20s) from constants

  // FIX 2: Ken Burns over full scene duration (600 frames), not 720
  const kenBurns = interpolate(frame, [0, durationInFrames], [1.0, 1.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Dark vignette: radial-gradient opacity 0→0.5 over 30 frames
  const vignette = interpolate(frame, [0, 30], [0, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Burning text: fades in at frame 90
  const burningOpacity = interpolate(frame, [90, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Frame counter flicker
  const counterOpacity = Math.sin(frame * 0.3) * 0.2 + 0.5;

  return (
    <AbsoluteFill className="bg-ash">
      {/* FIX 1: Removed Sequence wrapper so the explosion rings out fully */}
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/sfx/explosion_distant.wav`)}
        volume={0.9}
      />

      {/* VO */}
      <Audio src={staticFile(`${ASSET_PATH}/audio/vo/ep02L_s1.wav`)} />

      {/* Background image with Ken Burns */}
      <AbsoluteFill>
        <Img
          src={staticFile(`${ASSET_PATH}/images/ep02L_s1_aerial.jpeg`)}
          className="h-full w-full object-cover"
          style={{ transform: `scale(${kenBurns})` }}
        />
      </AbsoluteFill>

      {/* Dark vignette overlay */}
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
      />

      {/* Large center text */}
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

      {/* Frame counter bottom-right */}
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

      {/* Captions */}
      <TiktokCaptions
        transcript={TRASCRIPT_DATA}
        position="bottom-center"
        startFrame={0}
        switchCaptionsEveryMs={1800}
        showOverlay
      />

      {/* FIX 3: White on dark strip, as per MD instructions */}
      <AnimatedBanner
        items={["CHERNOBYL · REACTOR 4 · FOREVER LOST · EPISODE 02"]}
        speed={1}
        position="top"
        fontSize={18}
        bgColor={C.bg}
        textColor={C.white} // White text
      />
    </AbsoluteFill>
  );
};
