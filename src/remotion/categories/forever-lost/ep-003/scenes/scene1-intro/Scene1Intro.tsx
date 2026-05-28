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
import { C } from "@/remotion/categories/forever-lost/ep-003/constants";
import { TRASCRIPT_DATA, VO_START_FRAME } from "./constants";

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

  const impactFlash = interpolate(
    frame,
    [impactFrame, impactFrame + 4, impactFrame + 12],
    [0, 0.18, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: C.bg }}>
      <Audio
        src={staticFile(`${ASSET}/audio/bgm/ep003_bgm_landscape.mp3`)}
        volume={(f) => {
          if (f < durationInFrames) return 0.18;
          return 0;
        }}
        loop
      />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transform: `scale(${kenBurns})` }}
      >
        <Img
          src={staticFile(`${ASSET}/images/ep003_manuscript_spread.jpeg`)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.70) 100%)",
        }}
      />

      <DustParticles count={40} />

      <div className="absolute inset-0" style={{ opacity: wheelOpacity }}>
        <Img
          src={staticFile(`${ASSET}/images/ep003_astronomical_wheel.jpeg`)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div className="absolute inset-0" style={{ opacity: beineckeOpacity }}>
        <Img
          src={staticFile(`${ASSET}/images/ep003_yale_beinecke_interior.jpeg`)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.70) 100%)",
        }}
      />

      <div
        className="absolute rounded-lg"
        style={{
          top: 50,
          left: 50,
          opacity: Math.min(titleOpacity, 1 - titleExitOpacity),
          transform: `translateY(${interpolate(titleSpring, [0, 1], [-20, 0])}px)`,
          backgroundColor: "rgba(0,0,0,0.55)",
          padding: "12px 20px",
        }}
      >
        <div
          style={{
            fontFamily: cinzelFont,
            fontSize: 48,
            fontWeight: 900,
            color: C.gold,
            letterSpacing: 4,
          }}
        >
          FOREVER LOST
        </div>
        <div
          style={{
            fontFamily: interFont,
            fontSize: 18,
            color: C.gray,
            marginTop: 4,
            letterSpacing: 3,
          }}
        >
          EPISODE 003
        </div>
        <div
          style={{
            height: 3,
            backgroundColor: C.gold,
            width: interpolate(underlineSpring, [0, 1], [0, 220]),
            marginTop: 8,
            borderRadius: 2,
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute"
        style={{
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${chapterScale})`,
          opacity:
            Math.min(chapterOpacity, 1 - chapterExitOpacity) * chapterOpacity,
          textAlign: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.55)",
            borderRadius: 12,
            padding: "24px 40px",
          }}
        >
          <div
            style={{
              fontFamily: cinzelFont,
              fontSize: 56,
              fontWeight: 900,
              color: C.white,
              letterSpacing: 3,
              textShadow: `0 0 ${glowPulse}px ${C.gold}`,
            }}
          >
            The Voynich Manuscript
          </div>
          <div
            style={{
              fontFamily: interFont,
              fontSize: 22,
              color: C.gold,
              marginTop: 16,
              letterSpacing: 2,
              fontWeight: 400,
            }}
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
          src={staticFile(`${ASSET}/audio/vo/ep003_L_s1_intro.wav`)}
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
          showOverlay
        />
      </Sequence>

      <Sequence durationInFrames={90}>
        <Audio
          src={staticFile(`${ASSET}/audio/sfx/deep_rumble.wav`)}
          volume={(f) =>
            interpolate(f, [0, 90], [0.5, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          }
        />
      </Sequence>

      <Sequence from={60}>
        <Audio
          src={staticFile(`${ASSET}/audio/sfx/paper_rustle.wav`)}
          volume={0.6}
        />
      </Sequence>

      <Sequence from={impactFrame}>
        <Audio
          src={staticFile(`${ASSET}/audio/sfx/impact_thud.wav`)}
          volume={0.6}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
