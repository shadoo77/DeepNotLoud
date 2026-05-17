import { ComponentPropsWithRef, Fragment } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { TranscriptEntry } from "@/types";

type EulogyCaptionsProps = ComponentPropsWithRef<"div"> & {
  transcript: TranscriptEntry[];
  startFrame: number;
  highlightedWords?: string[];
};

export function EulogyCaptions({
  transcript,
  startFrame,
  highlightedWords = [],
}: EulogyCaptionsProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentTimeMs = ((frame - startFrame) / fps) * 1000;

  return (
    <div className="absolute bottom-[15%] left-1/2 w-[80%] max-w-4xl -translate-x-1/2 text-center leading-relaxed">
      {transcript.map((caption, i) => {
        const words = caption.text.split(" ");
        const chunkDuration = caption.endMs - caption.startMs;
        const timePerWord = chunkDuration / words.length;

        return (
          <Fragment key={i}>
            {words.map((word, wordIndex) => {
              const wordStartMs = caption.startMs + wordIndex * timePerWord;
              const isVisible = currentTimeMs >= wordStartMs;

              const cleanWord = word.toLowerCase().replace(/[.,!?;:]/g, "");
              const isHighlighted = highlightedWords.some(
                (hw) => cleanWord === hw.toLowerCase(),
              );

              // Slow, gentle fade-in (200ms)
              const opacity = isVisible
                ? Math.min(0.9, (currentTimeMs - wordStartMs) / 200)
                : 0;

              return (
                <span
                  key={`${i}-${wordIndex}`}
                  className={`font-inter ${
                    isHighlighted
                      ? "text-biolumTeal font-semibold"
                      : "text-surfaceWhite font-light"
                  }`}
                  style={{
                    fontSize: 28,
                    opacity,
                    textShadow: isHighlighted
                      ? "0 0 15px var(--color-biolumTeal)"
                      : "0px 2px 4px rgba(0,0,0,0.8)",
                    display: "inline-block",
                    marginRight: "0.35em",
                  }}
                >
                  {word}
                </span>
              );
            })}
          </Fragment>
        );
      })}
    </div>
  );
}
