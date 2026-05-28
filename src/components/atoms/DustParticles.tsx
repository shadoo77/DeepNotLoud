import { useMemo } from "react";
import {
  useCurrentFrame,
  interpolate,
  Easing,
  random,
  useVideoConfig,
} from "remotion";

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
      const r = () => random(null);
      seeds.push({
        x: r() * width,
        y: r() * height,
        size: 2 + r() * 4,
        speed: 0.05 + r() * 0.15,
        drift: (r() - 0.5) * 0.1,
        opacity: 0.3 + r() * 0.4,
        delay: Math.floor(r() * 3000),
      });
    }
    return seeds;
  }, [count, width, height]);

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
        const y = (((p.y - cycle * p.speed * 1000) % height) + height) % height;
        const fade = interpolate(
          Math.max(0, frame - p.delay),
          [0, 300, 2700, 3000],
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
              backgroundColor: `rgba(200, 169, 110, ${fade})`,
              boxShadow: `0 0 ${p.size * 2}px rgba(200, 169, 110, ${fade * 0.2})`,
            }}
          />
        );
      })}
    </div>
  );
};
