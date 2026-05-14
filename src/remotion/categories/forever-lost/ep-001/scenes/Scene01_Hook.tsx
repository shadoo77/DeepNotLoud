import React from "react";
import { Audio } from "@remotion/media";
import {
  AbsoluteFill,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";
import { Background } from "../components/Background";
import { AnimatedTitle } from "../components/Captions";

interface Scene01HookProps {
  offsetFrames: number;
}

const WORDS = [
  { word: "In", startMs: 250, endMs: 270 },
  { word: "1912", startMs: 270, endMs: 1660 },
  { word: ",", startMs: 1660, endMs: 2240 },
  { word: "the", startMs: 2240, endMs: 2300 },
  { word: "most", startMs: 2300, endMs: 2800 },
  { word: "famous", startMs: 2800, endMs: 3300 },
  { word: "ship", startMs: 3300, endMs: 3700 },
  { word: "in", startMs: 3700, endMs: 3890 },
  { word: "history", startMs: 3890, endMs: 4820 },
  { word: "sank", startMs: 4820, endMs: 4980 },
  { word: "to", startMs: 4980, endMs: 5150 },
  { word: "the", startMs: 5150, endMs: 5450 },
  { word: "bottom", startMs: 5450, endMs: 5910 },
  { word: "of", startMs: 5910, endMs: 6080 },
  { word: "the", startMs: 6080, endMs: 6320 },
  { word: "Atlantic", startMs: 6320, endMs: 6980 },
  { word: ".", startMs: 6980, endMs: 7840 },
  { word: "Over", startMs: 7840, endMs: 8320 },
  { word: "a", startMs: 8320, endMs: 8440 },
  { word: "century", startMs: 8440, endMs: 9290 },
  { word: "later", startMs: 9290, endMs: 9860 },
  { word: ",", startMs: 9860, endMs: 10350 },
  { word: "it", startMs: 10350, endMs: 10540 },
  { word: "'s", startMs: 10540, endMs: 10910 },
  { word: "still", startMs: 10910, endMs: 11780 },
  { word: "there", startMs: 11780, endMs: 12440 },
  { word: ",", startMs: 12440, endMs: 13000 },
  { word: "exactly", startMs: 13000, endMs: 13660 },
  { word: "where", startMs: 13660, endMs: 14290 },
  { word: "it", startMs: 14290, endMs: 14490 },
  { word: "fell", startMs: 14490, endMs: 15040 },
  { word: ".", startMs: 15040, endMs: 15440 },
  { word: "Not", startMs: 15440, endMs: 15710 },
  { word: "because", startMs: 15710, endMs: 16350 },
  { word: "nobody", startMs: 16350, endMs: 16900 },
  { word: "wants", startMs: 16900, endMs: 17360 },
  { word: "to", startMs: 17360, endMs: 17540 },
  { word: "bring", startMs: 17540, endMs: 17990 },
  { word: "it", startMs: 17990, endMs: 18180 },
  { word: "up", startMs: 18180, endMs: 18360 },
  { word: ",", startMs: 18360, endMs: 18780 },
  { word: "because", startMs: 18780, endMs: 19670 },
  { word: "it", startMs: 19670, endMs: 19810 },
  { word: "is", startMs: 19810, endMs: 20070 },
  { word: "physically", startMs: 20070, endMs: 21560 },
  { word: "impossible", startMs: 21560, endMs: 22580 },
  { word: ".", startMs: 22580, endMs: 22940 },
];

export const Scene01Hook: React.FC<Scene01HookProps> = ({ offsetFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - offsetFrames;

  if (localFrame < 0) return null;

  const wordsWithFrames = WORDS.map((w) => ({
    word: w.word,
    startFrame: Math.floor((w.startMs / 1000) * fps),
    endFrame: Math.floor((w.endMs / 1000) * fps),
  }));

  const activeIndex = wordsWithFrames.findIndex(
    (w) => localFrame >= w.startFrame && localFrame < w.endFrame
  );

  const heroOpacity = interpolate(localFrame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill>
      <Background
        image="assets/forever-lost/ep-001/images/titanic-hero.jpeg"
        overlayOpacity={0.65}
      />

      <AbsoluteFill className="items-center justify-center" style={{ opacity: heroOpacity }}>
        <AnimatedTitle
          text="FOREVER LOST"
          startFrame={10}
          durationFrames={120}
          size={80}
          color="#4FC3D4"
        />
        <div className="h-5" />
        <AnimatedTitle
          text="Why The Titanic Can Never Be Raised"
          startFrame={25}
          durationFrames={200}
          size={40}
          color="#C9956B"
        />
      </AbsoluteFill>

      <AbsoluteFill className="items-center justify-end" style={{ paddingBottom: 80 }}>
        <div className="max-w-[90%] text-center font-sans leading-relaxed" style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}>
          {wordsWithFrames.map((w, i) => {
            const isActive = i === activeIndex;
            const isPast = i < activeIndex;
            return (
              <span
                key={i}
                className={isActive ? "text-cyan-400" : isPast ? "text-slate-500" : "text-slate-400"}
                style={{
                  opacity: isPast ? 0.5 : isActive ? 1 : 0.7,
                  fontWeight: isActive ? 600 : 400,
                  fontSize: isActive ? 38 : 36,
                }}
              >
                {w.word}{" "}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>

      <Audio src={staticFile("assets/forever-lost/ep-001/voices/scene_01_hook.wav")} />
    </AbsoluteFill>
  );
};
