import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Audio } from "@remotion/media";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";
import { getPhraseFrames } from "@/lib/utils";
import { DataTicker, LowerThird, AnimatedBanner } from "../../components";
import { ASSET_PATH, C } from "../../constants";
import { TRASCRIPT_DATA, VO_START_FRAME } from "./constants";

export const Scene6Exclusion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const frame50k = getPhraseFrames({
    phrase: "50000 people",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  }).from;

  const frameNeverReturned = getPhraseFrames({
    phrase: "never returned",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  }).from;

  const frameFerris = getPhraseFrames({
    phrase: "ferris wheel",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  }).from;

  const frame20000 = getPhraseFrames({
    phrase: "20000 years",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  }).from;

  const zoomOut = interpolate(frame, [0, fps * 8], [1.08, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const markerPop50k = spring({
    fps,
    frame: Math.max(0, frame - frame50k),
    config: { damping: 13, stiffness: 180 },
  });
  const markerPopNever = spring({
    fps,
    frame: Math.max(0, frame - frameNeverReturned),
    config: { damping: 13, stiffness: 180 },
  });
  const markerPopFerris = spring({
    fps,
    frame: Math.max(0, frame - frameFerris),
    config: { damping: 13, stiffness: 180 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Audio src={staticFile(`${ASSET_PATH}/audio/vo/ep02L_s6.wav`)} />
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/sfx/geiger_loop.wav`)}
        volume={0.12}
        loop
      />

      <Img
        src={staticFile(`${ASSET_PATH}/images/ep02L_s6_exclusion.jpeg`)}
        className="h-full w-full object-cover"
        style={{ transform: `scale(${zoomOut})` }}
      />

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.34), rgba(0,0,0,0.62) 60%, rgba(0,0,0,0.75))",
        }}
      />

      <LowerThird
        title="ZONE OF ALIENATION"
        subtitle="Chernobyl Exclusion Zone · 2,600 km²"
        startFrame={30}
      />

      <div className="absolute top-[22%] left-[10%]">
        <div
          className="rounded-md border px-5 py-3"
          style={{
            borderColor: C.white,
            backgroundColor: "rgba(17,17,17,0.72)",
            transform: `scale(${markerPop50k})`,
            opacity: interpolate(frame, [frame50k, frame50k + 15], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div className="font-bebas text-4xl text-white">50,000 EVACUATED</div>
        </div>
      </div>

      <div className="absolute top-[29%] right-[11%]">
        <div
          className="rounded-md border px-5 py-3"
          style={{
            borderColor: C.red,
            backgroundColor: "rgba(17,17,17,0.74)",
            transform: `scale(${markerPopNever})`,
            opacity: interpolate(
              frame,
              [frameNeverReturned, frameNeverReturned + 15],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        >
          <div className="font-bebas text-bloodRed text-4xl">
            NEVER RETURNED
          </div>
        </div>
      </div>

      <div className="absolute top-[41%] left-[52%]">
        <div
          className="rounded-md border px-5 py-3"
          style={{
            borderColor: C.green,
            backgroundColor: "rgba(17,17,17,0.72)",
            transform: `scale(${markerPopFerris})`,
            opacity: interpolate(
              frame,
              [frameFerris, frameFerris + 15],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        >
          <div className="font-bebas text-toxicGreen text-4xl">
            FERRIS WHEEL
          </div>
        </div>
      </div>

      <div className="absolute top-[55%] left-1/2 -translate-x-1/2 text-center">
        <div
          style={{
            opacity: interpolate(frame, [frame20000, frame20000 + 16], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <DataTicker
            from={0}
            to={20000}
            startFrame={frame20000}
            duration={fps * 4}
            suffix=" years"
            fontSize={110}
            color={C.green}
          />
          <div className="font-inter mt-1 text-3xl text-white/80">
            until safe again
          </div>
        </div>
      </div>

      <YouTubeCaptions
        transcript={TRASCRIPT_DATA}
        highlightedWords={[
          "50,000",
          "three",
          "days",
          "never",
          "20,000",
          "Stone",
          "Age",
        ]}
        position="bottom-center"
        mode="sentence"
        showOverlay
      />

      <AnimatedBanner
        items={[
          "ZONE OF ALIENATION",
          "30KM RADIUS",
          "2,600 KM²",
          "50,000 RESIDENTS DISPLACED",
        ]}
        bgColor={C.red}
        textColor={C.white}
        fontSize={18}
        speed={1.2}
        position="bottom"
      />
    </AbsoluteFill>
  );
};
