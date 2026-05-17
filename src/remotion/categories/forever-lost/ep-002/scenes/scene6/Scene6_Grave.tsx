import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Img,
  staticFile,
  interpolate,
  spring,
} from "remotion";
import { Audio } from "@remotion/media";
import { TiktokCaptions } from "@/components/atoms/TiktokCaptions";
import { getPhraseFrames } from "@/lib/utils";
import { TRASCRIPT_DATA as transcriptData, VO_START_FRAME } from "./constants";
import { EulogyCaptions } from "@/components/atoms/EulogyCaptions";

const ASSET = "assets/forever-lost/ep-002";

export function Scene6_Grave() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- VISUAL TRIGGERS ---
  // const frameUNESCO = getWordFrame("unesco", fps);
  // const frameEcosystem = getWordFrame("ecosystem", fps);

  const frameUNESCO = getPhraseFrames({
    phrase: "unesco",
    transcriptData,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
    bufferFrames: 12,
  });

  const frameEcosystem = getPhraseFrames({
    phrase: "ecosystem",
    transcriptData,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
    bufferFrames: 12,
  });

  // --- ANIMATIONS ---

  // 1. Respectful Slow Zoom (100% -> 110% over the entire scene)
  const slowZoom = interpolate(frame, [0, fps * 60], [1, 1.1]);

  // 2. UNESCO Document Fade-in (Gentle spring)
  const docSpring = spring({
    frame: frame - frameUNESCO.from,
    fps,
    config: { damping: 30, stiffness: 40, mass: 1 }, // Very slow, smooth, no bounce
  });

  // 3. Scene Fade Out (Last 3 seconds / 90 frames)
  // Assuming scene duration is calculated elsewhere, we'll fade out based on a local variable or just use a long interpolate
  const sceneOutFade = interpolate(frame, [fps * 55, fps * 60], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // --- HIGHLIGHTED WORDS ---
  const highlightedWords = [
    "grave",
    "1,500",
    "underwater",
    "heritage",
    "ecosystem",
    "ruins",
  ];

  return (
    <AbsoluteFill
      className="bg-abyssBlack overflow-hidden"
      style={{ opacity: sceneOutFade }}
    >
      {/* ====== BACKGROUND: Porthole Light ====== */}
      <AbsoluteFill
        style={{
          transform: `scale(${slowZoom})`,
          transformOrigin: "50% 50%",
        }}
      >
        <Img
          src={staticFile(`${ASSET}/images/img_porthole_light.jpeg`)}
          className="h-full w-full object-cover"
        />
      </AbsoluteFill>

      {/* ====== OVERLAY: UNESCO Document ====== */}
      <Sequence from={frameUNESCO.from}>
        <AbsoluteFill
          className="flex items-center justify-center"
          style={{ opacity: docSpring }}
        >
          <div className="w-[50%] shadow-2xl">
            <Img
              src={staticFile(`${ASSET}/images/img_legal_treaty.jpeg`)}
              className="h-auto w-full object-contain"
            />
          </div>
        </AbsoluteFill>
      </Sequence>

      {/* ====== AUDIO LAYERS ====== */}

      {/* BGM: Sparse piano (Very low, respectful volume) */}
      <Audio
        src={staticFile(`${ASSET}/voices/bgm/bgm_scene6_piano.mp3`)}
        volume={0.2}
      />

      {/* SFX: Muffled underwater room tone */}
      <Audio
        src={staticFile(`${ASSET}/voices/sfx/sfx_underwater_ambience.wav`)}
        volume={0.4}
      />

      {/* SFX: Distant whale song (triggers early to establish mood) */}
      <Sequence from={fps * 2}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_whale_song.wav`)}
          volume={0.3}
        />
      </Sequence>

      {/* SFX: Document rustle (synced with document appearance) */}
      <Sequence from={frameUNESCO.from}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_document_rustle.wav`)}
          volume={0.25}
        />
      </Sequence>

      {/* Voiceover */}
      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET}/voices/vo/vo_scene6.wav`)}
          volume={0.85}
        />
      </Sequence>

      {/* ====== CAPTIONS (Eulogy Style) ====== */}
      <EulogyCaptions
        transcript={transcriptData}
        highlightedWords={highlightedWords}
        startFrame={VO_START_FRAME}
      />
    </AbsoluteFill>
  );
}
