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
import { Captions } from "@/components/atoms/Captions";
import { Explode } from "@/components/atoms/Explode";
import transcriptData from "./transcript_scene2.json";

const ASSET = "assets/forever-lost/ep-002";

// Helper to find when a specific word happens
const getWordFrame = (wordToFind: string, fps: number) => {
  const word = transcriptData.find((w) =>
    w.text
      .toLowerCase()
      .replace(/[.,!?]/g, "")
      .includes(wordToFind.toLowerCase()),
  );
  return word ? Math.round((word.startMs / 1000) * fps) : 0;
};

export function Scene2_Pressure() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- VISUAL TRIGGERS FROM VOICEOVER ---
  const frameCup = getWordFrame("crushed", fps);
  const frameHull = getWordFrame("corroding", fps);
  const frameDisintegrate = getWordFrame("disintegrate", fps);

  // --- ANIMATIONS ---
  const pressureScale = spring({
    frame: frame - 30, // Starts compressing 1 second in
    fps,
    config: { damping: 8, stiffness: 60 },
  });

  // 1 to 0.85 compression effect
  const compressionScale = interpolate(pressureScale, [0, 1], [1, 0.85]);

  // Highlighted words
  const highlightedWords = [
    "380",
    "crushed",
    "corroding",
    "century",
    "disintegrate",
  ];

  return (
    <AbsoluteFill className="bg-abyssBlack overflow-hidden">
      {/* ====== BACKGROUND: FEA STRESS MAP ====== */}
      <Sequence from={frameHull}>
        <AbsoluteFill
          style={{
            opacity: interpolate(frame, [frameHull, frameHull + 30], [0, 0.4], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Img
            src={staticFile(`${ASSET}/images/img_hull_deformation.png`)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ====== PRESSURE ARROWS (SVG Animation) ====== */}
      <AbsoluteFill
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1920 1080"
          style={{ position: "absolute", opacity: 0.6 }}
        >
          {/* Top Arrow */}
          <path
            d={`M960 50 L960 ${interpolate(compressionScale, [1, 0.85], [50, 200])}`}
            className="stroke-rustOrange"
            strokeWidth="4"
          />
          {/* Bottom Arrow */}
          <path
            d={`M960 1030 L960 ${interpolate(compressionScale, [1, 0.85], [1030, 880])}`}
            className="stroke-rustOrange"
            strokeWidth="4"
          />
          {/* Left Arrow */}
          <path
            d={`M50 540 L${interpolate(compressionScale, [1, 0.85], [50, 200])} 540`}
            className="stroke-rustOrange"
            strokeWidth="4"
          />
          {/* Right Arrow */}
          <path
            d={`M1870 540 L${interpolate(compressionScale, [1, 0.85], [1870, 1720])} 540`}
            className="stroke-rustOrange"
            strokeWidth="4"
          />
        </svg>

        {/* The Compressing Sphere (Representing the ship) */}
        <div
          style={{
            width: 400,
            height: 400,
            borderRadius: "50%",
            backgroundColor: "var(--color-deepNavy)",
            border: `2px solid var(--color-oceanBlue)`,
            transform: `scale(${compressionScale})`,
            boxShadow: `0 0 40px var(--color-oceanBlue)`,
          }}
        />
      </AbsoluteFill>

      {/* ====== STYROFOAM CUP COMPARISON ====== */}
      <Sequence
        from={frameCup}
        durationInFrames={frameHull > 0 ? frameHull - frameCup : fps * 5}
      >
        <AbsoluteFill
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Img
            src={staticFile(`${ASSET}/images/img_pressure_crushed_cup.png`)}
            style={{
              width: "70%",
              height: "70%",
              objectFit: "contain",
              opacity: interpolate(frame, [frameCup, frameCup + 30], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ====== THE "DISINTEGRATE" EXPLOSION ====== */}
      <Sequence from={frameDisintegrate}>
        <AbsoluteFill
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "var(--color-abyssBlack)",
            // Fade the whole background to black so the word pops
            opacity: interpolate(
              frame,
              [frameDisintegrate, frameDisintegrate + 15],
              [0, 1],
              { extrapolateRight: "clamp" },
            ),
          }}
        >
          <Explode
            text="DISINTEGRATE"
            triggerFrame={frameDisintegrate}
            color="var(--color-rustOrange)"
            fontSize={120}
          />
        </AbsoluteFill>
      </Sequence>

      {/* ====== AUDIO LAYERS ====== */}
      <Audio
        src={staticFile(`${ASSET}/voices/bgm/bgm_scene2_industrial.mp3`)}
        volume={0.25}
      />

      <Sequence from={frameCup}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_crushing.wav`)}
          volume={0.4}
        />
      </Sequence>

      <Sequence from={frameHull}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_metal_shriek.wav`)}
          volume={0.3}
        />
      </Sequence>

      {/* Heartbeat pulse synced with the compression animation */}
      <Audio
        src={staticFile(`${ASSET}/voices/sfx/sfx_heartbeat.wav`)}
        volume={0.3}
      />

      {/* Voiceover */}
      <Audio
        src={staticFile(`${ASSET}/voices/vo/vo_scene2.wav`)}
        volume={0.8}
      />

      {/* ====== CAPTIONS ====== */}
      {/* We center the captions for this scene to make it feel more intense */}
      {/* We also hide the word "disintegrate" from the normal captions because it's handled by the Explode component */}
      <Captions
        transcript={transcriptData.filter(
          (w) => !w.text.toLowerCase().includes("disintegrate"),
        )}
        highlightedWords={highlightedWords}
        position="center"
        theme={theme}
      />
    </AbsoluteFill>
  );
}
