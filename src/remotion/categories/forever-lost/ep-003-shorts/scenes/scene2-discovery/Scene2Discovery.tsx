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
import { RollingDigit } from "@/components/atoms/RollingDigit";
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

export const Scene2Discovery: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const phraseVoynich = getPhraseFrames({
    phrase: "Voynich",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });

  const phraseCastle = getPhraseFrames({
    phrase: "castle",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });

  const phrase1400s = getPhraseFrames({
    phrase: "early",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });

  const phraseNobodyKnew = getPhraseFrames({
    phrase: "Nobody knew",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });

  const phraseNobodyKnows = getPhraseFrames({
    phrase: "Nobody knows",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });

  // Castle BG slow parallax — slides up slightly over the whole scene
  const bgY = interpolate(frame, [0, sceneDuration], [0, -8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });
  const bgScale = interpolate(frame, [0, sceneDuration], [1.0, 1.05], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  // "1912" year top-left
  const yr1912Opacity = interpolate(frame, [30, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const yrLineWidth = interpolate(Math.max(0, frame - 50), [0, 30], [0, 60], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Voynich portrait slide-in from right (spring)
  const portraitSpring = spring({
    frame: Math.max(0, frame - phraseVoynich.from),
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const portraitX = interpolate(portraitSpring, [0, 1], [400, 80]);
  const portraitOpacity = interpolate(
    Math.max(0, frame - phraseVoynich.from),
    [0, 25],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Portrait name plate
  const nameOpacity = interpolate(
    Math.max(0, frame - (phraseVoynich.from + 30)),
    [0, 25],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const nameUnderlineSpring = spring({
    frame: Math.max(0, frame - (phraseVoynich.from + 50)),
    fps,
    config: { damping: 18, stiffness: 120 },
  });
  const nameUnderlineWidth = interpolate(nameUnderlineSpring, [0, 1], [0, 200]);
  const nameUnderlineOpacity = interpolate(
    Math.max(0, frame - (phraseVoynich.from + 50)),
    [0, 20, 295, 355],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Location badge bottom-left
  const locBadgeSpring = spring({
    frame: Math.max(0, frame - phraseCastle.from),
    fps,
    config: { damping: 12, stiffness: 150 },
  });
  const locBadgeScale = interpolate(locBadgeSpring, [0, 1], [0.5, 1]);
  const locBadgeOpacity = interpolate(
    Math.max(0, frame - phraseCastle.from),
    [0, 15],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  // Year range "1412–1438" roll-up (synced to "early 1400s")
  const yrRangeOpacity = interpolate(
    frame,
    [phrase1400s.from, phrase1400s.from + 30],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const yrPulseOneShot = interpolate(
    Math.max(0, frame - phrase1400s.from),
    [0, 15, 40],
    [0, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // "NOBODY KNEW" text section
  const nobodyKnewOpacity = interpolate(
    frame,
    [phraseNobodyKnew.from, phraseNobodyKnew.from + 5],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const nobodyKnowsOpacity = interpolate(
    frame,
    [phraseNobodyKnows.from, phraseNobodyKnows.from + 1],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Portrait exit fade
  const portraitExit = interpolate(Math.max(0, frame - 480), [0, 60], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // NOBODY KNOWS slam animation
  const nobodyKnowsSlam = spring({
    frame: Math.max(0, frame - phraseNobodyKnows.from),
    fps,
    config: { damping: 12, stiffness: 220 },
  });
  const nobodyKnowsScale = interpolate(nobodyKnowsSlam, [0, 1], [0.9, 1]);
  const nobodyKnowsY = interpolate(nobodyKnowsSlam, [0, 1], [40, 0]);
  const nobodyKnowsShadowBlur = interpolate(
    Math.max(0, frame - phraseNobodyKnows.from),
    [0, 6, 12],
    [0, 30, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Subtle name plate hover (continuous, non-pulsing)
  const nameHover = interpolate(frame % 90, [0, 45, 90], [0, -2, 0]);

  // 1912 slides toward center when counter appears
  const yr1912SlideX = interpolate(
    Math.max(0, frame - phrase1400s.from),
    [0, 40],
    [0, 120],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill className="overflow-hidden" style={{ backgroundColor: C.bg }}>
      {/* Castle BG with parallax */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{
          transform: `scale(${bgScale}) translateY(${bgY}px)`,
          transformOrigin: "center",
        }}
      >
        <Img
          src={staticFile(
            `${ASSET_PATH}/images/short/ep003_castle_exterior.jpeg`,
          )}
          className="size-full object-cover"
        />
      </div>

      {/* Uniform dark overlay for text contrast */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
      />

      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)",
        }}
      />

      {/* ── 1912 year top-left ── */}
      <div
        className="pointer-events-none absolute flex items-center gap-3"
        style={{
          top: "8%",
          left: "6%",
          opacity: yr1912Opacity,
          transform: `translateX(${yr1912SlideX}px)`,
        }}
      >
        <span
          className="text-5xl font-black tracking-wider"
          style={{ fontFamily: cinzelFont, color: C.gold }}
        >
          1912
        </span>
      </div>
      <div
        className="pointer-events-none absolute"
        style={{
          top: "12%",
          left: "6%",
          height: 2,
          width: yrLineWidth,
          backgroundColor: C.gold,
          opacity: yr1912Opacity * 0.6,
          borderRadius: 1,
        }}
      />

      {/* ── Voynich portrait right-side ── */}
      <div
        className="pointer-events-none absolute"
        style={{
          right: portraitX,
          top: "6%",
          width: "50%",
          height: "38%",
          opacity: portraitOpacity * portraitExit,
        }}
      >
        {/* Image — full aspect preserved, no cropping */}
        <div
          className="flex items-center justify-center overflow-hidden"
          style={{
            width: "100%",
            height: "100%",
            border: "2px solid rgba(200,169,110,0.4)",
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          }}
        >
          <Img
            src={staticFile(
              `${ASSET_PATH}/images/short/ep003_wilfrid_voynich.png`,
            )}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Name plate — absolutely below the image */}
        <div
          className="absolute"
          style={{
            bottom: -150,
            left: 0,
            right: 0,
            opacity: nameOpacity * portraitExit,
            transform: `translateY(${nameHover}px)`,
          }}
        >
          <div className="text-center">
            <div
              className="text-4xl font-bold tracking-wider"
              style={{ fontFamily: cinzelFont, color: C.white }}
            >
              WILFRID VOYNICH
            </div>
            <div
              className="mt-1 text-2xl font-semibold tracking-wide"
              style={{ fontFamily: interFont, color: C.gray }}
            >
              1865–1930
            </div>
            <div
              className="mx-auto mt-2"
              style={{
                width: nameUnderlineWidth,
                height: 2,
                backgroundColor: C.gold,
                opacity: nameUnderlineOpacity,
                borderRadius: 1,
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Location badge bottom ── */}
      <div
        className="pointer-events-none absolute"
        style={{
          left: 30,
          bottom: 160,
          opacity: locBadgeOpacity,
          transform: `scale(${locBadgeScale})`,
        }}
      >
        <div
          className="rounded-xl px-4 py-3"
          style={{
            backgroundColor: "rgba(10,10,10,0.88)",
            border: "1px solid rgba(200,169,110,0.5)",
          }}
        >
          <div
            className="text-xl font-black tracking-wider"
            style={{ fontFamily: cinzelFont, color: C.gold }}
          >
            VILLA MONDRAGONE
          </div>
          <div
            className="mt-1 text-lg tracking-wide"
            style={{ fontFamily: interFont, color: C.gray }}
          >
            Frascati, Italy
          </div>
        </div>
      </div>

      {/* ── Year range "1412–1438" digit roll-up ── */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: "65%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: yrRangeOpacity,
        }}
      >
        <span
          className="text-4xl font-bold tracking-wider"
          style={{
            fontFamily: cinzelFont,
            color: C.gold,
            textShadow: `0 0 ${interpolate(yrPulseOneShot, [0, 1], [0, 25])}px ${C.gold}`,
          }}
        >
          <RollingDigit target="1" triggerFrame={phrase1400s.from} delay={0} />
          <RollingDigit target="4" triggerFrame={phrase1400s.from} delay={4} />
          <RollingDigit target="1" triggerFrame={phrase1400s.from} delay={8} />
          <RollingDigit target="2" triggerFrame={phrase1400s.from} delay={12} />
          <span style={{ margin: "0 8px" }}>–</span>
          <RollingDigit target="1" triggerFrame={phrase1400s.from} delay={16} />
          <RollingDigit target="4" triggerFrame={phrase1400s.from} delay={20} />
          <RollingDigit target="3" triggerFrame={phrase1400s.from} delay={24} />
          <RollingDigit target="8" triggerFrame={phrase1400s.from} delay={28} />
        </span>
      </div>

      {/* ── "NOBODY KNEW" / "NOBODY KNOWS" ── */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ opacity: nobodyKnewOpacity }}
      >
        <div className="px-10 pt-60 pb-0 text-center">
          <div
            className="text-4xl font-black tracking-wider"
            style={{ fontFamily: cinzelFont, color: C.white }}
          >
            NOBODY KNEW
          </div>
          <div
            className="mt-6 text-4xl font-black tracking-wider"
            style={{
              fontFamily: cinzelFont,
              color: C.white,
              opacity: nobodyKnowsOpacity,
              transform: `translateY(${nobodyKnowsY}px) scale(${nobodyKnowsScale})`,
              textShadow: `0 0 ${nobodyKnowsShadowBlur}px ${C.red}`,
            }}
          >
            NOBODY KNOWS
          </div>
        </div>
      </div>

      {/* Badges */}
      <SceneBadges
        badges={BADGES}
        transcriptData={TRASCRIPT_DATA}
        voiceOverStartFrame={VO_START_FRAME}
      />

      {/* SFX — quill scratch at scene open */}
      <Sequence durationInFrames={90}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/quill_scratch.mp3`)}
          volume={(f) =>
            interpolate(f, [0, 90], [0.3, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>

      {/* VO + Captions */}
      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(
            `${ASSET_PATH}/audio/vo/short/ep003_s2_discovery.mp3`,
          )}
          volume={1}
        />
        <YouTubeCaptions
          transcript={TRASCRIPT_DATA}
          highlightedWords={[
            "1912",
            "Voynich",
            "castle",
            "Carbon",
            "dating",
            "1400s",
            "nobody",
            "knows",
            "wrote",
          ]}
          position="youtube-shorts"
          fontSize="small"
          startFrame={0}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
