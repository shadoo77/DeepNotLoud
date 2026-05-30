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
import { TRASCRIPT_DATA, VO_START_FRAME } from "./constants";
import { BADGES } from "./badges";
import { LanguageComparisonTable } from "./LanguageComparisonTable";
import { EntropyViz } from "./EntropyViz";
import { ReduplicationBanner } from "./ReduplicationBanner";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

export const Scene5Language: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const kenBurns1 = interpolate(frame, [0, 3330], [1.0, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  const bgCrossfade = interpolate(frame, [1400, 1460], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Comparison table trigger ──
  const tableResult = getPhraseFrames({
    phrase: "left to right",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const tableTrigger = tableResult.from > 0 ? tableResult.from : 410;

  // ── Entropy viz trigger ──
  const entropyResult = getPhraseFrames({
    phrase: "entropy",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const entropyTrigger = entropyResult.from > 0 ? entropyResult.from : 806;

  // ── Reduplication trigger ──
  const redupResult = getPhraseFrames({
    phrase: "reduplication",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const redupTrigger = redupResult.from > 0 ? redupResult.from : 2686;

  // ── "impossible" flash + SFX ──
  const impossibleResult = getPhraseFrames({
    phrase: "impossible",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const impossibleFrame =
    impossibleResult.from > 0 ? impossibleResult.from : 1494;

  const impossibleFlash = interpolate(
    frame,
    [impossibleFrame, impossibleFrame + 4, impossibleFrame + 12],
    [0, 0.18, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // ── "corrections" table highlight ──
  const correctionsResult = getPhraseFrames({
    phrase: "corrections",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const correctionsTrigger =
    correctionsResult.from > 0 ? correctionsResult.from : 1597;

  // ── MICRO-REVEALS ──

  // Flare 150 — top-right
  const flare150 = interpolate(frame, [150, 180, 380, 410], [0, 0.6, 0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glyph 300 — right side
  const glyph300 = interpolate(frame, [300, 310, 340, 350], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Line draw 600 — bottom
  const line600 = interpolate(Math.max(0, frame - 600), [0, 40], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line600Opacity = interpolate(
    Math.max(0, frame - 640),
    [0, 10],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Flare 700 — bottom-left
  const flare700 = interpolate(frame, [700, 730, 930, 960], [0, 0.6, 0.6, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Glyph 1000 — left side
  const glyph1000 = interpolate(frame, [1000, 1010, 1040, 1050], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text fragment 1200 — "SYSTEMATIC" at center
  const systematicFade = interpolate(
    frame,
    [1200, 1230, 1260, 1280],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Flare 1800 — top-right
  const flare1800 = interpolate(
    frame,
    [1800, 1830, 2030, 2060],
    [0, 0.6, 0.6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Glyph 2100 — bottom-right
  const glyph2100 = interpolate(frame, [2100, 2110, 2140, 2150], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text fragment 2300 — "ORIGINAL SOURCE?"
  const sourceFade = interpolate(
    frame,
    [2300, 2330, 2360, 2380],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Flare 2500 — bottom-left
  const flare2500 = interpolate(
    frame,
    [2500, 2530, 2730, 2760],
    [0, 0.6, 0.6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Line draw 2800 — middle
  const line2800 = interpolate(Math.max(0, frame - 2800), [0, 40], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line2800Opacity = interpolate(
    Math.max(0, frame - 2840),
    [0, 10],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Glyph 3000 — top-left
  const glyph3000 = interpolate(frame, [3000, 3010, 3040, 3050], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Text fragment "FOREVER LOST" 3200
  const foreverLostFade = interpolate(
    frame,
    [3200, 3230, 3260, 3290],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill className="overflow-hidden" style={{ backgroundColor: C.bg }}>
      {/* Primary BG — cipher closeup */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transform: `scale(${kenBurns1})` }}
      >
        <Img
          src={staticFile(`${ASSET_PATH}/images/ep003_cipher_closeup.jpeg`)}
          className="size-full object-cover"
          style={{ opacity: interpolate(bgCrossfade, [0, 1], [1, 0]) }}
        />
      </div>

      {/* Secondary BG — manuscript spread (crossfades in at entropy section) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          transform: `scale(${kenBurns1})`,
          opacity: bgCrossfade,
        }}
      >
        <Img
          src={staticFile(`${ASSET_PATH}/images/ep003_manuscript_spread.jpeg`)}
          className="size-full object-cover"
        />
      </div>

      {/* Dark vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      <DustParticles count={120} />

      {/* ── Major graphics ── */}
      <LanguageComparisonTable
        frame={frame}
        fps={fps}
        triggerFrame={tableTrigger}
        highlightCorrections={correctionsTrigger}
      />
      <EntropyViz frame={frame} triggerFrame={entropyTrigger} />
      <ReduplicationBanner
        frame={frame}
        fps={fps}
        triggerFrame={redupTrigger}
      />

      {/* ── Micro-reveals ── */}

      {/* Flare 150 */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: 0,
          right: 0,
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle at top right, rgba(200,169,110,0.28), transparent 70%)",
          opacity: flare150,
        }}
      />

      {/* Glyph 300 */}
      <div
        className="pointer-events-none absolute"
        style={{ top: "25%", right: "12%", opacity: glyph300 }}
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
          Ɒ
        </span>
      </div>

      {/* Line draw 600 */}
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: "18%",
          left: 0,
          width: "100%",
          opacity: line600Opacity,
        }}
      >
        <svg width="100%" height={2}>
          <line
            x1={0}
            y1={0}
            x2={`${line600}%`}
            y2={0}
            stroke={C.gold}
            strokeWidth={2}
            strokeOpacity={0.7}
          />
        </svg>
      </div>

      {/* Flare 700 */}
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: 0,
          left: 0,
          width: 250,
          height: 250,
          background:
            "radial-gradient(circle at bottom left, rgba(200,169,110,0.28), transparent 70%)",
          opacity: flare700,
        }}
      />

      {/* Glyph 1000 */}
      <div
        className="pointer-events-none absolute"
        style={{ top: "40%", left: "8%", opacity: glyph1000 }}
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

      {/* Text fragment "SYSTEMATIC" 1200 */}
      <div
        className="pointer-events-none absolute flex items-center gap-3"
        style={{
          top: "22%",
          left: "50%",
          opacity: systematicFade,
          transform: "translateX(-50%)",
        }}
      >
        <div style={{ width: 16, height: 2, backgroundColor: C.gold }} />
        <span
          className="text-3xl font-semibold tracking-wider"
          style={{ fontFamily: cinzelFont, color: C.white }}
        >
          SYSTEMATIC
        </span>
      </div>

      {/* Flare 1800 */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: 0,
          right: 0,
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle at top right, rgba(200,169,110,0.28), transparent 70%)",
          opacity: flare1800,
        }}
      />

      {/* Glyph 2100 */}
      <div
        className="pointer-events-none absolute"
        style={{ bottom: "25%", right: "10%", opacity: glyph2100 }}
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
          ⊕
        </span>
      </div>

      {/* Text fragment "ORIGINAL SOURCE?" 2300 */}
      <div
        className="pointer-events-none absolute flex items-center gap-3"
        style={{
          top: "28%",
          left: "8%",
          opacity: sourceFade,
        }}
      >
        <div style={{ width: 16, height: 2, backgroundColor: C.gold }} />
        <span
          className="text-2xl font-semibold tracking-wider"
          style={{ fontFamily: cinzelFont, color: C.white }}
        >
          ORIGINAL SOURCE?
        </span>
      </div>

      {/* Flare 2500 */}
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: 0,
          left: 0,
          width: 250,
          height: 250,
          background:
            "radial-gradient(circle at bottom left, rgba(200,169,110,0.28), transparent 70%)",
          opacity: flare2500,
        }}
      />

      {/* Line draw 2800 */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "42%",
          left: 0,
          width: "100%",
          opacity: line2800Opacity,
        }}
      >
        <svg width="100%" height={2}>
          <line
            x1={0}
            y1={0}
            x2={`${line2800}%`}
            y2={0}
            stroke={C.gold}
            strokeWidth={2}
            strokeOpacity={0.7}
          />
        </svg>
      </div>

      {/* Glyph 3000 */}
      <div
        className="pointer-events-none absolute"
        style={{ top: "18%", left: "15%", opacity: glyph3000 }}
      >
        <span
          style={{
            color: C.gold,
            fontSize: 52,
            fontFamily: "serif",
            textShadow:
              "0 0 8px rgba(200,169,110,0.6), 0 0 24px rgba(200,169,110,0.3)",
            filter: "brightness(1.3)",
          }}
        >
          ⴲ
        </span>
      </div>

      {/* Text fragment "FOREVER LOST" 3200 */}
      <div
        className="pointer-events-none absolute flex items-center gap-3"
        style={{
          top: "32%",
          right: "8%",
          opacity: foreverLostFade,
        }}
      >
        <span
          className="text-3xl font-semibold tracking-wider"
          style={{ fontFamily: cinzelFont, color: C.white }}
        >
          FOREVER LOST
        </span>
        <div style={{ width: 16, height: 2, backgroundColor: C.gold }} />
      </div>

      {/* Badges */}
      <SceneBadges
        badges={BADGES}
        transcriptData={TRASCRIPT_DATA}
        voiceOverStartFrame={VO_START_FRAME}
        defaultAutoHideFrames={400}
      />

      <TickerBar opacity={1} color={C.gold} />

      {/* VO + Captions */}
      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/vo/ep003_L_s5_language.wav`)}
          volume={1}
        />
        <YouTubeCaptions
          transcript={TRASCRIPT_DATA}
          highlightedWords={[
            "impossible",
            "left",
            "right",
            "entropy",
            "structure",
            "gibberish",
            "precision",
            "corrections",
            "original",
            "category",
            "reduplication",
            "linguistic",
            "somewhere",
            "deliberate",
            "systematic",
            "never",
            "frequency",
            "transcribing",
          ]}
          position="top-center"
          fontSize="small"
          startFrame={0}
          showOverlay
        />
      </Sequence>

      {/* SFX — impossible */}
      <Sequence from={impossibleFrame}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/deep_rumble.wav`)}
          volume={(f) =>
            interpolate(f, [0, 90], [0.3, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>

      {/* Gold flash on "impossible" */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: C.gold, opacity: impossibleFlash }}
      />
    </AbsoluteFill>
  );
};
