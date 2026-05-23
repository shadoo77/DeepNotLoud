import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  interpolate,
  Easing,
} from "remotion";
import { Audio } from "@remotion/media";
import { TiktokCaptions } from "@/components/atoms/TiktokCaptions";
import { TRASCRIPT_DATA } from "./constants";
import { ASSET_PATH } from "../../constants";

export const Scene3Corium: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const imagePulse = interpolate(
    frame % (fps * 4),
    [0, fps * 2, fps * 4],
    [1.0, 1.02, 1.0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const titleX = interpolate(frame, [0, fps], [-200, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const titleOpacity = interpolate(frame, [0, fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const barWidth = interpolate(frame, [fps, fps + 15], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#1A1A1A" }}>
      <Audio src={staticFile(`${ASSET_PATH}/audio/vo/short/ep02_s3.wav`)} />
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/sfx/geiger_loop.wav`)}
        volume={0.2}
        loop
      />
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/sfx/radiation_hum.wav`)}
        volume={0.3}
        loop
      />

      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "60%",
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
          background:
            "linear-gradient(to right, #1A1A1A 0%, transparent 40%)",
        }}
      />

      <AbsoluteFill className="flex-col items-start justify-center px-12">
        <div
          className="font-bebas text-toxicGreen text-[52px] font-bold leading-tight"
          style={{
            opacity: titleOpacity,
            transform: `translateX(${titleX}px)`,
          }}
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

      <TiktokCaptions
        transcript={TRASCRIPT_DATA}
        highlightedWords={["elephant", "foot", "Four", "minutes"]}
        position="youtube-shorts"
        startFrame={0}
        switchCaptionsEveryMs={1500}
      />
    </AbsoluteFill>
  );
};
