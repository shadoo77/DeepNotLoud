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
import { loadFont } from "@remotion/google-fonts/Cinzel";
import { TickerBar } from "@/components/atoms/TickerBar";
import { DustParticles } from "@/components/atoms/DustParticles";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";
import { SceneBadges } from "@/components/atoms/SceneBadges";
import {
  C,
  ASSET_PATH,
} from "@/remotion/categories/forever-lost/ep-003/constants";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});
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

  const terrifyingFlash = interpolate(
    frame,
    [terrifyingFrame, terrifyingFrame + 4, terrifyingFrame + 12],
    [0, 0.18, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // ── MICRO-REVEALS (pacing) ──
  const flare400 = interpolate(frame, [400, 430, 630, 660], [0, 0.6, 0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glyph500 = interpolate(frame, [500, 510, 540, 550], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const alphabetFade = interpolate(frame, [750, 780, 810, 830], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line850 = interpolate(Math.max(0, frame - 850), [0, 40], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line850Opacity = interpolate(
    Math.max(0, frame - 890),
    [0, 10],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const flare1000 = interpolate(
    frame,
    [1000, 1030, 1230, 1260],
    [0, 0.6, 0.6, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const glyph1100 = interpolate(frame, [1100, 1110, 1140, 1150], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fingerprintFade = interpolate(
    frame,
    [1400, 1430, 1460, 1480],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const flare1550 = interpolate(
    frame,
    [1550, 1580, 1780, 1810],
    [0, 0.6, 0.6, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const glyph1650 = interpolate(frame, [1650, 1660, 1690, 1700], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flare1950 = interpolate(
    frame,
    [1950, 1980, 2180, 2210],
    [0, 0.6, 0.6, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const unreadableFade = interpolate(
    frame,
    [2100, 2130, 2160, 2180],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

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

      <DustParticles count={120} />

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
        defaultAutoHideFrames={300}
      />

      {/* micro-reveals */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: 0,
          left: 0,
          width: 250,
          height: 250,
          background:
            "radial-gradient(circle at top left, rgba(200,169,110,0.28), transparent 70%)",
          opacity: flare400,
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{ top: "35%", left: "12%", opacity: glyph500 }}
      >
        <span
          style={{
            color: C.gold,
            fontSize: 56,
            fontFamily: "serif",
            textShadow:
              "0 0 8px rgba(200,169,110,0.6), 0 0 24px rgba(200,169,110,0.3)",
            filter: "brightness(1.3)",
          }}
        >
          ꝏ
        </span>
      </div>
      <div
        className="pointer-events-none absolute flex items-center gap-3"
        style={{ top: "25%", left: "5%", opacity: alphabetFade }}
      >
        <div style={{ width: 20, height: 2, backgroundColor: C.gold }} />
        <span
          className="text-3xl font-semibold tracking-wider"
          style={{ fontFamily: cinzelFont, color: C.white }}
        >
          ALPHABET: 26
        </span>
      </div>
      <div
        className="pointer-events-none absolute"
        style={{
          top: "65%",
          left: 0,
          width: "100%",
          opacity: line850Opacity,
        }}
      >
        <svg width="100%" height={2}>
          <line
            x1={0}
            y1={0}
            x2={`${line850}%`}
            y2={0}
            stroke={C.gold}
            strokeWidth={2}
            strokeOpacity={0.7}
          />
        </svg>
      </div>
      <div
        className="pointer-events-none absolute"
        style={{
          top: 0,
          right: 0,
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle at top right, rgba(200,169,110,0.28), transparent 70%)",
          opacity: flare1000,
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{ top: "45%", right: "15%", opacity: glyph1100 }}
      >
        <span
          style={{
            color: C.gold,
            fontSize: 64,
            fontFamily: "serif",
            textShadow:
              "0 0 8px rgba(200,169,110,0.6), 0 0 24px rgba(200,169,110,0.3)",
            filter: "brightness(1.3)",
          }}
        >
          ⴀ
        </span>
      </div>
      <div
        className="pointer-events-none absolute flex items-center gap-3"
        style={{
          top: "15%",
          left: "50%",
          opacity: fingerprintFade,
          transform: "translateX(-50%)",
        }}
      >
        <div style={{ width: 16, height: 2, backgroundColor: C.gold }} />
        <span
          className="text-2xl font-semibold tracking-wider"
          style={{ fontFamily: cinzelFont, color: C.white }}
        >
          MATHEMATICAL FINGERPRINT
        </span>
      </div>
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: 0,
          right: 0,
          width: 250,
          height: 250,
          background:
            "radial-gradient(circle at bottom right, rgba(200,169,110,0.28), transparent 70%)",
          opacity: flare1550,
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{ top: "55%", left: "8%", opacity: glyph1650 }}
      >
        <span
          style={{
            color: C.gold,
            fontSize: 48,
            fontFamily: "serif",
            textShadow:
              "0 0 8px rgba(200,169,110,0.6), 0 0 24px rgba(200,169,110,0.3)",
            filter: "brightness(1.3)",
          }}
        >
          ꝑ
        </span>
      </div>
      <div
        className="pointer-events-none absolute"
        style={{
          top: 0,
          left: 0,
          width: 250,
          height: 250,
          background:
            "radial-gradient(circle at top left, rgba(200,169,110,0.28), transparent 70%)",
          opacity: flare1950,
        }}
      />
      <div
        className="pointer-events-none absolute flex items-center gap-3"
        style={{
          top: "20%",
          right: "8%",
          opacity: unreadableFade,
        }}
      >
        <div style={{ width: 20, height: 2, backgroundColor: C.gold }} />
        <span
          className="text-2xl font-semibold tracking-wider"
          style={{ fontFamily: cinzelFont, color: C.white }}
        >
          UTTERLY UNREADABLE
        </span>
      </div>

      <ZipfChart
        frame={frame}
        fps={fps}
        triggerFrame={zipfTrigger}
        opacity={zipfOpacity}
      />

      <TickerBar opacity={1} color={C.gold} />

      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/vo/ep003_L_s4_stats.mp3`)}
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
          fontSize="small"
          startFrame={0}
        />
      </Sequence>

      <Sequence from={VO_START_FRAME} durationInFrames={2280}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/clock_tick.mp3`)}
          volume={(f) => ([0, 15, 30, 45].includes(f) ? 0.25 : 0)}
        />
      </Sequence>

      <Sequence from={terrifyingFrame}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/impact_thud.mp3`)}
          volume={(f) =>
            interpolate(f, [0, 60], [0.5, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>

      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: C.gold, opacity: terrifyingFlash }}
      />
    </AbsoluteFill>
  );
};
