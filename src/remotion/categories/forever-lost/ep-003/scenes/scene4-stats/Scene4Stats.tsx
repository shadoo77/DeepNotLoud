import {
  AbsoluteFill,
  Img,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { Audio } from "@remotion/media";
import { getPhraseFrames } from "@/lib/utils";
import { TickerBar } from "@/components/atoms/TickerBar";
import { DustParticles } from "@/components/atoms/DustParticles";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";
import { SceneBadges } from "@/components/atoms/SceneBadges";
import {
  C,
  ASSET_PATH,
} from "@/remotion/categories/forever-lost/ep-003/constants";
import { TRASCRIPT_DATA, VO_START_FRAME } from "./constants";
import { BADGES } from "./badges";
import { StatCounter, STATS } from "./StatCounter";
import { ZipfChart } from "./ZipfChart";

export const Scene4Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const kenBurns = interpolate(frame, [0, 2280], [1.0, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  const zipfResult = getPhraseFrames({
    phrase: "zipf's law",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const zipfTrigger = zipfResult.from > 0 ? zipfResult.from : 1200;
  const zipfLocal = Math.max(0, frame - zipfTrigger);

  const zipfOpacity = interpolate(zipfLocal, [0, 20, 400, 500], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const terrifyingResult = getPhraseFrames({
    phrase: "terrifying",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const terrifyingFrame =
    terrifyingResult.from > 0 ? terrifyingResult.from : 1700;

  return (
    <AbsoluteFill className="overflow-hidden" style={{ backgroundColor: C.bg }}>
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transform: `scale(${kenBurns})` }}
      >
        <Img
          src={staticFile(`${ASSET_PATH}/images/ep003_manuscript_spread.jpeg`)}
          className="size-full object-cover"
          style={{ opacity: 0.4 }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.70) 100%)",
        }}
      />

      <DustParticles count={50} />

      <div
        className="pointer-events-none absolute right-0 bottom-0 left-0"
        style={{
          height: "55%",
          backgroundColor: "#0D0D0D",
          borderTop: `1px solid #222`,
        }}
      >
        <div className="grid h-full grid-cols-2 grid-rows-2">
          {STATS.map((stat) => (
            <StatCounter key={stat.id} stat={stat} frame={frame} fps={fps} />
          ))}
        </div>
      </div>

      <SceneBadges
        badges={BADGES}
        transcriptData={TRASCRIPT_DATA}
        voiceOverStartFrame={VO_START_FRAME}
      />

      <ZipfChart
        frame={frame}
        fps={fps}
        triggerFrame={zipfTrigger}
        opacity={zipfOpacity}
      />

      <TickerBar opacity={1} color={C.gold} />

      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/vo/ep003_L_s4_stats.wav`)}
          volume={1}
        />
        <YouTubeCaptions
          transcript={TRASCRIPT_DATA}
          highlightedWords={[
            "mystery",
            "pages",
            "38,000",
            "thousand",
            "words",
            "nobody",
            "characters",
            "alphabet",
            "zipf",
            "law",
            "statistical",
            "mathematical",
            "terrifying",
            "million",
            "online",
            "unreadable",
          ]}
          position="top-center"
          startFrame={0}
          showOverlay
        />
      </Sequence>

      <Sequence from={VO_START_FRAME} durationInFrames={2280}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/clock_tick.wav`)}
          volume={(f) => ([0, 15, 30, 45].includes(f) ? 0.25 : 0)}
        />
      </Sequence>

      <Sequence from={terrifyingFrame}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/impact_thud.wav`)}
          volume={(f) =>
            interpolate(f, [0, 60], [0.5, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>
    </AbsoluteFill>
  );
};
