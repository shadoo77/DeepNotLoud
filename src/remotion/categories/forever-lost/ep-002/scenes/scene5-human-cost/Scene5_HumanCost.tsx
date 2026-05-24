import { AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Audio } from "@remotion/media";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";
import { DataTicker, KineticText, LowerThird } from "../../components";
import { ASSET_PATH, C } from "../../constants";
import { TRASCRIPT_DATA } from "./constants";

export const Scene5HumanCost: React.FC = () => {
  const frame = useCurrentFrame();

  const vignetteOpacity = interpolate(frame, [0, 30], [0.2, 0.72], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Audio src={staticFile(`${ASSET_PATH}/audio/vo/ep02L_s5.wav`)} />

      <Img
        src={staticFile(`${ASSET_PATH}/images/ep02L_s5_liquidators.jpeg`)}
        className="h-full w-full object-cover"
        style={{ filter: "grayscale(100%)" }}
      />

      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at center, rgba(0,0,0,0) 20%, rgba(0,0,0,${vignetteOpacity}) 88%)`,
        }}
      />

      <LowerThird
        title="THE LIQUIDATORS"
        subtitle="Soviet Cleanup Workers · 1986-1990"
        startFrame={30}
      />

      <div
        className="absolute right-0 top-0 h-full w-[40%] border-l border-white/15 px-8 py-28"
        style={{ backgroundColor: "rgba(0,0,0,0.66)" }}
      >
        <div
          style={{
            opacity: interpolate(frame, [55, 80], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <DataTicker
            to={600000}
            startFrame={55}
            duration={70}
            suffix="+"
            fontSize={96}
            color={C.white}
          />
          <div className="font-inter mt-2 text-3xl text-white/90">Workers deployed</div>
        </div>

        <div
          className="mt-8 h-[2px]"
          style={{
            backgroundColor: C.green,
            width: `${interpolate(frame, [105, 130], [0, 100], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}%`,
          }}
        />

        <div
          className="mt-7"
          style={{
            opacity: interpolate(frame, [135, 165], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div className="font-mono text-5xl text-bloodRed">~4,000 - 1,000,000</div>
          <div className="font-inter mt-2 text-2xl text-white/85">Estimated deaths (disputed)</div>
        </div>
      </div>

      <div
        className="absolute left-[8%] right-[45%] top-[40%] rounded-lg border border-white/20 bg-black/35 p-5"
        style={{
          opacity: interpolate(frame, [200, 230], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <KineticText
          text="We may never have a definitive number."
          startFrame={200}
          fontSize={48}
          color={C.white}
          staggerFrames={10}
          center
        />
      </div>

      <YouTubeCaptions
        transcript={TRASCRIPT_DATA}
        highlightedWords={["liquidators", "600,000", "4,000", "1", "million", "loss"]}
        position="bottom-center"
        mode="sentence"
      />
    </AbsoluteFill>
  );
};
