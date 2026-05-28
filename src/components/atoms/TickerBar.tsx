import { useCurrentFrame } from "remotion";

const TICKER_TEXT =
  "BEINECKE RARE BOOK LIBRARY · YALE UNIVERSITY · MS 408 · CARBON DATED: 1404–1438 CE · PAGES: 240 · STATUS: UNDECIPHERED · LANGUAGE: UNKNOWN · ESTIMATED VALUE: $100M+ · ";

export const TickerBar: React.FC<{ opacity?: number; color?: string }> = ({
  opacity = 1,
  color = "#C8A96E",
}) => {
  const frame = useCurrentFrame();
  const SPEED = 2.67;
  const offset = -(frame * SPEED) % (TICKER_TEXT.length * 10);

  return (
    <div
      className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-center overflow-hidden"
      style={{
        height: 36,
        backgroundColor: "rgba(0,0,0,0.70)",
        borderTop: `1px solid ${color}`,
        opacity,
      }}
    >
      <div
        style={{
          whiteSpace: "nowrap",
          fontFamily: "Courier New, monospace",
          fontSize: 16,
          color,
          transform: `translateX(${offset}px)`,
          paddingLeft: 1920,
        }}
      >
        {TICKER_TEXT.repeat(5)}
      </div>
    </div>
  );
};
