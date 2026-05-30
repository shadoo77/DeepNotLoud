import { interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Cinzel";
import { loadFont as loadInterFont } from "@remotion/google-fonts/Inter";

const { fontFamily: cinzelFont } = loadFont("normal", {
  weights: ["400", "700"],
  subsets: ["latin"],
});

const { fontFamily: interFont } = loadInterFont("normal", {
  weights: ["400", "600"],
  subsets: ["latin"],
});

type TheoryCard = {
  number: number;
  title: string;
  description: string;
  color: string;
  triggerFrame: number;
  nextTriggerFrame: number;
};

export const TheoryCards: React.FC<{
  frame: number;
  fps: number;
  cards: TheoryCard[];
}> = ({ frame, fps, cards }) => {
  return (
    <div
      className="pointer-events-none absolute"
      style={{ left: "5%", width: "55%", top: 60 }}
    >
      {cards.map((card) => {
        const local = Math.max(0, frame - card.triggerFrame);

        const slide = spring({
          frame: local,
          fps,
          config: { damping: 14, stiffness: 120 },
        });
        const x = interpolate(slide, [0, 1], [-500, 0]);
        const entryOpacity = interpolate(local, [0, 20], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

        const exitStart = Math.max(0, frame - (card.nextTriggerFrame - 30));
        const exitOpacity = Number.isFinite(card.nextTriggerFrame)
          ? interpolate(exitStart, [0, 30], [1, 0.3], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          : 1;

        const watermarkSpring = spring({
          frame: Math.max(0, local - 5),
          fps,
          config: { damping: 10, stiffness: 80 },
        });
        const watermarkScale = interpolate(watermarkSpring, [0, 1], [0.5, 1]);
        const watermarkOpacity = interpolate(
          watermarkSpring,
          [0, 1],
          [0, 0.12],
        );

        const y = 70 + (card.number - 1) * 155;

        return (
          <div
            key={card.number}
            className="absolute overflow-hidden rounded-lg"
            style={{
              top: y,
              left: 0,
              right: 0,
              transform: `translateX(${x}px)`,
              opacity: entryOpacity * exitOpacity,
              backgroundColor: "rgba(10,10,10,0.90)",
              borderLeft: `6px solid ${card.color}`,
            }}
          >
            {/* Watermark number */}
            <span
              className="pointer-events-none absolute select-none"
              style={{
                fontFamily: cinzelFont,
                fontSize: 100,
                fontWeight: 900,
                color: card.color,
                opacity: watermarkOpacity,
                transform: `scale(${watermarkScale})`,
                right: 16,
                top: -8,
                lineHeight: 1,
              }}
            >
              {card.number}
            </span>

            <div className="px-6 py-4">
              <div
                className="text-4xl font-bold tracking-wider"
                style={{ fontFamily: cinzelFont, color: card.color }}
              >
                {card.title}
              </div>
              <div
                className="mt-1 text-2xl leading-snug"
                style={{ fontFamily: interFont, color: "#AAAAAA" }}
              >
                {card.description}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
