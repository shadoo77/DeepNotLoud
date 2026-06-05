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
import { FailureTimeline } from "./FailureTimeline";
import { AttemptSpotlightCard } from "./AttemptSpotlightCard";
import { NsaBanner } from "./NsaBanner";

const IMAGES = {
  wwii: `${ASSET_PATH}/images/ep003_wwii_codebreakers.jpeg`,
  nsa: `${ASSET_PATH}/images/ep003_nsa_building.jpeg`,
  ai: `${ASSET_PATH}/images/ep003_ai_server_room.jpeg`,
};

export const Scene6Attempts: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const kenBurns = interpolate(frame, [0, 3423], [1.0, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  // ── Timeline trigger frames ──
  const t1919 = getPhraseFrames({
    phrase: "1919",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const t1919Frame = t1919.from > 0 ? t1919.from : 430;
  const tCodebreakers = getPhraseFrames({
    phrase: "codebreakers",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const tCodebreakersFrame = tCodebreakers.from > 0 ? tCodebreakers.from : 1547;
  const tNsa = getPhraseFrames({
    phrase: "NSA",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const tNsaFrame = tNsa.from > 0 ? tNsa.from : 1800;
  const tStylometry = getPhraseFrames({
    phrase: "stylometry",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const tStylometryFrame = tStylometry.from > 0 ? tStylometry.from : 2240;
  const tAi = getPhraseFrames({
    phrase: "2018",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const tAiFrame = tAi.from > 0 ? tAi.from : 2749;
  const tFooled = getPhraseFrames({
    phrase: "fooled",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const tFooledFrame = tFooled.from > 0 ? tFooled.from : 3314;

  // ── Image crossfade (dip-to-black, synced to VO triggers) ──
  // WWII codebreakers image stays up through 1919 Newbold + US Army segments
  const img1Opacity = interpolate(frame, [tNsaFrame - 40, tNsaFrame], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // NSA building covers NSA + stylometry segments
  const img2Opacity = interpolate(
    frame,
    [tNsaFrame, tNsaFrame + 40, tAiFrame - 40, tAiFrame],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  // AI server room covers AI + conclusion
  const img3Opacity = interpolate(frame, [tAiFrame, tAiFrame + 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const timelineEntries = [
    {
      year: "1919",
      institution: "NEWBOLD",
      outcome: "DISPROVEN",
      triggerFrame: t1919Frame,
    },
    {
      year: "1944",
      institution: "US ARMY SIGNAL",
      outcome: "GAVE UP",
      triggerFrame: tCodebreakersFrame,
    },
    {
      year: "2014",
      institution: "NSA",
      outcome: "UNKNOWN",
      triggerFrame: tNsaFrame,
    },
    {
      year: "2013",
      institution: "STYLOMETRY",
      outcome: "INCONCLUSIVE",
      triggerFrame: tStylometryFrame,
    },
    {
      year: "2018",
      institution: "AI (ALBERTA)",
      outcome: "DISPROVEN",
      triggerFrame: tAiFrame,
    },
    {
      year: "2024",
      institution: "STATUS",
      outcome: "UNSOLVED",
      triggerFrame: tFooledFrame + 60,
    },
  ];

  // ── Spotlight cards ──
  const newboldDesc = "Claimed cells under microscope — disproven after death";
  const armyDesc = "Top WWII codebreakers — same ones cracking Nazi codes";
  const nsaDesc = "Declassified internal analysis — conclusion: unknown";
  const stylometryDesc = "Two authors found — collaboration of silence";
  const aiDesc = "AI matched Hebrew — Hebrew scholars said nonsense";

  // ── "gave up" SFX trigger ──
  const gaveUp = getPhraseFrames({
    phrase: "gave up",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const gaveUpFrame = gaveUp.from > 0 ? gaveUp.from : 1749;

  // ── "nonsense" SFX trigger ──
  const nonsense = getPhraseFrames({
    phrase: "nonsense",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });
  const nonsenseFrame = nonsense.from > 0 ? nonsense.from : 3236;

  // ── Gold flash on "fooled" ──
  const fooledFlash = interpolate(
    frame,
    [tFooledFrame, tFooledFrame + 4, tFooledFrame + 12],
    [0, 0.2, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // ── MICRO-REVEALS (coordinated to not overlap badges) ──
  const flare150 = interpolate(frame, [150, 180, 380, 410], [0, 0.5, 0.5, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glyph800 = interpolate(frame, [800, 810, 840, 850], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flare1300 = interpolate(
    frame,
    [1300, 1330, 1530, 1560],
    [0, 0.5, 0.5, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const glyph1900 = interpolate(frame, [1900, 1910, 1940, 1950], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flare2500 = interpolate(
    frame,
    [2500, 2530, 2730, 2760],
    [0, 0.5, 0.5, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const glyph3100 = interpolate(frame, [3100, 3110, 3140, 3150], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line3350 = interpolate(Math.max(0, frame - 3350), [0, 30], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const line3350Opacity = interpolate(
    Math.max(0, frame - 3380),
    [0, 10],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill className="overflow-hidden" style={{ backgroundColor: C.bg }}>
      {/* BG */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transform: `scale(${kenBurns})` }}
      >
        <Img
          src={staticFile(`${ASSET_PATH}/images/ep003_manuscript_spread.jpeg`)}
          className="size-full object-cover"
          style={{ opacity: 0.35 }}
        />
      </div>

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)",
        }}
      />

      <DustParticles count={30} />

      {/* Right panel image zone (dip-to-black between images) */}
      <div
        className="pointer-events-none absolute overflow-hidden rounded-xl"
        style={{
          left: "35%",
          top: 60,
          width: "63%",
          height: "78%",
          border: "1px solid rgba(200,169,110,0.2)",
          backgroundColor: "#000000",
        }}
      >
        <Img
          src={staticFile(IMAGES.wwii)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: img1Opacity,
          }}
        />
        <Img
          src={staticFile(IMAGES.nsa)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: img2Opacity,
          }}
        />
        <Img
          src={staticFile(IMAGES.ai)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: img3Opacity,
          }}
        />
      </div>

      {/* Failure Timeline (left 35%) */}
      <FailureTimeline frame={frame} fps={fps} entries={timelineEntries} />

      {/* Spotlight cards */}
      <AttemptSpotlightCard
        frame={frame}
        fps={fps}
        triggerFrame={t1919Frame}
        nextTriggerFrame={tCodebreakersFrame}
        year="1919"
        institution="WILLIAM NEWBOLD"
        description={newboldDesc}
        result="DISPROVEN"
      />
      <AttemptSpotlightCard
        frame={frame}
        fps={fps}
        triggerFrame={tCodebreakersFrame}
        nextTriggerFrame={tNsaFrame + 30}
        year="1944"
        institution="US ARMY SIGNAL INTEL"
        description={armyDesc}
        result="GAVE UP"
      />
      <AttemptSpotlightCard
        frame={frame}
        fps={fps}
        triggerFrame={tNsaFrame + 30}
        nextTriggerFrame={tStylometryFrame}
        year="2014"
        institution="NSA"
        description={nsaDesc}
        result="UNKNOWN"
      />
      <AttemptSpotlightCard
        frame={frame}
        fps={fps}
        triggerFrame={tStylometryFrame}
        nextTriggerFrame={tAiFrame}
        year="2013"
        institution="STYLOMETRY"
        description={stylometryDesc}
        result="INCONCLUSIVE"
      />
      <AttemptSpotlightCard
        frame={frame}
        fps={fps}
        triggerFrame={tAiFrame}
        nextTriggerFrame={Infinity}
        year="2018"
        institution="U. OF ALBERTA — AI"
        description={aiDesc}
        result="DISPROVEN"
      />

      {/* NSA Banner */}
      <NsaBanner frame={frame} triggerFrame={tNsaFrame} />

      {/* Micro-reveals — corners, never overlap badges (which sit at right:40 and left:50) */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: 0,
          right: 0,
          width: 250,
          height: 250,
          background:
            "radial-gradient(circle at top right, rgba(200,169,110,0.25), transparent 70%)",
          opacity: flare150,
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{ bottom: "20%", right: "12%", opacity: glyph800 }}
      >
        <span
          style={{
            color: C.gold,
            fontSize: 48,
            fontFamily: "serif",
            textShadow: "0 0 8px rgba(200,169,110,0.6)",
            filter: "brightness(1.3)",
          }}
        >
          ⊕
        </span>
      </div>
      <div
        className="pointer-events-none absolute"
        style={{
          bottom: 0,
          left: "35%",
          width: 250,
          height: 250,
          background:
            "radial-gradient(circle at bottom left, rgba(200,169,110,0.25), transparent 70%)",
          opacity: flare1300,
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{ top: "25%", left: "38%", opacity: glyph1900 }}
      >
        <span
          style={{
            color: C.gold,
            fontSize: 56,
            fontFamily: "serif",
            textShadow: "0 0 8px rgba(200,169,110,0.6)",
            filter: "brightness(1.3)",
          }}
        >
          ꝏ
        </span>
      </div>
      <div
        className="pointer-events-none absolute"
        style={{
          top: 0,
          right: 0,
          width: 250,
          height: 250,
          background:
            "radial-gradient(circle at top right, rgba(200,169,110,0.25), transparent 70%)",
          opacity: flare2500,
        }}
      />
      <div
        className="pointer-events-none absolute"
        style={{ bottom: "30%", left: "40%", opacity: glyph3100 }}
      >
        <span
          style={{
            color: C.gold,
            fontSize: 52,
            fontFamily: "serif",
            textShadow: "0 0 8px rgba(200,169,110,0.6)",
            filter: "brightness(1.3)",
          }}
        >
          ⴲ
        </span>
      </div>
      <div
        className="pointer-events-none absolute"
        style={{ top: "55%", left: 0, width: "100%", opacity: line3350Opacity }}
      >
        <svg width="100%" height={2}>
          <line
            x1={0}
            y1={0}
            x2={`${line3350}%`}
            y2={0}
            stroke={C.gold}
            strokeWidth={2}
            strokeOpacity={0.7}
          />
        </svg>
      </div>

      {/* Badges */}
      <SceneBadges
        badges={BADGES}
        transcriptData={TRASCRIPT_DATA}
        voiceOverStartFrame={VO_START_FRAME}
        defaultAutoHideFrames={500}
      />

      <TickerBar opacity={1} color={C.gold} />

      {/* VO + Captions */}
      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/vo/ep003_L_s6_attempts.wav`)}
          volume={1}
        />
        <YouTubeCaptions
          transcript={TRASCRIPT_DATA}
          highlightedWords={[
            "century",
            "cracked",
            "microscope",
            "codebreakers",
            "gave",
            "NSA",
            "unknown",
            "stylometry",
            "authorship",
            "collaboration",
            "AI",
            "Hebrew",
            "nonsense",
            "fooled",
            "machine",
            "defeat",
          ]}
          position="bottom-center"
          fontSize="small"
          startFrame={0}
        />
      </Sequence>

      {/* SFX — gave up */}
      <Sequence from={gaveUpFrame}>
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

      {/* SFX — nonsense */}
      <Sequence from={nonsenseFrame}>
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

      {/* SFX — clock tick recurring */}
      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/clock_tick.wav`)}
          volume={(f) => (f % 210 < 2 ? 0.12 : 0)}
        />
      </Sequence>

      {/* Gold flash on "fooled" */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: C.gold, opacity: fooledFlash }}
      />
    </AbsoluteFill>
  );
};
