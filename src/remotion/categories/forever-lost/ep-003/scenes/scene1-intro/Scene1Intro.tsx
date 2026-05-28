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
  const { fps } = useVideoConfig();

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

  const glowPulse = Math.sin(frame * 0.04) * 10 + 10;

  const kenBurns = interpolate(frame, [0, 1350], [1.0, 1.1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.ease,
  });

  const wheelOpacity = interpolate(frame, [900, 930], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const wheelOutOpacity = interpolate(frame, [1170, 1200], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const beineckeOpacity = interpolate(frame, [1200, 1230], [0, 1], {
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

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Audio
        src={staticFile(`${ASSET}/audio/bgm/ep003_bgm_landscape.mp3`)}
        volume={(f) => {
          if (f < 1350) return 0.18;
          return 0;
        }}
        loop
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${kenBurns})`,
          overflow: "hidden",
        }}
      >
        <Img
          src={staticFile(`${ASSET}/images/ep003_manuscript_spread.jpeg`)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.70) 100%)",
          pointerEvents: "none",
        }}
      />

      <DustParticles count={40} />

      <div
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <Img
          src={staticFile(`${ASSET}/images/ep003_astronomical_wheel.jpeg`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: wheelOpacity * (1 - wheelOutOpacity),
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
        }}
      >
        <Img
          src={staticFile(`${ASSET}/images/ep003_yale_beinecke_interior.jpeg`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: beineckeOpacity,
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.60) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 60,
          left: 60,
          opacity: Math.min(titleOpacity, 1 - titleExitOpacity),
          transform: `translateY(${interpolate(titleSpring, [0, 1], [-20, 0])}px)`,
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
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${chapterScale})`,
          opacity:
            Math.min(chapterOpacity, 1 - chapterExitOpacity) * chapterOpacity,
          textAlign: "center",
          pointerEvents: "none",
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

      <TickerBar opacity={1} color={C.gold} />

      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET}/audio/vo/ep003_L_s1_intro.wav`)}
          volume={1}
        />
        <YouTubeCaptions
          transcript={TRASCRIPT_DATA}
          highlightedWords={[]}
          position="bottom-center"
          startFrame={VO_START_FRAME}
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
          volume={0.3}
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
