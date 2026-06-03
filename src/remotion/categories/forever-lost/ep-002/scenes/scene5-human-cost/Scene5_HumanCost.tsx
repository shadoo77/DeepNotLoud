import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Audio } from "@remotion/media";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";
import { getPhraseFrames } from "@/lib/utils";
import { DataTicker, KineticText, LowerThird } from "../../components";
import { ASSET_PATH, C } from "../../constants";
import { TRASCRIPT_DATA, VO_START_FRAME } from "./constants";

export const Scene5HumanCost: React.FC = () => {
  const frame = useCurrentFrame();
  const fps = 30;

  const frame600k = getPhraseFrames({
    phrase: "600000",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  }).from;

  const frameDeaths = getPhraseFrames({
    phrase: "4000 and nearly 1 million",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  }).from;

  const vignetteOpacity = interpolate(frame, [0, 30], [0.2, 0.72], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rightPanelWidthPct = interpolate(frame, [0, 45], [0, 40], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rightPanelOpacity = interpolate(frame, [0, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Audio src={staticFile(`${ASSET_PATH}/audio/vo/ep02L_s5.mp3`)} />

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
        className="absolute top-0 right-0 h-full border-l border-white/15 px-8 py-28"
        style={{
          width: `${rightPanelWidthPct}%`,
          opacity: rightPanelOpacity,
          backgroundColor: "rgba(0,0,0,0.66)",
          transform: `translateX(${interpolate(frame, [0, 45], [20, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        <div
          style={{
            opacity: interpolate(frame, [frame600k, frame600k + 25], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <DataTicker
            to={600000}
            startFrame={frame600k}
            duration={70}
            suffix="+"
            fontSize={96}
            color={C.white}
          />
          <div className="font-inter mt-2 text-3xl text-white/90">
            Workers deployed
          </div>
        </div>

        <div
          className="mt-8 h-[2px]"
          style={{
            backgroundColor: C.green,
            width: `${interpolate(
              frame,
              [frameDeaths - 20, frameDeaths + 10],
              [0, 100],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            )}%`,
          }}
        />

        <div
          className="mt-7"
          style={{
            opacity: interpolate(
              frame,
              [frameDeaths, frameDeaths + 30],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        >
          <div className="text-bloodRed font-mono text-5xl">
            ~4,000 - 1,000,000
          </div>
          <div className="font-inter mt-2 text-2xl text-white/85">
            Estimated deaths (disputed)
          </div>
        </div>
      </div>

      <div
        className="absolute top-[40%] right-[45%] left-[8%] rounded-lg border border-white/20 bg-black/35 p-5"
        style={{
          opacity: interpolate(frame, [0, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <KineticText
          text="We may never have a definitive number."
          startFrame={0}
          fontSize={48}
          color={C.white}
          staggerFrames={10}
          center
        />
      </div>

      <YouTubeCaptions
        transcript={TRASCRIPT_DATA}
        highlightedWords={[
          "liquidators",
          "600,000",
          "4,000",
          "1",
          "million",
          "loss",
        ]}
        position="bottom-center"
        mode="sentence"
        showOverlay
      />
    </AbsoluteFill>
  );
};
