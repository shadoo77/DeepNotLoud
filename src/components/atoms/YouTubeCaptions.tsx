import { ComponentPropsWithRef, useMemo } from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  AbsoluteFill,
} from "remotion";
import { createTikTokStyleCaptions } from "@remotion/captions";
import type { Caption, TikTokPage } from "@remotion/captions";
import { cva } from "class-variance-authority";
import { cn, mergePunctuation, splitIntoSentences } from "@/lib/utils";

const captionPosition = cva("", {
  variants: {
    position: {
      "bottom-center": "justify-end items-center pb-16",
      "bottom-left": "justify-end items-start pb-16 pl-10",
      center: "justify-center items-center",
      "youtube-shorts": "justify-end items-center pb-110",
    },
  },
});

// ─── SENTENCE PAGE ──────────────────────────
const SentencePage = ({
  tokens,
  pageStartMs,
  highlightedWords,
  position,
  showOverlay,
}: {
  tokens: Caption[];
  pageStartMs: number;
  highlightedWords: string[];
  position: "bottom-center" | "bottom-left" | "center" | "youtube-shorts";
  showOverlay: boolean;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentTimeMs = pageStartMs + (frame / fps) * 1000;

  return (
    <AbsoluteFill className={cn(captionPosition({ position }))}>
      <div
        className="font-patua max-w-7xl text-5xl font-bold whitespace-pre-wrap"
        style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}
      >
        <div
          className="relative inline-block rounded-xl px-6 py-3 text-center"
          style={
            showOverlay ? { backgroundColor: "oklch(0.15 0.02 260 / 0.7)" } : {}
          }
        >
          {tokens.map((token, i) => {
            const isActive =
              token.startMs <= currentTimeMs && token.endMs > currentTimeMs;
            const isHighlighted = highlightedWords.some(
              (hw) =>
                token.text
                  .toLowerCase()
                  .replace(/[.,!?]/g, "")
                  .trim() === hw.toLowerCase(),
            );

            const style: React.CSSProperties = isActive
              ? {
                  textShadow:
                    "0px 0px 15px oklch(50% 0.2 85 / 0.8), 2px 2px 0px oklch(0% 0 0)",
                  transform: "scale(1.05)",
                  // eslint-disable-next-line @remotion/non-pure-animation
                  transition: "transform 0.1s ease-out",
                }
              : {
                  textShadow: "2px 2px 0px oklch(0% 0 0)",
                  transform: "scale(1)",
                };

            return (
              <span
                key={`${token.startMs}-${i}`}
                className={cn("text-background inline-block", {
                  "text-biolumTeal": isHighlighted,
                  "text-gold-glow": isActive && !isHighlighted,
                })}
                style={style}
              >
                {token.text}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── ORIGINAL TIKTOK PAGE ───

const CaptionPage = ({
  page,
  highlightedWords,
  position,
  showOverlay,
}: {
  page: TikTokPage;
  highlightedWords: string[];
  position: "bottom-center" | "bottom-left" | "center" | "youtube-shorts";
  showOverlay: boolean;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentTimeMs = (frame / fps) * 1000;
  const absoluteTimeMs = page.startMs + currentTimeMs;

  return (
    <AbsoluteFill className={cn(captionPosition({ position }))}>
      <div
        className="font-patua max-w-4xl text-5xl font-bold whitespace-pre-wrap"
        style={{ textShadow: "0 2px 12px rgba(0,0,0,0.9)" }}
      >
        <div
          className="relative inline-block rounded-xl px-6 py-3"
          style={
            showOverlay ? { backgroundColor: "oklch(0.15 0.02 260 / 0.7)" } : {}
          }
        >
          {page.tokens.map((token, i) => {
            const isActive =
              token.fromMs <= absoluteTimeMs && token.toMs > absoluteTimeMs;
            const isHighlighted = highlightedWords.some(
              (hw) =>
                token.text
                  .toLowerCase()
                  .replace(/[.,!?]/g, "")
                  .trim() === hw.toLowerCase(),
            );

            const style: React.CSSProperties = isActive
              ? {
                  textShadow:
                    "0px 0px 15px oklch(50% 0.2 85 / 0.8), 2px 2px 0px oklch(0% 0 0)",
                  transform: "scale(1.05)",
                  // eslint-disable-next-line @remotion/non-pure-animation
                  transition: "transform 0.1s ease-out",
                }
              : {
                  textShadow: "2px 2px 0px oklch(0% 0 0)",
                  transform: "scale(1)",
                };

            return (
              <span
                key={`${token.fromMs}-${i}`}
                className={cn("text-background inline-block", {
                  "text-biolumTeal": isHighlighted,
                  "text-gold-glow": isActive && !isHighlighted,
                })}
                style={style}
              >
                {token.text}
              </span>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ─── MAIN COMPONENT ─────────────────────────────────

type CaptionProps = ComponentPropsWithRef<"div"> & {
  transcript: Caption[];
  highlightedWords?: string[];
  position?: "bottom-center" | "bottom-left" | "center" | "youtube-shorts";
  startFrame?: number;
  switchCaptionsEveryMs?: number;
  showOverlay?: boolean;
  mode?: "tiktok" | "sentence";
};

export const YouTubeCaptions: React.FC<CaptionProps> = ({
  transcript,
  highlightedWords = [],
  position = "bottom-center",
  startFrame = 0,
  switchCaptionsEveryMs = 1500,
  showOverlay = false,
  mode = "sentence",
  ref,
  ...rest
}) => {
  const { fps } = useVideoConfig();

  // ─── ALL HOOKS CALLED UNCONDITIONALLY AT THE TOP ───

  const tiktokResult = useMemo(
    () =>
      createTikTokStyleCaptions({
        captions: transcript,
        combineTokensWithinMilliseconds: switchCaptionsEveryMs,
      }),
    [transcript, switchCaptionsEveryMs],
  );

  const processedTranscript = useMemo(
    () => mergePunctuation(transcript),
    [transcript],
  );

  const sentences = useMemo(
    () => splitIntoSentences(processedTranscript),
    [processedTranscript],
  );

  // ─── CONDITIONAL RENDERING (NO HOOKS BELOW THIS POINT) ───

  if (mode === "tiktok") {
    return tiktokResult.pages.map((page, index) => {
      const nextPage = tiktokResult.pages[index + 1] ?? null;
      const startFrameAbs = startFrame + (page.startMs / 1000) * fps;
      const endFrame = nextPage
        ? startFrame + (nextPage.startMs / 1000) * fps
        : startFrame +
          (page.startMs / 1000) * fps +
          (switchCaptionsEveryMs / 1000) * fps;
      const durationInFrames = endFrame - startFrameAbs;

      if (durationInFrames <= 0) {
        return null;
      }

      return (
        <Sequence
          key={index}
          from={startFrameAbs}
          durationInFrames={durationInFrames}
          ref={ref}
          {...rest}
        >
          <CaptionPage
            page={page}
            highlightedWords={highlightedWords}
            position={position}
            showOverlay={showOverlay}
          />
        </Sequence>
      );
    });
  }

  // Sentence Mode
  return sentences.map((sentence, index) => {
    const firstToken = sentence[0];
    const lastToken = sentence[sentence.length - 1];

    const startFrameAbs =
      startFrame + Math.round((firstToken.startMs / 1000) * fps);

    let endFrameAbs;
    const nextSentence = sentences[index + 1];

    if (nextSentence) {
      // CRITICAL FIX: End exactly when the next sentence begins to prevent overlap
      const nextFirstToken = nextSentence[0];
      endFrameAbs =
        startFrame + Math.round((nextFirstToken.startMs / 1000) * fps);
    } else {
      // For the very last sentence, use its end time + a tiny buffer
      endFrameAbs =
        startFrame +
        Math.round((lastToken.endMs / 1000) * fps) +
        Math.round(fps / 6);
    }

    const durationInFrames = endFrameAbs - startFrameAbs;

    if (durationInFrames <= 0) {
      return null;
    }

    return (
      <Sequence
        key={index}
        from={startFrameAbs}
        durationInFrames={durationInFrames}
        ref={ref}
        {...rest}
      >
        <SentencePage
          tokens={sentence}
          pageStartMs={firstToken.startMs}
          highlightedWords={highlightedWords}
          position={position}
          showOverlay={showOverlay}
        />
      </Sequence>
    );
  });
};
