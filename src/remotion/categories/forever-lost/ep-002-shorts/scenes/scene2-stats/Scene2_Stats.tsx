import {
  AbsoluteFill,
  Img,
  interpolate,
  useCurrentFrame,
  staticFile,
  Easing,
} from "remotion";
import { Audio } from "@remotion/media";
import { TRASCRIPT_DATA, SCENE_DURATION } from "./constants";
import { TiktokCaptions } from "@/components/atoms/TiktokCaptions";
import { ASSET_PATH } from "@/remotion/categories/forever-lost/ep-002-shorts/constants";

interface StatCardProps {
  value: string;
  label: string;
  color: string;
  startFrame: number;
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  color,
  startFrame,
}) => {
  const frame = useCurrentFrame();
  const progress = Math.max(0, frame - startFrame);

  const translateY = interpolate(progress, [0, 20], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const opacity = interpolate(progress, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      className="flex flex-col items-center gap-2"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <span
        className="font-bebas text-[96px] leading-none tracking-[0.05em]"
        style={{ color }}
      >
        {value}
      </span>
      <span
        className="font-inter text-offWhite text-center text-[22px] leading-tight font-light tracking-[0.08em]"
        style={{ textShadow: "0 0 20px rgba(0,0,0,0.8)" }}
      >
        {label}
      </span>
    </div>
  );
};

const FPS = 30;

const CARD_FRAMES = {
  fourHundred: Math.round(
    ((TRASCRIPT_DATA.find((t) => t.text.trim() === "400")?.startMs ?? 410) /
      1000) *
      FPS,
  ),
  twoHundred: Math.round(
    ((TRASCRIPT_DATA.find((t) => t.text.trim() === "200")?.startMs ?? 5500) /
      1000) *
      FPS,
  ),
  sixHundred: Math.round(
    ((TRASCRIPT_DATA.find((t) => t.text.includes("600"))?.startMs ?? 12000) /
      1000) *
      FPS,
  ),
};

export const Scene2Stats: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, SCENE_DURATION], [0.7, 0.5], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const geigerPulse = interpolate(frame % 120, [0, 60, 120], [0.2, 0.25, 0.2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.5, 0, 0.5, 1),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#1A1A1A" }}>
      <Audio src={staticFile(`${ASSET_PATH}/audio/vo/short/ep02_s2.wav`)} />
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/sfx/geiger_loop.wav`)}
        volume={geigerPulse}
        loop
      />

      <AbsoluteFill>
        <Img
          src={staticFile(`${ASSET_PATH}/images/short/ep02_s2_texture.jpeg`)}
          className="h-full w-full object-cover"
          style={{ opacity: bgOpacity }}
        />
      </AbsoluteFill>

      <AbsoluteFill className="bg-gradient-to-b from-black/40 to-black/80" />

      <AbsoluteFill className="flex-col items-center justify-center gap-12">
        <StatCard
          value="×400"
          label="Hiroshima bombs of radiation"
          color="#39FF14"
          startFrame={CARD_FRAMES.fourHundred}
        />
        <StatCard
          value="200t"
          label="nuclear fuel — still inside"
          color="#F0EEE4"
          startFrame={CARD_FRAMES.twoHundred}
        />
        <StatCard
          value="600K+"
          label="cleanup workers deployed"
          color="#8B0000"
          startFrame={CARD_FRAMES.sixHundred}
        />
      </AbsoluteFill>

      <TiktokCaptions
        transcript={TRASCRIPT_DATA}
        highlightedWords={["400", "200"]}
        position="youtube-shorts"
        startFrame={0}
        switchCaptionsEveryMs={1200}
      />
    </AbsoluteFill>
  );
};
