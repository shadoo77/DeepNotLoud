import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { ACT1_DURATION, ACT2_DURATION, ACT3_DURATION } from "./constants";
import { Act1_ImpossibleDepth } from "./acts/Act1_ImpossibleDepth";
import { Act2_ConsumingOcean } from "./acts/Act2_ConsumingOcean";
import { Act3_TheGrave } from "./acts/Act3_TheGrave";

export const TRANSITION_DURATION = 90;
export const BLACK_HOLD_FRAMES = 15;

const timing = linearTiming({ durationInFrames: TRANSITION_DURATION });
const presentation = fade();

const BlackFrame = () => (
  <AbsoluteFill className="bg-abyssBlack overflow-hidden" />
);

export const TOTAL_DURATION =
  ACT1_DURATION +
  ACT2_DURATION +
  ACT3_DURATION +
  BLACK_HOLD_FRAMES -
  3 * TRANSITION_DURATION;

export const ForeverLostShorts = () => {
  return (
    <TransitionSeries>
      {/* Act 1 */}
      <TransitionSeries.Sequence durationInFrames={ACT1_DURATION}>
        <Act1_ImpossibleDepth />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={presentation}
        timing={timing}
      />
      {/* Act 2 */}
      <TransitionSeries.Sequence durationInFrames={ACT2_DURATION}>
        <Act2_ConsumingOcean />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={presentation}
        timing={timing}
      />
      {/* Act 3 */}
      <TransitionSeries.Sequence durationInFrames={ACT3_DURATION}>
        <Act3_TheGrave />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={presentation}
        timing={timing}
      />
      {/* Final Black Frame Hold */}
      <TransitionSeries.Sequence
        durationInFrames={TRANSITION_DURATION + BLACK_HOLD_FRAMES}
      >
        <BlackFrame />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
