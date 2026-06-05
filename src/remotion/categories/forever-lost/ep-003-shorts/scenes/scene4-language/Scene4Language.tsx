import {
  AbsoluteFill,
  Img,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";
import { Audio } from "@remotion/media";
import { loadFont } from "@remotion/google-fonts/Cinzel";
import { loadFont as loadInterFont } from "@remotion/google-fonts/Inter";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";
import { SceneBadges } from "@/components/atoms/SceneBadges";
import { getPhraseFrames } from "@/lib/utils";
import { C, ASSET_PATH } from "../../constants";
import { TRASCRIPT_DATA, VO_START_FRAME, SCENE_DURATION } from "./constants";
import { BADGES } from "./badges";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

const { fontFamily: interFont } = loadInterFont("normal", {
  weights: ["400", "600"],
  subsets: ["latin"],
});

const sceneDuration = SCENE_DURATION;

const ROWS = [
  {
    label: "Latin:",
    text: "Lorem ipsum dolor sit amet...",
    type: "strikethrough" as const,
  },
  {
    label: "Arabic:",
    text: "بسم الله الرحمن الرحيم",
    type: "strikethrough" as const,
  },
  {
    label: "Voynich:",
    text: "⊕ ∂ ꝏ ꝑ ꜀ ɵ ꟟ ꞁ 𐑒 𐑰 𐑥 𐑾",
    type: "glow" as const,
  },
];

const ROW_ENTRY_DURATION = 60;
const STRIKETHROUGH_DURATION = 40;

const CipherFrag: React.FC<{
  x: number;
  y: number;
  delay: number;
  opacity: number;
}> = ({ x, y, delay, opacity }) => {
  const frame = useCurrentFrame();
  const active = Math.max(0, frame - delay);
  const fgOpacity = interpolate(
    active,
    [0, 25, 250, sceneDuration],
    [0, opacity, opacity, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const driftY = interpolate(active % 120, [0, 120], [0, -8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        opacity: fgOpacity,
        transform: `translateY(${driftY}px)`,
        fontFamily: cinzelFont,
        fontSize: 18,
        color: C.gold,
        letterSpacing: 3,
      }}
    >
      {String.fromCharCode(8853 + (delay % 16))}
    </div>
  );
};

export const Scene4Language: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phrasePatterns = getPhraseFrames({
    phrase: "patterns",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const phraseBehaves = getPhraseFrames({
    phrase: "behaves",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const phraseMatches = getPhraseFrames({
    phrase: "matches",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const phraseLatin = getPhraseFrames({
    phrase: "Latin",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const phraseArabic = getPhraseFrames({
    phrase: "Arabic",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const phraseCipher = getPhraseFrames({
    phrase: "cipher",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });

  const row1Trigger = Math.max(0, phrasePatterns.from);
  const row2Trigger = Math.max(0, phraseBehaves.from - 20);
  const row3Trigger = Math.max(0, phraseMatches.from);

  const row1Entry = Math.max(0, frame - row1Trigger);
  const row2Entry = Math.max(0, frame - row2Trigger);
  const row3Entry = Math.max(0, frame - row3Trigger);

  const row1X = interpolate(row1Entry, [0, ROW_ENTRY_DURATION], [-200, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const row2X = interpolate(row2Entry, [0, ROW_ENTRY_DURATION], [-200, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const row3X = interpolate(row3Entry, [0, ROW_ENTRY_DURATION], [-200, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const row1Opacity = interpolate(row1Entry, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const row2Opacity = interpolate(row2Entry, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const row3Opacity = interpolate(row3Entry, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const row1Strikethrough = interpolate(
    Math.max(0, row1Entry - 20),
    [0, STRIKETHROUGH_DURATION],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const row2Strikethrough = interpolate(
    Math.max(0, row2Entry - 20),
    [0, STRIKETHROUGH_DURATION],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const row3GlowSpring = spring({
    frame: Math.max(0, frame - row3Trigger - 40),
    fps,
    config: { damping: 12, stiffness: 100 },
  });
  const row3Glow = interpolate(row3GlowSpring, [0, 0.7, 1], [0, 25, 15], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const row3Pulse = interpolate(frame % 60, [0, 30, 60], [0.7, 1, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bgScale = interpolate(frame, [0, sceneDuration], [1.0, 1.06], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  const vignetteOpacity = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const goldFlareOpacity = interpolate(
    frame,
    [120, 150, 220, 250],
    [0, 0.35, 0.35, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const cipherFragOpacity = interpolate(
    frame,
    [
      phraseMatches.from,
      phraseMatches.from + 15,
      phraseCipher.from + 20,
      phraseCipher.from + 50,
    ],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const latinFlash = interpolate(
    frame,
    [phraseLatin.from, phraseLatin.from + 5],
    [0, 0.18],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const arabicFlash = interpolate(
    frame,
    [phraseArabic.from, phraseArabic.from + 5],
    [0, 0.14],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const redFlashDecay = interpolate(
    frame,
    [phraseCipher.from + 15, phraseCipher.from + 25],
    [0.18, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const redFlash = Math.max(0, latinFlash + arabicFlash - redFlashDecay);

  const closeLabelOpacity = interpolate(
    frame,
    [sceneDuration - 60, sceneDuration - 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill className="overflow-hidden" style={{ backgroundColor: C.bg }}>
      {/* BG — cipher close-up with Ken Burns zoom */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transform: `scale(${bgScale})`, transformOrigin: "center" }}
      >
        <Img
          src={staticFile(
            `${ASSET_PATH}/images/short/ep003_cipher_closeup.jpeg`,
          )}
          className="size-full object-cover"
        />
      </div>

      {/* Dark overlay for text contrast */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
      />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: vignetteOpacity,
          background:
            "radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* ─── TEXT COMPARISON ROWS ─────────────────────── */}

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-6 px-6">
        {/* Row 1 — Latin */}
        <div
          className="rounded-xl px-5 py-4"
          style={{
            opacity: row1Opacity,
            transform: `translateX(${row1X}px)`,
            backgroundColor: "rgba(10,10,10,0.8)",
            borderLeft: `3px solid ${C.red}`,
          }}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <span
              className="text-lg tracking-wider"
              style={{ fontFamily: cinzelFont, color: C.gold }}
            >
              {ROWS[0].label}
            </span>
            <div className="relative flex-1">
              <span
                className="text-base tracking-wide"
                style={{ fontFamily: interFont, color: C.gray }}
              >
                {ROWS[0].text}
              </span>
              <div
                className="absolute top-1/2 left-0 h-0.5"
                style={{
                  width: `${row1Strikethrough * 100}%`,
                  backgroundColor: C.red,
                  transform: "translateY(-50%)",
                  opacity: row1Strikethrough * 0.8,
                }}
              />
            </div>
            <span
              className="text-2xl font-black"
              style={{
                opacity: Math.max(0, row1Strikethrough - 0.2) * 1.25,
                color: C.red,
              }}
            >
              ✗
            </span>
          </div>
        </div>

        {/* Row 2 — Arabic */}
        <div
          className="rounded-xl px-5 py-4"
          style={{
            opacity: row2Opacity,
            transform: `translateX(${row2X}px)`,
            backgroundColor: "rgba(10,10,10,0.8)",
            borderLeft: `3px solid ${C.red}`,
          }}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <span
              className="text-lg tracking-wider"
              style={{ fontFamily: cinzelFont, color: C.gold }}
            >
              {ROWS[1].label}
            </span>
            <div className="relative flex-1">
              <span
                className="text-base tracking-wide"
                style={{ fontFamily: interFont, color: C.gray }}
              >
                {ROWS[1].text}
              </span>
              <div
                className="absolute top-1/2 left-0 h-0.5"
                style={{
                  width: `${row2Strikethrough * 100}%`,
                  backgroundColor: C.red,
                  transform: "translateY(-50%)",
                  opacity: row2Strikethrough * 0.8,
                }}
              />
            </div>
            <span
              className="text-2xl font-black"
              style={{
                opacity: Math.max(0, row2Strikethrough - 0.2) * 1.25,
                color: C.red,
              }}
            >
              ✗
            </span>
          </div>
        </div>

        {/* Row 3 — Voynich */}
        <div
          className="rounded-xl px-5 py-4"
          style={{
            opacity: row3Opacity,
            transform: `translateX(${row3X}px)`,
            backgroundColor: "rgba(10,10,10,0.8)",
            borderLeft: `3px solid ${C.gold}`,
            boxShadow:
              row3Glow > 0.5
                ? `0 0 ${interpolate(row3Glow, [0, 25], [0, 20])}px ${C.gold}`
                : undefined,
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="text-lg tracking-wider"
              style={{ fontFamily: cinzelFont, color: C.gold }}
            >
              {ROWS[2].label}
            </span>
            <span
              className="text-base tracking-widest"
              style={{
                fontFamily: interFont,
                color: C.gold,
                textShadow:
                  row3Glow > 0.5
                    ? `0 0 ${interpolate(row3Pulse, [0.7, 1], [4, 12])}px ${C.gold}`
                    : undefined,
                opacity: row3Pulse,
              }}
            >
              {ROWS[2].text}
            </span>
            <span
              className="text-2xl font-black"
              style={{ color: C.gold, opacity: row3Pulse }}
            >
              ✓
            </span>
          </div>
          <div
            className="mt-1 text-sm tracking-widest"
            style={{ fontFamily: interFont, color: C.gray, opacity: 0.6 }}
          >
            — unknown language —
          </div>
        </div>
      </div>

      {/* ─── GOLD FLARE ──────────────────────────────── */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: 0,
          right: 0,
          width: 250,
          height: 250,
          background: `radial-gradient(circle at top right, ${C.gold}26, transparent 70%)`,
          opacity: goldFlareOpacity,
        }}
      />

      {/* ─── CIPHER TEXT FRAGMENTS (micro-reveals) ── */}
      <div style={{ opacity: cipherFragOpacity }}>
        <CipherFrag x={8} y={12} delay={0} opacity={0.4} />
        <CipherFrag x={75} y={10} delay={30} opacity={0.3} />
        <CipherFrag x={85} y={70} delay={60} opacity={0.35} />
        <CipherFrag x={10} y={78} delay={90} opacity={0.3} />
      </div>

      {/* ─── RED FLASH OVERLAY ─────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: C.red, opacity: redFlash }}
      />

      {/* ─── CLOSE LABEL ────────────────────────────── */}
      <div
        className="pointer-events-none absolute flex w-full justify-center"
        style={{ bottom: 140, opacity: closeLabelOpacity }}
      >
        <div
          className="rounded-full px-6 py-2"
          style={{
            backgroundColor: "rgba(200,169,110,0.15)",
            border: `1px solid ${C.gold}`,
          }}
        >
          <span
            className="text-xl tracking-widest"
            style={{ fontFamily: cinzelFont, color: C.gold }}
          >
            UNKNOWN LANGUAGE
          </span>
        </div>
      </div>

      {/* ─── BADGES ────────────────────────────────── */}
      <SceneBadges
        badges={BADGES}
        transcriptData={TRASCRIPT_DATA}
        voiceOverStartFrame={VO_START_FRAME}
      />

      {/* ─── SFX — deep rumble ─────────────────────── */}
      <Sequence durationInFrames={sceneDuration}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/deep_rumble.wav`)}
          volume={(f) =>
            interpolate(
              f,
              [0, 60, sceneDuration - 30, sceneDuration],
              [0, 0.2, 0.2, 0],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            )
          }
        />
      </Sequence>

      {/* ─── VO + CAPTIONS ─────────────────────────── */}
      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/vo/short/ep003_s4_language.wav`)}
          volume={1}
        />
        <YouTubeCaptions
          transcript={TRASCRIPT_DATA}
          highlightedWords={[
            "patterns",
            "language",
            "real",
            "matches",
            "Latin",
            "Arabic",
            "cipher",
            "invented",
          ]}
          position="youtube-shorts"
          fontSize="small"
          startFrame={0}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
