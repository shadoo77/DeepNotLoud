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
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";
import {
  C,
  ASSET_PATH,
} from "@/remotion/categories/forever-lost/ep-003/constants";

import { TRASCRIPT_DATA, VO_START_FRAME, SCENE_DURATION } from "./constants";
import { SceneBadges } from "@/components/atoms/SceneBadges";
import { TextReveal } from "./TextReveal";
import { EndCard } from "./EndCard";
import { BADGES } from "./badges";

const IMAGES = {
  scribe: `${ASSET_PATH}/images/ep003_scribe_hand.jpeg`,
  library: `${ASSET_PATH}/images/ep003_empty_library.jpeg`,
  case: `${ASSET_PATH}/images/ep003_manuscript_in_case.jpeg`,
  spread: `${ASSET_PATH}/images/ep003_manuscript_spread.jpeg`,
};

const sceneEndFrame = SCENE_DURATION;

const FADE_START = 2199;
const FADE_END = 2319;

const SilenceDroneAudio: React.FC = () => (
  <Audio
    src={staticFile(`${ASSET_PATH}/audio/sfx/silence_drone.wav`)}
    volume={(f) =>
      interpolate(f, [0, 60, FADE_START, FADE_END], [0, 0.2, 0.2, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    }
    loop
  />
);

export const Scene8Closer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slowest Ken Burns in the episode
  const kenBurns = interpolate(frame, [0, sceneEndFrame], [1.0, 1.03], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  // Slow image breath (always on)
  const breath = interpolate(Math.sin(frame * 0.025), [-1, 1], [0.92, 1]);

  // ── Phrase triggers ──
  const tKnow = getPhraseFrames({
    phrase: "Here is what we know",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const tKnowFrame = tKnow.from > 0 ? tKnow.from : 100;

  const tPages = getPhraseFrames({
    phrase: "wrote for pages",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const tPagesFrame = tPages.from > 0 ? tPages.from : 550;

  const tTrying = getPhraseFrames({
    phrase: "trying to say",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const tTryingFrame = tTrying.from > 0 ? tTrying.from : 1550;

  const tNever = getPhraseFrames({
    phrase: "may never know",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const tNeverFrame = tNever.from > 0 ? tNever.from : 2200;

  const tForever = getPhraseFrames({
    phrase: "Forever lost",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const tForeverFrame = tForever.from > 0 ? tForever.from : 2400;

  const tCastle = getPhraseFrames({
    phrase: "sat in a castle",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const tCastleFrame = tCastle.from > 0 ? tCastle.from : 1200;

  const tBillions = getPhraseFrames({
    phrase: "Billions",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const tBillionsFrame = tBillions.from > 0 ? tBillions.from : 1800;

  // ── Text reveal lines ──
  const revealLines = [
    { text: "Someone wrote this.", triggerFrame: tKnowFrame, color: C.white },
    {
      text: "They had something to say.",
      triggerFrame: tPagesFrame,
      color: C.white,
    },
    {
      text: "We still don't know what.",
      triggerFrame: tTryingFrame,
      color: C.gold,
    },
    { text: "We may never know.", triggerFrame: tNeverFrame, color: C.white },
  ];

  // ── Image crossfades (dip-to-black) ──
  // scribe → library when "sat in a castle" is spoken
  const img1Opacity = interpolate(
    frame,
    [tCastleFrame - 40, tCastleFrame],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  // library → case when "Billions" is spoken
  const img2Opacity = interpolate(
    frame,
    [tCastleFrame, tCastleFrame + 40, tBillionsFrame - 40, tBillionsFrame],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  // case → spread when "may never know" is spoken
  const img3Opacity = interpolate(
    frame,
    [tBillionsFrame, tBillionsFrame + 40, tNeverFrame - 40, tNeverFrame],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const img4Opacity = interpolate(
    frame,
    [tNeverFrame, tNeverFrame + 40, sceneEndFrame - 60, sceneEndFrame],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // ── Micro-reveals ──
  // Corner flare after line 1
  const flare1Opacity = interpolate(
    frame,
    [tKnowFrame + 100, tKnowFrame + 130, tKnowFrame + 330, tKnowFrame + 360],
    [0, 0.35, 0.35, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  // Text fragment "reason" after line 2
  const reasonFade = interpolate(
    Math.max(0, frame - (tPagesFrame + 120)),
    [0, 30, 160, 190],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  // Corner flare after line 3
  const flare2Opacity = interpolate(
    frame,
    [
      tTryingFrame + 80,
      tTryingFrame + 110,
      tTryingFrame + 310,
      tTryingFrame + 340,
    ],
    [0, 0.35, 0.35, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // ── Dead-zone micro-reveals ──
  // Line draw between "reason" text exit and scribe→library crossfade
  const lineDraw1Progress = interpolate(
    Math.max(0, frame - 960),
    [0, 40],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const lineDraw1Opacity = interpolate(
    Math.max(0, frame - 1000),
    [0, 10, 130, 140],
    [1, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Corner flare bottom-right between library settling and L3
  const flare3Opacity = interpolate(
    frame,
    [1340, 1370, 1510, 1540],
    [0, 0.35, 0.35, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Text fragment "ink" between flare2 exit and case→spread crossfade
  const inkFade = interpolate(
    Math.max(0, frame - 1980),
    [0, 30, 140, 170],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill className="overflow-hidden" style={{ backgroundColor: C.bg }}>
      {/* BG — all 4 images stacked with dip-to-black */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transform: `scale(${kenBurns})` }}
      >
        <Img
          src={staticFile(IMAGES.scribe)}
          className="size-full object-cover"
          style={{ opacity: img1Opacity * breath }}
        />
        <Img
          src={staticFile(IMAGES.library)}
          className="absolute inset-0 size-full object-cover"
          style={{ opacity: img2Opacity * breath }}
        />
        <Img
          src={staticFile(IMAGES.case)}
          className="absolute inset-0 size-full object-cover"
          style={{ opacity: img3Opacity * breath }}
        />
        <Img
          src={staticFile(IMAGES.spread)}
          className="absolute inset-0 size-full object-cover"
          style={{ opacity: img4Opacity * breath }}
        />
      </div>

      {/* Heavy vignette — 80% */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 25%, rgba(0,0,0,0.80) 100%)",
        }}
      />

      {/* ── Dead-zone micro-reveals ── */}
      {/* Line draw between "reason" exit and scribe→library crossfade */}
      <div
        className="pointer-events-none absolute"
        style={{ top: "65%", left: 0, width: "100%" }}
      >
        <svg width="100%" height={2}>
          <line
            x1={0}
            y1={0}
            x2={`${lineDraw1Progress}%`}
            y2={0}
            stroke={C.gold}
            strokeWidth={1}
            strokeOpacity={0.25 * lineDraw1Opacity}
          />
        </svg>
      </div>

      {/* Corner flare bottom-right between library settling and L3 */}
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: 0,
          right: 0,
          width: 280,
          height: 280,
          background:
            "radial-gradient(circle at bottom right, rgba(200,169,110,0.18), transparent 70%)",
          opacity: flare3Opacity,
        }}
      />

      {/* Text fragment "ink" between flare2 exit and case→spread crossfade */}
      <div
        className="pointer-events-none absolute"
        style={{ bottom: "30%", right: "10%", opacity: inkFade }}
      >
        <span
          className="text-2xl font-semibold tracking-wider italic"
          style={{ color: C.gold, fontFamily: "Cinzel, serif" }}
        >
          ink
        </span>
      </div>

      {/* Text reveals */}
      <TextReveal frame={frame} lines={revealLines} />

      {/* End Card */}
      <EndCard
        frame={frame}
        fps={fps}
        triggerFrame={tForeverFrame}
        sceneEndFrame={sceneEndFrame}
      />

      {/* Micro-reveals */}
      {/* Corner flare top-right after line 1 */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: 0,
          right: 0,
          width: 250,
          height: 250,
          background:
            "radial-gradient(circle at top right, rgba(200,169,110,0.18), transparent 70%)",
          opacity: flare1Opacity,
        }}
      />
      {/* Text fragment "reason" */}
      <div
        className="pointer-events-none absolute"
        style={{ bottom: "25%", left: "10%", opacity: reasonFade }}
      >
        <span
          className="text-2xl font-semibold tracking-wider italic"
          style={{ color: C.gold, fontFamily: "Cinzel, serif" }}
        >
          reason
        </span>
      </div>
      {/* Corner flare top-left after line 3 */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: 0,
          left: 0,
          width: 250,
          height: 250,
          background:
            "radial-gradient(circle at top left, rgba(200,169,110,0.18), transparent 70%)",
          opacity: flare2Opacity,
        }}
      />

      {/* Badges */}
      <SceneBadges
        badges={BADGES}
        transcriptData={TRASCRIPT_DATA}
        voiceOverStartFrame={VO_START_FRAME}
      />

      {/* VO + Captions */}
      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/vo/ep003_L_s8_closer.wav`)}
          volume={1}
        />
        <YouTubeCaptions
          transcript={TRASCRIPT_DATA}
          highlightedWords={[
            "certain",
            "ink",
            "vellum",
            "pages",
            "reason",
            "castle",
            "Billions",
            "thinking",
            "character",
            "trying",
            "silence",
          ]}
          position="bottom-center"
          fontSize="small"
          startFrame={0}
        />
      </Sequence>

      {/* SFX — silence drone sustained */}
      <Sequence from={VO_START_FRAME}>
        <SilenceDroneAudio />
      </Sequence>

      {/* SFX — paper rustle single soft */}
      <Sequence from={VO_START_FRAME + 60}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/paper_rustle.wav`)}
          volume={(f) =>
            interpolate(f, [0, 90], [0.15, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>
    </AbsoluteFill>
  );
};
