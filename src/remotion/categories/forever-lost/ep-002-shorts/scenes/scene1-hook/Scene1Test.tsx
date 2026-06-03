import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
  Easing,
} from "remotion";
import { Audio } from "@remotion/media";
import { bebasNeue, inter } from "../../fonts";
import { COLORS, ASSET_PATH } from "../../constants";

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const scale = interpolate(frame, [0, durationInFrames], [1.0, 1.08], {
    extrapolateRight: "clamp",
  });
  const titleOpacity = interpolate(frame, [15, 35], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const subtitleOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill>
      <Audio src={staticFile(`${ASSET_PATH}/audio/vo/short/ep02_s1.mp3`)} />
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/sfx/explosion_distant.mp3`)}
        volume={0.8}
      />

      <AbsoluteFill>
        <Img
          src={staticFile(`${ASSET_PATH}/images/short/ep02_s1_aerial.jpeg`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${scale})`,
            transformOrigin: "center center",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.65))",
        }}
      />

      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <div
          style={{
            fontFamily: bebasNeue,
            fontSize: 96,
            color: COLORS.white,
            opacity: titleOpacity,
            letterSpacing: 8,
            textAlign: "center",
          }}
        >
          CHERNOBYL
        </div>
        <div
          style={{
            fontFamily: inter,
            fontSize: 28,
            color: COLORS.white,
            opacity: subtitleOpacity,
            fontWeight: 400,
            letterSpacing: 4,
            textAlign: "center",
          }}
        >
          UKRAINE · 1986
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
