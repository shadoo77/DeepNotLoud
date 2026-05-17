import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  staticFile,
} from "remotion";
import { Audio } from "@remotion/media";
import { TiktokCaptions } from "@/components/atoms/TiktokCaptions";
import { getPhraseFrames } from "@/lib/utils";
import { TRASCRIPT_DATA as transcriptData, VO_START_FRAME } from "./constants";

const ASSET = "assets/forever-lost/ep-002";

export function Scene6_LegalEthicalGrave() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const gpf = (phrase: string) =>
    getPhraseFrames({
      phrase,
      transcriptData,
      fps,
      voiceOverStartFrame: VO_START_FRAME,
    }).from;

  const highlightedWords = [
    "grave",
    "1,500",
    "underwater",
    "heritage",
    "ecosystem",
    "ruins",
  ];

  return (
    <AbsoluteFill className="bg-abyssBlack overflow-hidden">
      {/* ====== AUDIO LAYERS ====== */}
      <Audio
        src={staticFile(`${ASSET}/voices/bgm/bgm_scene4_tension.mp3`)}
        volume={0.25}
      />

      <Sequence from={VO_START_FRAME}>
        <Audio
          src={staticFile(`${ASSET}/voices/vo/vo_scene6.wav`)}
          volume={0.85}
        />
      </Sequence>

      {/* ====== CAPTIONS ====== */}
      <TiktokCaptions
        transcript={transcriptData}
        highlightedWords={highlightedWords}
        position="center"
        startFrame={VO_START_FRAME}
      />
    </AbsoluteFill>
  );
}
