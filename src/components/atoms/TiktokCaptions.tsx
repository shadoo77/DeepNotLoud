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
import { cn } from "@/lib/utils";

// const SWITCH_CAPTIONS_EVERY_MS = 1500;

const captionPosition = cva("", {
  variants: {
    position: {
      "bottom-center": "justify-end items-center pb-16",
      "bottom-left": "justify-end items-start pb-16 pl-10",
      center: "justify-center items-center",
    },
  },
});

const CaptionPage = ({
  page,
  highlightedWords,
  position,
  showOverlay,
}: {
  page: TikTokPage;
  highlightedWords: string[];
  position: "bottom-center" | "bottom-left" | "center";
  showOverlay: boolean;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const currentTimeMs = (frame / fps) * 1000;
  const absoluteTimeMs = page.startMs + currentTimeMs;

  return (
    <AbsoluteFill className={cn(captionPosition({ position }))}>
      <div
        className="font-patua max-w-4xl text-6xl font-bold whitespace-pre"
        style={{
          textShadow: "0 2px 12px rgba(0,0,0,0.9)",
        }}
      >
        <div
          className="relative inline-block rounded-xl px-6 py-3"
          style={
            showOverlay ? { backgroundColor: "oklch(0.15 0.02 260 / 0.7)" } : {}
          }
        >
          {page.tokens.map((token) => {
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
                key={token.fromMs}
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

type CaptionProps = ComponentPropsWithRef<"div"> & {
  transcript: Caption[];
  highlightedWords?: string[];
  position?: "bottom-center" | "bottom-left" | "center";
  startFrame?: number;
  switchCaptionsEveryMs?: number;
  showOverlay?: boolean;
};

export const TiktokCaptions: React.FC<CaptionProps> = ({
  transcript,
  highlightedWords = [],
  position = "bottom-center",
  startFrame = 0,
  switchCaptionsEveryMs = 1500,
  showOverlay = false,
  ref,
  ...rest
}) => {
  const { fps } = useVideoConfig();

  const { pages } = useMemo(
    () =>
      createTikTokStyleCaptions({
        captions: transcript,
        combineTokensWithinMilliseconds: switchCaptionsEveryMs,
      }),
    [transcript, switchCaptionsEveryMs],
  );

  return pages.map((page, index) => {
    const nextPage = pages[index + 1] ?? null;
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
};
