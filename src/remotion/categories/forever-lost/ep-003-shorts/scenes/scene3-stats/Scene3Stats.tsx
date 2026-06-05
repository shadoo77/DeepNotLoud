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

const STAT_CARDS = [
  {
    number: "240",
    subtitle: "pages of unknown text",
    color: C.white,
  },
  {
    number: "100+",
    subtitle: "unique characters,\nno Rosetta Stone",
    color: C.white,
  },
  {
    number: "600",
    subtitle: "years. Still unsolved.",
    color: C.red,
  },
];

export const Scene3Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ─── VO-SYNCED PHRASE FRAMES ────────────────────────
  const phrase240 = getPhraseFrames({
    phrase: "Two hundred and forty pages",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const phrase100 = getPhraseFrames({
    phrase: "one hundred unique characters",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const phraseWW2 = getPhraseFrames({
    phrase: "World War Two codebreakers",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const phraseNSA = getPhraseFrames({
    phrase: "The NSA",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const phraseAI = getPhraseFrames({
    phrase: "AI tried",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const phraseFailedWord = getPhraseFrames({
    phrase: "failed",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });

  const card1Exit = phrase240.from + phrase240.duration;
  const card2Exit = phrase100.from + phrase100.duration;

  // Card opacity transitions with crossfade
  const card1Opacity = interpolate(
    frame,
    [0, 25, card1Exit - 15, card1Exit],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const card2Opacity = interpolate(
    frame,
    [phrase100.from, phrase100.from + 15, card2Exit - 15, card2Exit],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const card3Opacity = interpolate(
    frame,
    [card2Exit - 15, card2Exit, sceneDuration],
    [0, 1, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const card1Spring = spring({
    frame: Math.max(0, frame - 0),
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const card1Scale = interpolate(card1Spring, [0, 1], [0.6, 1]);

  const card2Spring = spring({
    frame: Math.max(0, frame - phrase100.from),
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const card2X = interpolate(card2Spring, [0, 1], [300, 0]);

  const card3Spring = spring({
    frame: Math.max(0, frame - card2Exit),
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const card3Scale = interpolate(card3Spring, [0, 1], [0.6, 1]);

  // Card 3 slam camera shake — synced to card2 exit
  const card3ShakeDecay = interpolate(
    frame,
    [card2Exit, card2Exit + 12, card2Exit + 23],
    [1, 0.3, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const shakeX = Math.sin(frame * 0.9) * 5 * card3ShakeDecay;
  const shakeY = Math.cos(frame * 1.15) * 4 * card3ShakeDecay;

  // Card 3 glow — 2× pulse loop per spec
  const card3Glow = interpolate(
    Math.max(0, frame - card2Exit),
    [0, 10, 20, 30, 40, 50, 80],
    [0, 1, 0, 1, 0, 0.6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const card3ShadowBlur = interpolate(card3Glow, [0, 1], [0, 25]);

  // Background cinematic motion
  const bgScale = interpolate(frame, [0, sceneDuration], [1.05, 1.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });
  const bgRotate = interpolate(frame, [0, sceneDuration], [0.35, -0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const bgBlur = interpolate(
    frame,
    [0, card2Exit, card2Exit + 37],
    [1.5, 1.5, 5],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Card 3 dynamic subtitle synced to VO phrases
  const card3Subtitle = (() => {
    if (frame < phraseWW2.from) return "years. Still unsolved.";
    if (frame < phraseNSA.from) return "WWII Codebreakers... FAILED";
    if (frame < phraseAI.from) return "The NSA... FAILED";
    if (frame < phraseFailedWord.from) return "Advanced AI... FAILED";
    return "ALL ATTEMPTS FAILED.";
  })();
  const card3SubtitleColor = frame >= phraseWW2.from ? C.red : C.gray;

  // ─── MICRO-REVEALS ──────────────────────────────────

  const flareTopRightOpacity = interpolate(
    frame,
    [60, 90, 160, 190],
    [0, 0.5, 0.5, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const goldFlash170 = interpolate(frame, [170, 174, 182], [0, 0.18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const textFragFade = interpolate(Math.max(0, frame - 240), [0, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const textFragExit = interpolate(Math.max(0, frame - 340), [0, 20], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glyphOpacity = interpolate(frame, [360, 370, 400, 410], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const flareBottomLeftOpacity = interpolate(
    frame,
    [440, 470, 530, sceneDuration],
    [0, 0.4, 0.4, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Red flash synced to "failed."
  const redFlashFinal = interpolate(
    frame,
    [
      phraseFailedWord.from,
      phraseFailedWord.from + 5,
      phraseFailedWord.from + 17,
    ],
    [0, 0.24, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill className="overflow-hidden" style={{ backgroundColor: C.bg }}>
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          transform:
            card3ShakeDecay > 0.001
              ? `translate(${shakeX}px, ${shakeY}px)`
              : undefined,
        }}
      >
        {/* BG — manuscript page at 40% opacity (spec) */}
        <div
          className="absolute inset-[-40px]"
          style={{
            transform: `scale(${bgScale}) rotate(${bgRotate}deg)`,
            filter: `blur(${bgBlur}px)`,
            opacity: 0.4,
          }}
        >
          <Img
            src={staticFile(
              `${ASSET_PATH}/images/short/ep003_manuscript_page.jpeg`,
            )}
            className="size-full object-cover"
          />
        </div>

        {/* Dark overlay for text contrast — lightened so 40% bg breathes */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
        />

        {/* Stat cards — sequential reveal */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className="relative"
            style={{ width: "100%", maxWidth: 500, padding: "0 40px" }}
          >
            {/* Card 1 — 240 */}
            <div
              className="absolute flex flex-col items-center"
              style={{
                inset: 0,
                opacity: card1Opacity,
                transform: `scale(${card1Scale})`,
              }}
            >
              <div
                className="flex w-full flex-col items-center rounded-2xl"
                style={{
                  backgroundColor: C.panel,
                  padding: "32px 40px",
                  textAlign: "center",
                }}
              >
                <div
                  className="text-8xl leading-none font-black tracking-tight"
                  style={{ fontFamily: cinzelFont, color: STAT_CARDS[0].color }}
                >
                  {STAT_CARDS[0].number}
                </div>
                <div
                  className="mt-4 text-2xl tracking-wide"
                  style={{ fontFamily: interFont, color: C.gray }}
                >
                  {STAT_CARDS[0].subtitle}
                </div>
              </div>
            </div>

            {/* Card 2 — 100+ */}
            <div
              className="absolute flex flex-col items-center"
              style={{
                inset: 0,
                opacity: card2Opacity,
                transform: `translateX(${card2X}px)`,
              }}
            >
              <div
                className="flex w-full flex-col items-center rounded-2xl"
                style={{
                  backgroundColor: C.panel,
                  padding: "32px 40px",
                  textAlign: "center",
                }}
              >
                <div
                  className="text-8xl leading-none font-black tracking-tight"
                  style={{ fontFamily: cinzelFont, color: STAT_CARDS[1].color }}
                >
                  {STAT_CARDS[1].number}
                </div>
                <div
                  className="mt-4 text-2xl tracking-wide whitespace-pre-line"
                  style={{ fontFamily: interFont, color: C.gray }}
                >
                  {STAT_CARDS[1].subtitle}
                </div>
              </div>
            </div>

            {/* Card 3 — 600 */}
            <div
              className="absolute flex flex-col items-center"
              style={{
                inset: 0,
                opacity: card3Opacity,
                transform: `scale(${card3Scale})`,
              }}
            >
              <div
                className="flex w-full flex-col items-center rounded-2xl"
                style={{
                  backgroundColor: C.panel,
                  padding: "32px 40px",
                  textAlign: "center",
                  boxShadow:
                    card3Glow > 0.01
                      ? `0 0 ${interpolate(card3Glow, [0, 1], [0, 30])}px ${C.red}`
                      : undefined,
                }}
              >
                <div
                  className="text-8xl leading-none font-black tracking-tight"
                  style={{
                    fontFamily: cinzelFont,
                    color: STAT_CARDS[2].color,
                    textShadow:
                      card3Glow > 0.01
                        ? `0 0 ${card3ShadowBlur}px ${C.red}`
                        : undefined,
                  }}
                >
                  {STAT_CARDS[2].number}
                </div>
                <div
                  className="mt-4 text-2xl tracking-wide"
                  style={{
                    fontFamily: interFont,
                    color: card3SubtitleColor,
                  }}
                >
                  {card3Subtitle}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── MICRO-REVEALS ─────────────────────────────── */}

        <div
          className="pointer-events-none absolute"
          style={{
            top: 0,
            right: 0,
            width: 300,
            height: 300,
            background: `radial-gradient(circle at top right, ${C.gold}26, transparent 70%)`,
            opacity: flareTopRightOpacity,
          }}
        />

        <div
          className="pointer-events-none absolute"
          style={{
            bottom: 0,
            left: 0,
            width: 300,
            height: 300,
            background: `radial-gradient(circle at bottom left, ${C.gold}26, transparent 70%)`,
            opacity: flareBottomLeftOpacity,
          }}
        />

        <div
          className="pointer-events-none absolute flex items-center justify-center"
          style={{
            top: "15%",
            left: 0,
            width: "100%",
            opacity: glyphOpacity,
          }}
        >
          <span
            style={{
              color: C.gold,
              fontSize: 48,
              fontFamily: cinzelFont,
            }}
          >
            ◆
          </span>
        </div>

        <div
          className="pointer-events-none absolute"
          style={{
            top: "18%",
            left: "8%",
            opacity: textFragFade * textFragExit,
          }}
        >
          <span
            style={{
              fontFamily: cinzelFont,
              color: C.gold,
              fontSize: 22,
              letterSpacing: 4,
            }}
          >
            UNKNOWN TEXT
          </span>
        </div>

        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundColor: C.gold, opacity: goldFlash170 }}
        />

        <div
          className="pointer-events-none absolute inset-0"
          style={{ backgroundColor: C.red, opacity: redFlashFinal }}
        />

        <SceneBadges
          badges={BADGES}
          transcriptData={TRASCRIPT_DATA}
          voiceOverStartFrame={VO_START_FRAME}
        />
      </div>

      {/* ─── SFX ──────────────────────────────────────── */}

      <Sequence durationInFrames={35}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/whoosh_in.wav`)}
          volume={(f) =>
            interpolate(f, [0, 2, 30, 35], [0, 0.35, 0.35, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>

      <Sequence from={card1Exit} durationInFrames={35}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/whoosh_in.wav`)}
          volume={(f) =>
            interpolate(f, [0, 2, 30, 35], [0, 0.3, 0.3, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>

      <Sequence from={card2Exit} durationInFrames={40}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/impact_thud.wav`)}
          volume={(f) =>
            interpolate(f, [0, 2, 35, 40], [0, 0.6, 0.6, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>

      <Audio
        src={staticFile(`${ASSET_PATH}/audio/sfx/clock_tick.wav`)}
        volume={(f) =>
          interpolate(
            f,
            [0, 15, sceneDuration - 30, sceneDuration],
            [0, 0.25, 0.25, 0],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          )
        }
        loop
      />

      {/* VO + Captions */}
      <Sequence>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/vo/short/ep003_s3_stats.wav`)}
          volume={1}
        />
        <YouTubeCaptions
          transcript={TRASCRIPT_DATA}
          highlightedWords={[
            "pages",
            "characters",
            "codebreakers",
            "NSA",
            "AI",
            "failed",
          ]}
          position="youtube-shorts"
          fontSize="small"
          startFrame={0}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
