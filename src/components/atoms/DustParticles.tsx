import { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, interpolate, random } from "remotion";

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  drift: number;
  opacity: number;
  delay: number;
}

export const DustParticles: React.FC<{ count?: number }> = ({ count = 40 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const particles = useMemo<Particle[]>(() => {
    const seeds: Particle[] = [];
    for (let i = 0; i < count; i++) {
      seeds.push({
        x: random(`dust-x-${i}`) * width,
        y: random(`dust-y-${i}`) * height,
        size: 1.5 + random(`dust-size-${i}`) * 3,
        speed: 0.3 + random(`dust-speed-${i}`) * 0.8, // 9 to 24 pixels per second
        drift: (random(`dust-drift-${i}`) - 0.5) * 0.3,
        opacity: 0.3 + random(`dust-opacity-${i}`) * 0.5,
        delay: Math.floor(random(`dust-delay-${i}`) * 120), // max 4 second delay
      });
    }
    return seeds;
  }, [count, width, height]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {particles.map((p, i) => {
        const activeFrame = Math.max(0, frame - p.delay);

        // 1. Y Position: Float up continuously and wrap around seamlessly
        const rawY = p.y - activeFrame * p.speed;
        const y = ((rawY % height) + height) % height;

        // 2. X Position: Gentle side-to-side sine wave sway
        const x = p.x + Math.sin(activeFrame * 0.02 + i) * 20 * p.drift;

        // 3. Opacity: Fade in at start, fade out at top/bottom edges so they don't "pop"
        const fadeIn = interpolate(activeFrame, [0, 30], [0, p.opacity], {
          extrapolateRight: "clamp",
        });
        const fadeTop = interpolate(y, [0, 60], [0, 1], {
          extrapolateRight: "clamp",
        });
        const fadeBottom = interpolate(y, [height - 60, height], [1, 0], {
          extrapolateLeft: "clamp",
        });

        const finalOpacity = Math.min(fadeIn, fadeTop, fadeBottom);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: `rgba(200, 169, 110, ${finalOpacity})`,
              boxShadow: `0 0 ${p.size * 2}px rgba(200, 169, 110, ${finalOpacity * 0.4})`,
            }}
          />
        );
      })}
    </div>
  );
};
