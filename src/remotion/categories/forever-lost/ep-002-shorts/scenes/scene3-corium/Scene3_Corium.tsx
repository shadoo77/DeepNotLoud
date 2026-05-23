import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  useVideoConfig,
  spring,
  staticFile,
  interpolate,
} from "remotion";
import { Audio } from "@remotion/media";
import { TiktokCaptions } from "@/components/atoms/TiktokCaptions";
import { getPhraseFrames } from "@/lib/utils";
import { TRASCRIPT_DATA } from "./constants";
import { ASSET_PATH } from "../../constants";

export const Scene3Corium: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const frameElephant = getPhraseFrames({
    phrase: "elephant",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: 0,
  }).from;

  const frameFuel = getPhraseFrames({
    phrase: "melted",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: 0,
  }).from;

  const badgeFuel = spring({
    frame: Math.max(0, frame - frameFuel),
    fps,
    config: { damping: 12, stiffness: 200 },
  });

  const imagePulse = interpolate(
    frame % (fps * 4),
    [0, fps * 2, fps * 4],
    [1.0, 1.02, 1.0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const titleProgress = Math.max(0, frame - frameElephant);
  const titleOpacity = interpolate(titleProgress, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const barWidth = interpolate(titleProgress, [0, 20], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const imageWidth = interpolate(titleProgress, [0, 20], [100, 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const maskStop = interpolate(titleProgress, [0, 20], [0, 40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-ash">
      <Audio src={staticFile(`${ASSET_PATH}/audio/vo/short/ep02_s3.wav`)} />
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/sfx/geiger_loop.wav`)}
        volume={0.2}
        loop
      />
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/sfx/radiation_hum.wav`)}
        volume={0.2}
        loop
      />

      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: `${imageWidth}%`,
          height: "100%",
        }}
      >
        <Img
          src={staticFile(`${ASSET_PATH}/images/short/ep02_s3_corium.jpeg`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${imagePulse})`,
            transformOrigin: "center center",
          }}
        />
      </div>

      <AbsoluteFill
        style={{
          background: `linear-gradient(to right, var(--color-ash) 0%, transparent ${maskStop}%)`,
        }}
      />

      {frameElephant > 0 && (
        <AbsoluteFill className="flex-col items-start justify-center px-12">
          <div
            className="font-bebas text-toxicGreen text-[52px] leading-tight font-bold"
            style={{ opacity: titleOpacity }}
          >
            THE ELEPHANT'S FOOT
          </div>

          <div
            className="mt-2 h-[3px] rounded-full"
            style={{
              width: `${barWidth}%`,
              maxWidth: 320,
              backgroundColor: "var(--color-toxicGreen)",
            }}
          />
        </AbsoluteFill>
      )}

      {/* MOLTEN FUEL badge */}
      {frameFuel > 0 && (
        <div
          className="absolute inset-x-0 flex justify-center"
          style={{
            top: "30%",
            opacity: interpolate(
              Math.max(0, frame - frameFuel),
              [0, 12],
              [0, 1],
              { extrapolateRight: "clamp" },
            ),
          }}
        >
          <div
            className="rounded-xl px-6 py-4"
            style={{
              backgroundColor: "oklch(0.22 0.04 260 / 0.8)",
              backdropFilter: "blur(12px)",
              border: "1px solid var(--color-toxicGreen)",
              transform: `scale(${badgeFuel})`,
            }}
          >
            <div className="text-toxicGreen text-center font-mono text-6xl font-bold">
              THE MELTED FUEL
            </div>
            <div className="text-offWhite text-center text-4xl font-semibold">
              still fused inside
            </div>
          </div>
        </div>
      )}

      <TiktokCaptions
        transcript={TRASCRIPT_DATA}
        highlightedWords={["elephant", "foot", "Four", "minutes"]}
        position="youtube-shorts"
        startFrame={0}
        switchCaptionsEveryMs={1800}
      />
    </AbsoluteFill>
  );
};
