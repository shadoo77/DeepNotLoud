import { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, AbsoluteFill } from "remotion";
import { createTikTokStyleCaptions } from "@remotion/captions";
import type { Caption, TikTokPage } from "@remotion/captions";
import { cn } from "@/lib/utils";

const SWITCH_CAPTIONS_EVERY_MS = 1200;
const LINES_PER_CHUNK = 2;
const HIGHLIGHT_BIAS_MS = 16;

interface LineCaptionsProps {
  transcript: Caption[];
  theme?: Record<string, string>;
  highlightedWords?: string[];
  startFrame?: number;
}

function chunkPages(pages: TikTokPage[], size: number): TikTokPage[][] {
  const chunks: TikTokPage[][] = [];
  for (let i = 0; i < pages.length; i += size) {
    chunks.push(pages.slice(i, i + size));
  }
  return chunks;
}

function getChunkStartMs(chunk: TikTokPage[]): number {
  return chunk[0].startMs;
}

const CaptionLine = ({
  page,
  episodeTimeMs,
}: {
  page: TikTokPage;
  episodeTimeMs: number;
}) => {
  return (
    <div className="w-full text-center">
      <div className="font-cause wrap-break-word text-4xl font-black tracking-wide whitespace-pre-wrap">
        {page.tokens.map((token) => {
          const isSpoken = token.toMs > token.fromMs;
          const isActive =
            isSpoken &&
            token.fromMs <= episodeTimeMs &&
            token.toMs >= episodeTimeMs;

          if (!isSpoken) {
            return (
              <span key={`punct-${token.fromMs}`} className="text-background">
                {token.text}
              </span>
            );
          }

          const style: React.CSSProperties = isActive
            ? {
                textShadow:
                  "0px 0px 15px oklch(80% 0.2 85 / 0.8), 2px 2px 0px oklch(0% 0 0)",
                transform: "scale(1.1)",
              }
            : {
                textShadow: "2px 2px 0px oklch(0% 0 0)",
                transform: "scale(1)",
              };

          return (
            <span
              key={token.fromMs}
              className={cn(
                "text-background inline-block",
                isActive && "text-gold",
              )}
              style={style}
            >
              {token.text}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export const LineCaptions: React.FC<LineCaptionsProps> = ({
  transcript,
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const { pages } = useMemo(
    () =>
      createTikTokStyleCaptions({
        captions: transcript,
        combineTokensWithinMilliseconds: SWITCH_CAPTIONS_EVERY_MS,
      }),
    [transcript],
  );

  const chunks = useMemo(() => chunkPages(pages, LINES_PER_CHUNK), [pages]);

  const episodeTimeMs =
    frame >= startFrame
      ? ((frame - startFrame) / fps) * 1000 - HIGHLIGHT_BIAS_MS
      : -1;

  if (!chunks.length || episodeTimeMs < 0) return null;

  let activeChunkIndex = chunks.length - 1;
  for (let i = 0; i < chunks.length; i++) {
    if (getChunkStartMs(chunks[i]) > episodeTimeMs) {
      activeChunkIndex = i - 1;
      break;
    }
  }

  if (activeChunkIndex < 0) return null;

  const activeChunk = chunks[activeChunkIndex];

  return (
    <AbsoluteFill className="flex flex-col items-center justify-end pb-24">
      <div className="flex w-full flex-col items-center gap-1 px-20">
        {activeChunk.map((page) => (
          <CaptionLine
            key={page.startMs}
            page={page}
            episodeTimeMs={episodeTimeMs}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
