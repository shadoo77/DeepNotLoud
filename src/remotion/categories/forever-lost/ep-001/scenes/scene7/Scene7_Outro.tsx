import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Img,
  staticFile,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { Audio } from "@remotion/media";
import { TiktokCaptions } from "@/components/atoms/TiktokCaptions";
import { getPhraseFrames } from "@/lib/utils";
import { TRASCRIPT_DATA as transcriptData, VO_START_FRAME } from "./constants";

const ASSET = "assets/forever-lost/ep-001";

// Computed once at module level — transcriptData is static, no need to
// re-filter it on every frame inside the component.
const FILTERED_TRANSCRIPT = transcriptData.filter(
  (w) =>
    !w.text.toLowerCase().includes("forever") &&
    !w.text.toLowerCase().includes("lost"),
);

export function Scene7_Outro() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- VISUAL TRIGGERS ---
  const frameSwallowed = getPhraseFrames({
    phrase: "swallowed",
    transcriptData,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
    bufferFrames: 12,
  });

  const frameForeverLost = getPhraseFrames({
    phrase: "forever",
    transcriptData,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
    bufferFrames: 12,
  });

  // --- ANIMATIONS ---

  // 1. Right-to-Left Dissolve Mask
  const maskProgress = interpolate(
    frame,
    [frameSwallowed.from, frameSwallowed.from + fps * 6],
    [100, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.quad),
    },
  );

  // Clamped explicitly to avoid sub-pixel bleed at edge frames
  const maskStop = Math.min(100, Math.max(0, 100 - maskProgress));

  // 2. Title Card Spring Animations — guarded with Math.max(0, ...) so springs
  //    idle at their resting value before trigger instead of computing with
  //    negative frame values (which caused the spinner in Scene4).
  const channelSpring = spring({
    frame: Math.max(0, frame - (frameForeverLost.from + fps * 2)),
    fps,
    config: { damping: 20, stiffness: 60 },
  });

  const playlistSpring = spring({
    frame: Math.max(0, frame - (frameForeverLost.from + fps * 3)),
    fps,
    config: { damping: 20, stiffness: 60 },
  });

  // --- HIGHLIGHTED WORDS ---
  const highlightedWords = ["returning", "earth", "swallowed"];

  return (
    <AbsoluteFill className="bg-abyssBlack overflow-hidden">
      {/* ====== BACKGROUND: Fading Bow ====== */}
      <AbsoluteFill
        style={{
          WebkitMaskImage: `linear-gradient(to right, transparent ${maskStop}%, black ${maskStop + 15}%)`,
          maskImage: `linear-gradient(to right, transparent ${maskStop}%, black ${maskStop + 15}%)`,
        }}
      >
        <Img
          src={staticFile(`${ASSET}/images/img_bow_fading.jpeg`)}
          className="h-full w-full object-cover"
        />
      </AbsoluteFill>

      {/* ====== TITLE CARD REVEAL ====== */}
      <AbsoluteFill className="z-20 flex flex-col items-center justify-center">
        {/* @DeepNotLoud */}
        <h1
          className="font-inter text-biolumTeal text-7xl font-extrabold tracking-tight"
          style={{
            opacity: channelSpring,
            transform: `scale(${channelSpring})`,
            textShadow:
              "0 0 30px var(--color-biolumTeal), 0 0 60px var(--color-biolumTeal)",
          }}
        >
          @DeepNotLoud
        </h1>

        {/* Forever-Lost */}
        <h2
          className="font-inter text-steelGrey mt-4 text-7xl font-semibold tracking-wide"
          style={{
            opacity: playlistSpring,
            transform: `scale(${playlistSpring})`,
          }}
        >
          Forever-Lost
        </h2>
      </AbsoluteFill>

      {/* ====== AUDIO LAYERS ====== */}

      {/* BGM: Cello returns, then fades to nothing.
          Callback form lets Remotion sample the volume curve at any frame
          independently during audio pre-render — avoids pops/incorrect fades
          on export that can occur with a static volume value. */}
      <Audio
        src={staticFile(`${ASSET}/voices/bgm/bgm_scene0_cello.mp3`)}
        volume={(f) =>
          interpolate(
            f,
            [0, frameForeverLost.from, frameForeverLost.from + fps * 2],
            [0.15, 0.15, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          )
        }
      />

      {/* SFX: Final groan fading to silence — callback form for same reason */}
      <Audio
        src={staticFile(`${ASSET}/voices/sfx/sfx_final_groan.wav`)}
        volume={(f) =>
          interpolate(f, [0, fps * 6], [0.4, 0], {
            extrapolateRight: "clamp",
          })
        }
      />

      {/* Voiceover */}
      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET}/voices/vo/vo_scene7.wav`)}
          volume={0.85}
        />
      </Sequence>

      {/* ====== CAPTIONS (Filtered - no Forever/Lost duplication) ====== */}
      <TiktokCaptions
        transcript={FILTERED_TRANSCRIPT}
        highlightedWords={highlightedWords}
        position="bottom-center"
        startFrame={VO_START_FRAME}
        switchCaptionsEveryMs={2000}
      />
    </AbsoluteFill>
  );
}
