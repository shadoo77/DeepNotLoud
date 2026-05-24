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
import { getPhraseFrames } from "@/lib/utils";
import { KineticText } from "../../components/KineticText";
import { AnimatedBanner } from "../../components/AnimatedBanner";
import { ASSET_PATH } from "../../constants";
import { TRASCRIPT_DATA } from "./constants";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const frameApril26 = getPhraseFrames({
    phrase: "april 26",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: 0,
  }).from;

  const frame1986 = getPhraseFrames({
    phrase: "1986",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: 0,
  }).from;

  const badgeApril =
    frameApril26 > 0
      ? interpolate(Math.max(0, frame - frameApril26), [0, 15], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        })
      : 0;
  const badgeAprilOut = interpolate(
    Math.max(0, frame - frameApril26 - 60),
    [0, 15],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const badgeAprilOpacity = Math.max(0, badgeApril - badgeAprilOut);

  const badge1986 =
    frame1986 > 0
      ? interpolate(Math.max(0, frame - frame1986), [0, 15], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        })
      : 0;
  const badge1986Out = interpolate(
    Math.max(0, frame - frame1986 - 60),
    [0, 15],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const badge1986Opacity = Math.max(0, badge1986 - badge1986Out);

  // Typewriter: FOREVER LOST, frames 30-60
  const titleReveal = Math.min(Math.floor(Math.max(0, frame - 30)), 12);
  const letters = "FOREVER LOST".slice(0, titleReveal);

  // Underline bar: width 0→100% over frames 60-90
  const barWidth = interpolate(frame, [60, 90], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Subtitle "Episode 2" fade: frames 90-120
  const subOpacity = interpolate(frame, [90, 120], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Image: fade in at 40% over frames 180-300, then 40%→100% over 300-420
  const imageOpacity = interpolate(frame, [0, 180, 300, 420], [0, 0, 0.4, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const kenBurns = interpolate(frame, [180, 420], [1.0, 1.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text fade-out: frames 300-360
  const textGroupOpacity = interpolate(frame, [300, 360], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-ash">
      {/* SFX: Single Geiger tick at frame 0 */}
      <Sequence durationInFrames={2}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/geiger_loop.wav`)}
          volume={0.6}
        />
      </Sequence>

      {/* VO: Intro Narration */}
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/vo/ep02L_intro.wav`)}
        volume={1}
      />

      {/* Background image */}
      <AbsoluteFill style={{ opacity: imageOpacity }}>
        <Img
          src={staticFile(`${ASSET_PATH}/images/ep02L_intro_sign.jpeg`)}
          className="h-full w-full object-cover"
          style={{ transform: `scale(${kenBurns})` }}
        />
      </AbsoluteFill>

      {/* Dim overlay */}
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.85))",
          opacity: interpolate(frame, [0, 30], [1, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* APRIL 26TH badge */}
      {frameApril26 > 0 && (
        <div
          className="absolute inset-x-0 flex justify-center"
          style={{ top: "25%", opacity: badgeAprilOpacity }}
        >
          <div
            className="rounded-xl px-8 py-4"
            style={{
              backgroundColor: "oklch(0.22 0.04 260 / 0.8)",
              backdropFilter: "blur(12px)",
              border: "1px solid var(--color-toxicGreen)",
            }}
          >
            <div className="font-bebas text-toxicGreen text-8xl font-bold">
              APRIL 26TH
            </div>
          </div>
        </div>
      )}

      {/* 1986 badge */}
      {frame1986 > 0 && (
        <div
          className="absolute inset-x-0 flex justify-center"
          style={{ top: "25%", opacity: badge1986Opacity }}
        >
          <div
            className="rounded-xl px-8 py-4"
            style={{
              backgroundColor: "oklch(0.22 0.04 260 / 0.8)",
              backdropFilter: "blur(12px)",
              border: "1px solid var(--color-toxicGreen)",
            }}
          >
            <div className="font-bebas text-toxicGreen text-8xl font-bold">
              1986
            </div>
          </div>
        </div>
      )}

      {/* Title group */}
      <AbsoluteFill
        className="flex-col items-center justify-center"
        style={{ opacity: textGroupOpacity }}
      >
        {/* FOREVER LOST typewriter */}
        <div
          className="font-bebas flex justify-center text-center text-white"
          style={{
            fontSize: 180,
            letterSpacing: 8,
            height: 200,
            minWidth: 1200,
          }}
        >
          {letters}
        </div>

        {/* Green underline bar */}
        <div
          className="h-1.5 rounded-full"
          style={{
            width: `${barWidth}%`,
            maxWidth: 600,
            backgroundColor: "#39FF14",
            marginTop: 10, // Changed from -40 to 10 to sit UNDER the text
            marginBottom: 40,
          }}
        />

        {/* Episode subtitle */}
        <div
          className="font-inter text-center text-white"
          style={{ opacity: subOpacity, fontSize: 36, fontWeight: 400 }}
        >
          Episode 2
        </div>
      </AbsoluteFill>

      {/* Full title kinetic text */}
      <AbsoluteFill
        className="items-center justify-center px-24"
        style={{
          top: "55%",
          opacity: textGroupOpacity,
        }}
      >
        <KineticText
          text="Why Chernobyl's Core Can Never Be Removed"
          startFrame={120}
          fontSize={42}
          color="#F0EEE4"
          staggerFrames={3}
          center
        />
      </AbsoluteFill>

      {/* Captions */}
      <YouTubeCaptions
        transcript={TRASCRIPT_DATA}
        position="bottom-center"
        startFrame={0}
        mode="sentence"
      />

      {/* Top scrolling banner */}
      <AnimatedBanner
        items={[
          "UKRAINE · 1986",
          "REACTOR 4 EXPLOSION",
          "APRIL 26 · 01:23 LOCAL TIME",
        ]}
        speed={1.2}
        position="top"
      />
    </AbsoluteFill>
  );
};
