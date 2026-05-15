import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1_Scale } from "./Scene1_Scale";
import { SCENE_DURATION } from "./constants";

export const FPS = 30;
export const TRANSITION_DURATION = 30;
export const BLACK_HOLD_FRAMES = 15;

const timing = linearTiming({ durationInFrames: TRANSITION_DURATION });
const presentation = fade();

const DeepNavyFrame = () => (
  <AbsoluteFill className="bg-deepNavy overflow-hidden" />
);

export const TOTAL_DURATION = SCENE_DURATION + BLACK_HOLD_FRAMES;

export const Scene1 = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
        <Scene1_Scale />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={presentation}
        timing={timing}
      />
      <TransitionSeries.Sequence
        durationInFrames={TRANSITION_DURATION + BLACK_HOLD_FRAMES}
      >
        <DeepNavyFrame />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
