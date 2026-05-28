import { useCurrentFrame } from "remotion";

const TICKER_TEXT =
  "BEINECKE RARE BOOK LIBRARY · YALE UNIVERSITY · MS 408 · CARBON DATED: 1404–1438 CE · PAGES: 240 · STATUS: UNDECIPHERED · LANGUAGE: UNKNOWN · ESTIMATED VALUE: $100M+ · ";

// Courier New at 18px is roughly 10.8 pixels per character
const CHAR_WIDTH = 10.8;
const TEXT_BLOCK_WIDTH = Math.ceil(TICKER_TEXT.length * CHAR_WIDTH); // ~1437 pixels

export const TickerBar: React.FC<{ opacity?: number; color?: string }> = ({
  opacity = 1,
  color = "#C8A96E",
}) => {
  const frame = useCurrentFrame();

  // Speed: 2 pixels per frame at 30 FPS means 60 pixels per second,
  // so one full loop (1437px) takes about 24 seconds, which is a comfortable
  // reading speed for a ticker.
  const SPEED = 2;

  // Loop the offset precisely when one full block of text has scrolled by
  const offset = -(frame * SPEED) % TEXT_BLOCK_WIDTH;

  return (
    <div
      className="pointer-events-none absolute right-0 bottom-0 left-0 flex h-[42px] items-center overflow-hidden"
      style={{
        backgroundColor: "rgba(0,0,0,0.75)",
        borderTop: `1px solid ${color}`,
        opacity,
      }}
    >
      <div
        className="text-lg whitespace-nowrap"
        style={{
          fontFamily: "Courier New, monospace",
          color,
          transform: `translateX(${offset}px)`,
          willChange: "transform",
        }}
      >
        {TICKER_TEXT.repeat(10)}
      </div>
    </div>
  );
};
