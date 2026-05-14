import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig, Img, staticFile } from "remotion";

interface BackgroundProps {
  image?: string;
  blur?: number;
  overlayColor?: string;
  overlayOpacity?: number;
}

export const Background: React.FC<BackgroundProps> = ({
  image,
  blur = 0,
  overlayColor = "#000",
  overlayOpacity = 0.6,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const scale = interpolate(frame, [0, durationInFrames], [1.0, 1.08], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const blurAmount = interpolate(blur, [0, 10], [0, 4], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill className="bg-[#020C1A]">
      {image && (
        <Img
          src={staticFile(image)}
          className="h-full w-full object-cover"
          style={{
            transform: `scale(${scale})`,
            filter: `blur(${blurAmount}px)`,
          }}
        />
      )}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${overlayColor}00 0%, ${overlayColor}${Math.round(overlayOpacity * 255).toString(16).padStart(2, "0")} 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};
