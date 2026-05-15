import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene2_Pressure } from "./Scene2_Pressure";
import { SCENE_DURATION } from "./constants";

export const FPS = 30;
export const TRANSITION_DURATION = 30;
export const BLACK_HOLD_FRAMES = 15;

const timing = linearTiming({ durationInFrames: TRANSITION_DURATION });
const presentation = fade();

const BlackFrame = () => (
  <AbsoluteFill className="bg-abyssBlack overflow-hidden" />
);

export const TOTAL_DURATION = SCENE_DURATION + BLACK_HOLD_FRAMES;

export const Scene2 = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={SCENE_DURATION}>
        <Scene2_Pressure />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={presentation}
        timing={timing}
      />
      <TransitionSeries.Sequence
        durationInFrames={TRANSITION_DURATION + BLACK_HOLD_FRAMES}
      >
        <BlackFrame />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
