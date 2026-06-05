import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";

const A_DURATION = 60;
const B_DURATION = 60;
const FADE_DURATION = 20;

export const TOTAL_FRAMES = A_DURATION + B_DURATION - FADE_DURATION;

const Card: React.FC<{ label: string; color: string }> = ({ label, color }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: color,
        alignItems: "center",
        justifyContent: "center",
        fontSize: 160,
        fontWeight: 800,
        color: "white",
      }}
    >
      {label}
    </AbsoluteFill>
  );
};

export const TransitionSeriesSanity: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={A_DURATION}>
        <Card label="A" color="#14532d" />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: FADE_DURATION })}
      />
      <TransitionSeries.Sequence durationInFrames={B_DURATION}>
          <Card label="B" color="#1e3a8a" />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
