import {
  AbsoluteFill,
  Img,
  Sequence,
  useCurrentFrame,
  staticFile,
  interpolate,
  Easing,
} from "remotion";
import { Audio } from "@remotion/media";
import { KineticText } from "../../components/KineticText";
import { AnimatedBanner } from "../../components/AnimatedBanner";
import { ASSET_PATH } from "../../constants";

export const Intro: React.FC = () => {
  const frame = useCurrentFrame();

  // Typewriter: FOREVER LOST, one letter per frame, frames 30-60
  const titleReveal = Math.min(
    Math.floor(Math.max(0, frame - 30)),
    14,
  );
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

  // Image: fade in at 40% opacity over frames 180-300
  const imageFull = interpolate(frame, [300, 420], [0.4, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const kenBurns = interpolate(frame, [180, 420], [1.0, 1.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text fade-out: frames 300-420
  const textGroupOpacity = interpolate(frame, [300, 360], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-ash">
      <Sequence premountFor={5}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/geiger_loop.wav`)}
          volume={(f) => (f === 0 ? 1 : 0)}
        />
      </Sequence>
      <Sequence premountFor={5}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/vo/ep02L_intro.wav`)}
        />
      </Sequence>

      {/* Background image */}
      <AbsoluteFill style={{ opacity: imageFull }}>
        <Img
          src={staticFile(`${ASSET_PATH}/images/ep02L_intro_sign.jpeg`)}
          className="h-full w-full object-cover"
          style={{ transform: `scale(${kenBurns})` }}
        />
      </AbsoluteFill>

      {/* Dim overlay */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.85))`,
          opacity: interpolate(frame, [0, 30], [1, 0.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      {/* Title group */}
      <AbsoluteFill
        className="flex-col items-center justify-center"
        style={{ opacity: textGroupOpacity }}
      >
        {/* FOREVER LOST typewriter */}
        <div
          className="text-center font-bebas text-white"
          style={{
            fontSize: 180,
            letterSpacing: 8,
            height: 200,
          }}
        >
          {letters}
          <span style={{ visibility: "hidden" }}>FOREVER LOST</span>
        </div>

        {/* Green underline bar */}
        <div
          className="h-1.5 rounded-full"
          style={{
            width: `${barWidth}%`,
            maxWidth: 600,
            backgroundColor: "#39FF14",
            marginTop: -40,
            marginBottom: 40,
          }}
        />

        {/* Episode subtitle */}
        <div
          className="text-center font-inter text-white"
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

      {/* Bottom scrolling banner */}
      <AnimatedBanner
        items={[
          "UKRAINE · 1986",
          "REACTOR 4 EXPLOSION",
          "APRIL 26 · 01:23 LOCAL TIME",
        ]}
        speed={1.2}
        position="bottom"
      />
    </AbsoluteFill>
  );
};
