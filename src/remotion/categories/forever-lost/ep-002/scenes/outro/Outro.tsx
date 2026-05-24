import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { AnimatedBanner } from "../../components";
import { C } from "../../constants";

export const Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const titleOpacity = interpolate(frame, [8, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const listOpacity = interpolate(frame, [28, 70], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const followOpacity = interpolate(frame, [58, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [Math.max(0, durationInFrames - 24), durationInFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <AbsoluteFill className="items-center justify-center" style={{ gap: 14 }}>
        <div className="font-bebas text-white" style={{ fontSize: 120, letterSpacing: 8, opacity: titleOpacity }}>
          FOREVER LOST
        </div>

        <div className="font-inter text-center" style={{ opacity: listOpacity }}>
          <div className="text-2xl text-toxicGreen">EP.01 · WHY THE TITANIC CAN NEVER BE RAISED ✓</div>
          <div className="mt-1 text-3xl font-semibold text-white">
            EP.02 · WHY CHERNOBYL'S CORE CAN NEVER BE REMOVED
          </div>
          <div className="mt-1 text-2xl text-white/45">EP.03 · THE VOYNICH MANUSCRIPT</div>
          <div className="mt-1 text-2xl text-white/45">EP.04 · DYATLOV PASS</div>
          <div className="mt-1 text-2xl text-white/45">EP.05 · THE PACIFIC GARBAGE PATCH</div>
        </div>

        <div className="font-bebas mt-5 text-toxicGreen" style={{ fontSize: 48, opacity: followOpacity }}>
          FOLLOW FOR MORE
        </div>
      </AbsoluteFill>

      <AnimatedBanner
        items={[
          "SUBSCRIBE",
          "NEW EPISODE EVERY WEEK",
          "FOREVER LOST",
          "DOCUMENTARIES OF THE IMPOSSIBLE",
        ]}
        bgColor={C.red}
        textColor={C.white}
        fontSize={18}
        speed={1.2}
        position="bottom"
      />

      <AbsoluteFill style={{ backgroundColor: C.bg, opacity: fadeOut }} />
    </AbsoluteFill>
  );
};
