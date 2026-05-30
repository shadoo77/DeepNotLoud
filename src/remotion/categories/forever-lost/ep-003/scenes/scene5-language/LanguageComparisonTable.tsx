import { interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cinzel";
import { loadFont as loadInterFont } from "@remotion/google-fonts/Inter";
import { C } from "@/remotion/categories/forever-lost/ep-003/constants";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

const { fontFamily: interFont } = loadInterFont("normal", {
  weights: ["400", "600"],
  subsets: ["latin"],
});

const ROWS = [
  {
    label: "LATIN",
    flag: "🇬🇧",
    script: "lorem ipsum...",
    entropy: true,
    wordLength: "4–6 chars",
    corrections: "Many",
  },
  {
    label: "ARABIC",
    flag: "🇸🇦",
    script: "بسم الله...",
    entropy: true,
    wordLength: "3–5 chars",
    corrections: "Some",
  },
  {
    label: "VOYNICH",
    flag: "📜",
    script: "ꝏ⊕Ꭾ⪽...",
    entropy: true,
    wordLength: "4–6 chars",
    corrections: "Almost none",
  },
];

export const LanguageComparisonTable: React.FC<{
  frame: number;
  fps: number;
  triggerFrame: number;
  highlightCorrections: number;
}> = ({ frame, fps, triggerFrame, highlightCorrections }) => {
  const opacity = interpolate(
    Math.max(0, frame - triggerFrame),
    [0, 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const highlightPulse = interpolate(
    Math.sin((Math.max(0, frame - highlightCorrections) * 0.12)),
    [-1, 1],
    [0.8, 1.2],
  );

  const highlightBgOpacity = interpolate(
    Math.max(0, frame - highlightCorrections),
    [0, 10, 1190, 1200],
    [0, 0.15, 0.15, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const highlightBorderOpacity = interpolate(
    Math.max(0, frame - highlightCorrections),
    [0, 10, 1190, 1200],
    [0, 0.4, 0.4, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      className="pointer-events-none absolute"
      style={{
        left: "5%",
        top: "12%",
        width: "90%",
        opacity,
      }}
    >
      <div
        className="rounded-xl px-6 pb-4 pt-3"
        style={{ backgroundColor: C.panel }}
      >
        {/* Header */}
        <div className="mb-3 grid grid-cols-4 gap-2 border-b border-gray-700 pb-2">
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ fontFamily: "Courier New", color: C.gold }}
          >
            Script
          </span>
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ fontFamily: "Courier New", color: C.gold }}
          >
            Entropy
          </span>
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ fontFamily: "Courier New", color: C.gold }}
          >
            Word Length
          </span>
          <span
            className="text-xs font-bold uppercase tracking-widest"
            style={{ fontFamily: "Courier New", color: C.gold }}
          >
            Corrections
          </span>
        </div>

        {/* Rows */}
        {ROWS.map((row, i) => {
          const rowDelay = triggerFrame + i * 40;
          const rowProgress = spring({
            frame: Math.max(0, frame - rowDelay),
            fps,
            config: { damping: 18, stiffness: 80 },
          });
          const rowX = interpolate(rowProgress, [0, 1], [-60, 0]);
          const rowOpacity = interpolate(rowProgress, [0, 0.3], [0, 1], {
            extrapolateRight: "clamp",
          });

          const isVoynich = i === 2;
          const showHighlight =
            isVoynich &&
            frame >= highlightCorrections &&
            frame < highlightCorrections + 1200;

          return (
            <div
              key={row.label}
              className="mt-3 grid grid-cols-4 items-center gap-2 rounded-lg px-3 py-2.5"
              style={{
                transform: `translateX(${rowX}px)`,
                opacity: rowOpacity,
                backgroundColor: isVoynich
                  ? `rgba(204,51,51,${highlightBgOpacity})`
                  : "transparent",
                border: isVoynich
                  ? `1px solid rgba(204,51,51,${highlightBorderOpacity})`
                  : "1px solid transparent",
              }}
            >
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 20 }}>{row.flag}</span>
                <span
                  className="text-base font-bold"
                  style={{ fontFamily: cinzelFont, color: C.white }}
                >
                  {row.label}
                </span>
              </div>

              <span
                className="flex items-center gap-1.5 text-sm"
                style={{ fontFamily: interFont, color: C.gray }}
              >
                <span
                  className="inline-flex size-5 items-center justify-center rounded-full"
                  style={{ backgroundColor: "rgba(76,175,80,0.2)", color: "#4CAF50" }}
                >
                  ✓
                </span>
                Normal
              </span>

              <span
                className="text-sm"
                style={{ fontFamily: interFont, color: C.white }}
              >
                {row.wordLength}
              </span>

              <span
                className="text-sm"
                style={{
                  fontFamily: interFont,
                  color: showHighlight ? C.white : C.gray,
                }}
              >
                {showHighlight ? (
                  <span
                    className="inline-block rounded-md px-2 py-1 text-sm font-bold"
                    style={{
                      backgroundColor: C.red,
                      color: C.white,
                      transform: `scale(${highlightPulse})`,
                    }}
                  >
                    ALMOST NONE
                  </span>
                ) : (
                  row.corrections
                )}
              </span>
            </div>
          );
        })}

        {/* Conclusion row */}
        <div
          className="mt-3 rounded-lg border border-gray-700 px-4 py-3 text-center"
          style={{
            opacity: interpolate(
              Math.max(0, frame - (triggerFrame + 160)),
              [0, 25],
              [0, 1],
              { extrapolateRight: "clamp" },
            ),
            transform: `translateY(${
              interpolate(
                Math.max(0, frame - (triggerFrame + 160)),
                [0, 25],
                [30, 0],
                { extrapolateRight: "clamp" },
              )
            }px)`,
          }}
        >
          <span
            className="text-lg font-bold tracking-wide"
            style={{ fontFamily: cinzelFont, color: C.gold }}
          >
            Matches real language — but isn't one we know
          </span>
        </div>
      </div>
    </div>
  );
};
