import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene0_ColdOpen } from "./scenes/scene0/Scene0_ColdOpen";
import { SCENE_DURATION as SCENE0_DURATION } from "./scenes/scene0/constants";
import { Scene1_Scale } from "./scenes/scene1/Scene1_Scale";
import { SCENE_DURATION as SCENE1_DURATION } from "./scenes/scene1/constants";
import { Scene2_Pressure } from "./scenes/scene2/Scene2_Pressure";
import { SCENE_DURATION as SCENE2_DURATION } from "./scenes/scene2/constants";

export const FPS = 30;
export const TRANSITION_DURATION = 30;
export const BLACK_HOLD_FRAMES = 15;

const timing = linearTiming({ durationInFrames: TRANSITION_DURATION });
const presentation = fade();

const BlackFrame = () => (
  <AbsoluteFill className="bg-abyssBlack overflow-hidden" />
);

export const TOTAL_DURATION =
  SCENE0_DURATION +
  SCENE1_DURATION +
  SCENE2_DURATION +
  BLACK_HOLD_FRAMES -
  2 * TRANSITION_DURATION;

export const ForeverLostEp2 = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={SCENE0_DURATION}>
        <Scene0_ColdOpen />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={presentation}
        timing={timing}
      />
      <TransitionSeries.Sequence durationInFrames={SCENE1_DURATION}>
        <Scene1_Scale />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={presentation}
        timing={timing}
      />
      <TransitionSeries.Sequence durationInFrames={SCENE2_DURATION}>
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
