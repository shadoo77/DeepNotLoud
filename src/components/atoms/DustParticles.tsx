import { useMemo } from "react";
import { useCurrentFrame, interpolate, Easing, random } from "remotion";

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

  const particles = useMemo<Particle[]>(() => {
    const seeds: Particle[] = [];
    for (let i = 0; i < count; i++) {
      seeds.push({
        x: random(i) * 1920,
        y: random(i + 1) * 1080,
        size: 1 + random(i + 2) * 3,
        speed: 0.1 + random(i + 3) * 0.3,
        drift: (random(i + 4) - 0.5) * 0.2,
        opacity: 0.1 + random(i + 5) * 0.4,
        delay: random(i + 6) * 2000,
      });
    }
    return seeds;
  }, [count]);

  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      {particles.map((p, i) => {
        const cycle = interpolate(
          Math.max(0, frame - p.delay),
          [0, 3000],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.linear,
          },
        );
        const x = p.x + cycle * p.drift * 100;
        const y = p.y - cycle * p.speed * 100;
        const fade = interpolate(
          Math.max(0, frame - p.delay),
          [0, 200, 2800, 3000],
          [0, p.opacity, p.opacity, 0],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

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
              backgroundColor: `rgba(255, 255, 255, ${fade})`,
              boxShadow: `0 0 ${p.size * 2}px rgba(200, 169, 110, ${fade * 0.3})`,
            }}
          />
        );
      })}
    </div>
  );
};
