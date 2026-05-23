import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  staticFile,
  interpolate,
} from "remotion";
import { Audio } from "@remotion/media";
import { ASSET_PATH } from "../../constants";

export const Scene5VisualOnly: React.FC = () => {
  const frame = useCurrentFrame();

  const vignetteOpacity = interpolate(frame, [0, 20], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [30, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subOpacity = interpolate(frame, [40, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#1A1A1A" }}>
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/sfx/geiger_loop.wav`)}
        volume={(f) => {
          const baseFrame = f % 60;
          return (
            0.12 *
            interpolate(baseFrame, [0, 30, 60], [0.8, 1.2, 0.8], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          );
        }}
        loop
      />

      <Img
        src={staticFile(`${ASSET_PATH}/images/short/ep02_s5_liquidators.jpeg`)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "grayscale(100%)",
        }}
      />

      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,${vignetteOpacity}) 100%)`,
        }}
      />

      <div
        className="absolute inset-x-0 pb-16"
        style={{ top: "20%", opacity: titleOpacity }}
      >
        <div
          className="mx-8 rounded-xl px-8 py-6 text-center"
          style={{
            backgroundColor: "oklch(0.22 0.04 260 / 0.8)",
            backdropFilter: "blur(12px)",
            border: "1px solid var(--color-bloodRed)",
          }}
        >
          <div className="font-inter text-7xl leading-tight font-bold text-white">
            600,000 LIQUIDATORS
          </div>
          <div className="text-center" style={{ opacity: subOpacity }}>
            <span className="font-inter text-4xl font-normal text-white/70">
              sent to clean what could not be cleaned
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
