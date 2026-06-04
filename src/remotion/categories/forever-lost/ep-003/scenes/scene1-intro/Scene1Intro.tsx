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
import { getPhraseFrames } from "@/lib/utils";
import { TickerBar } from "@/components/atoms/TickerBar";
import { DustParticles } from "@/components/atoms/DustParticles";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";
import { SceneBadges } from "@/components/atoms/SceneBadges";
import { C } from "@/remotion/categories/forever-lost/ep-003/constants";
import { TRASCRIPT_DATA, VO_START_FRAME } from "./constants";
import { BADGES } from "./badges";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

const { fontFamily: interFont } = loadInterFont("normal", {
  weights: ["400", "600"],
  subsets: ["latin"],
});

const ASSET = "assets/forever-lost/ep-003";

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const titleSpring = spring({
    frame: frame - 120,
    fps,
    config: { damping: 14, stiffness: 80 },
  });

  const underlineSpring = spring({
    frame: frame - 160,
    fps,
    config: { damping: 18, stiffness: 100 },
  });

  const chapterSpring = spring({
    frame: frame - 600,
    fps,
    config: { damping: 14, stiffness: 70 },
  });

  const glowPhase = Math.min(Math.max(0, frame - 600), 600);
  const glowPulse = interpolate(
    Math.sin(glowPhase * 0.02094),
    [-1, 1],
    [0, 20],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const kenBurns = interpolate(frame, [0, durationInFrames], [1.0, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  const wheelOpacity = interpolate(frame, [450, 480], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const beineckeOpacity = interpolate(frame, [900, 930], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [120, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleExitOpacity = interpolate(frame, [370, 400], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const chapterOpacity = interpolate(chapterSpring, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const chapterScale = interpolate(chapterSpring, [0, 1], [0.85, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const chapterExitOpacity = interpolate(frame, [1170, 1200], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const silencePhrase = getPhraseFrames({
    phrase: "six hundred years of silence",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });

  const impactFrame = silencePhrase.from > 0 ? silencePhrase.from : 900;

  const finalPhrase = getPhraseFrames({
    phrase: "forever lost",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  });

  const finalImpactFrame =
    finalPhrase.from > 0 ? finalPhrase.from : impactFrame + 600;

  const silenceFlash = interpolate(
    frame,
    [impactFrame, impactFrame + 4, impactFrame + 12],
    [0, 0.18, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const finalFlash = interpolate(
    frame,
    [finalImpactFrame, finalImpactFrame + 4, finalImpactFrame + 12],
    [0, 0.18, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const impactFlash = Math.max(silenceFlash, finalFlash);

  // ── MICRO-REVEALS (pacing) ──
  const glyph1Opacity = interpolate(frame, [750, 760, 790, 800], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glyph2Opacity = interpolate(frame, [810, 820, 850, 860], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const glyph3Opacity = interpolate(frame, [870, 880, 910, 920], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const carbonDateFade = interpolate(
    frame,
    [960, 990, 1050, 1070],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const carbonRangeFade = interpolate(
    frame,
    [1080, 1100, 1140, 1150],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const cornerFlare1250 = interpolate(
    frame,
    [1250, 1280, 1480, 1510],
    [0, 0.6, 0.6, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const voynichFade = interpolate(
    frame,
    [1280, 1310, 1370, 1400],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  const lineDraw1420 = interpolate(
    Math.max(0, frame - 1420),
    [0, 40],
    [0, 100],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const lineOpacity = interpolate(Math.max(0, frame - 1460), [0, 10], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="overflow-hidden" style={{ backgroundColor: C.bg }}>
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transform: `scale(${kenBurns})` }}
      >
        <Img
          src={staticFile(`${ASSET}/images/ep003_manuscript_spread.jpeg`)}
          className="size-full object-cover"
        />

        <div className="absolute inset-0" style={{ opacity: wheelOpacity }}>
          <Img
            src={staticFile(`${ASSET}/images/ep003_astronomical_wheel.jpeg`)}
            className="size-full object-cover"
          />
        </div>

        <div className="absolute inset-0" style={{ opacity: beineckeOpacity }}>
          <Img
            src={staticFile(
              `${ASSET}/images/ep003_yale_beinecke_interior.jpeg`,
            )}
            className="size-full object-cover"
          />
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.70) 100%)",
        }}
      />

      <DustParticles count={180} />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.70) 100%)",
        }}
      />

      <SceneBadges
        badges={BADGES}
        transcriptData={TRASCRIPT_DATA}
        voiceOverStartFrame={VO_START_FRAME}
      />

      {/* micro-reveals */}
      <div
        className="pointer-events-none absolute"
        style={{ top: "35%", right: "15%", opacity: glyph1Opacity }}
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
          ꝏ
        </span>
      </div>
      <div
        className="pointer-events-none absolute"
        style={{ top: "45%", right: "20%", opacity: glyph2Opacity }}
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
          ⴀ
        </span>
      </div>
      <div
        className="pointer-events-none absolute"
        style={{ top: "55%", right: "10%", opacity: glyph3Opacity }}
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
          ꝑ
        </span>
      </div>

      <div
        className="pointer-events-none absolute flex items-center gap-3"
        style={{ top: "40%", left: "8%", opacity: carbonDateFade }}
      >
        <div style={{ width: 20, height: 2, backgroundColor: C.gold }} />
        <span
          className="text-3xl font-semibold tracking-wider"
          style={{
            fontFamily: cinzelFont,
            color: C.white,
            letterSpacing: 4,
          }}
        >
          CARBON DATED
        </span>
      </div>
      <div
        className="pointer-events-none absolute flex items-center gap-3"
        style={{ top: "35%", left: "8%", opacity: carbonRangeFade }}
      >
        <div style={{ width: 20, height: 2, backgroundColor: C.gold }} />
        <span
          className="text-3xl font-semibold tracking-wider"
          style={{ fontFamily: cinzelFont, color: C.white }}
        >
          1404 – 1438
        </span>
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
          opacity: cornerFlare1250,
        }}
      />

      <div
        className="pointer-events-none absolute flex items-center gap-3"
        style={{ top: "40%", left: "8%", opacity: voynichFade }}
      >
        <div style={{ width: 20, height: 2, backgroundColor: C.gold }} />
        <span
          className="text-3xl font-semibold tracking-wider"
          style={{ fontFamily: cinzelFont, color: C.white }}
        >
          VOYNICH
        </span>
      </div>

      <div
        className="pointer-events-none absolute"
        style={{
          top: "45%",
          left: 0,
          width: "100%",
          opacity: lineOpacity,
        }}
      >
        <svg width="100%" height={2}>
          <line
            x1={0}
            y1={0}
            x2={`${lineDraw1420}%`}
            y2={0}
            stroke={C.gold}
            strokeWidth={2}
            strokeOpacity={0.7}
          />
        </svg>
      </div>

      <div
        className="absolute rounded-lg px-5 py-3"
        style={{
          top: 50,
          left: 50,
          opacity: Math.min(titleOpacity, 1 - titleExitOpacity),
          transform: `translateY(${interpolate(titleSpring, [0, 1], [-20, 0])}px)`,
          backgroundColor: "rgba(0,0,0,0.55)",
        }}
      >
        <div
          className="text-5xl font-black tracking-widest"
          style={{ fontFamily: cinzelFont, color: C.gold }}
        >
          FOREVER LOST
        </div>
        <div
          className="mt-1 text-3xl font-semibold tracking-wider"
          style={{ fontFamily: interFont, color: C.gray }}
        >
          EPISODE 003
        </div>
        <div
          className="mt-2 h-[3px] rounded-sm"
          style={{
            backgroundColor: C.gold,
            width: interpolate(underlineSpring, [0, 1], [0, 220]),
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute text-center"
        style={{
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${chapterScale})`,
          opacity:
            Math.min(chapterOpacity, 1 - chapterExitOpacity) * chapterOpacity,
        }}
      >
        <div
          className="rounded-xl px-10 py-6"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
        >
          <div
            className="text-5xl font-black tracking-wider"
            style={{
              fontFamily: cinzelFont,
              color: C.white,
              textShadow: `0 0 ${glowPulse}px ${C.gold}`,
            }}
          >
            The Voynich Manuscript
          </div>
          <div
            className="mt-4 text-4xl font-bold tracking-wider"
            style={{ fontFamily: interFont, color: C.gold }}
          >
            Why Nobody Can Decode It
          </div>
        </div>
      </div>

      <TickerBar opacity={1} color={C.gold} />

      <div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: C.gold, opacity: impactFlash }}
      />

      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET}/audio/vo/ep003_L_s1_intro.mp3`)}
          volume={1}
        />
        <YouTubeCaptions
          transcript={TRASCRIPT_DATA}
          highlightedWords={[
            "1400s",
            "Six",
            "hundred",
            "years",
            "Voynich",
            "manuscript",
            "Beinecke",
            "Rare",
            "Book",
            "Yale",
            "University",
            "forever",
            "lost",
          ]}
          position="bottom-center"
          startFrame={0}
        />
      </Sequence>

      <Sequence durationInFrames={120}>
        <Audio
          src={staticFile(`${ASSET}/audio/sfx/deep_rumble.mp3`)}
          volume={(f) =>
            interpolate(f, [0, 120], [0.5, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>

      <Sequence from={60}>
        <Audio
          src={staticFile(`${ASSET}/audio/sfx/paper_rustle.mp3`)}
          volume={0.5}
        />
      </Sequence>

      <Sequence from={impactFrame}>
        <Audio
          src={staticFile(`${ASSET}/audio/sfx/impact_thud.mp3`)}
          volume={0.6}
        />
      </Sequence>

      <Sequence from={finalImpactFrame}>
        <Audio
          src={staticFile(`${ASSET}/audio/sfx/impact_thud.mp3`)}
          volume={0.6}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
