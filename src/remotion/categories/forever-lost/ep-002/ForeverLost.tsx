import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene0, SCENE_DURATION as SCENE0_DURATION } from "./scenes/scene0";
import { Scene1, SCENE_DURATION as SCENE1_DURATION } from "./scenes/scene1";
import { Scene2, SCENE_DURATION as SCENE2_DURATION } from "./scenes/scene2";
import { Scene3, SCENE_DURATION as SCENE3_DURATION } from "./scenes/scene3";
import { Scene4, SCENE_DURATION as SCENE4_DURATION } from "./scenes/scene4";

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
  SCENE3_DURATION +
  SCENE4_DURATION +
  BLACK_HOLD_FRAMES -
  4 * TRANSITION_DURATION;

export const ForeverLostEp2 = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={SCENE0_DURATION}>
        <Scene0 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={presentation}
        timing={timing}
      />
      <TransitionSeries.Sequence durationInFrames={SCENE1_DURATION}>
        <Scene1 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={presentation}
        timing={timing}
      />
      <TransitionSeries.Sequence durationInFrames={SCENE2_DURATION}>
        <Scene2 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={presentation}
        timing={timing}
      />
      <TransitionSeries.Sequence durationInFrames={SCENE3_DURATION}>
        <Scene3 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={presentation}
        timing={timing}
      />
      <TransitionSeries.Sequence durationInFrames={SCENE4_DURATION}>
        <Scene4 />
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
