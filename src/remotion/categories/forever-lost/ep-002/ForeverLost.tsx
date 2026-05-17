import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene0, SCENE_DURATION as SCENE0_DURATION } from "./scenes/scene0";
import { Scene1, SCENE_DURATION as SCENE1_DURATION } from "./scenes/scene1";
import { Scene2, SCENE_DURATION as SCENE2_DURATION } from "./scenes/scene2";
import { Scene3, SCENE_DURATION as SCENE3_DURATION } from "./scenes/scene3";
import { Scene4, SCENE_DURATION as SCENE4_DURATION } from "./scenes/scene4";
import { Scene5, SCENE_DURATION as SCENE5_DURATION } from "./scenes/scene5";
import { Scene6, SCENE_DURATION as SCENE6_DURATION } from "./scenes/scene6";
import { Scene7, SCENE_DURATION as SCENE7_DURATION } from "./scenes/scene7";

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
  SCENE5_DURATION +
  SCENE6_DURATION +
  SCENE7_DURATION +
  BLACK_HOLD_FRAMES -
  8 * TRANSITION_DURATION;

export const ForeverLostEp2 = () => {
  return (
    <TransitionSeries>
      {/* Scene 0 */}
      <TransitionSeries.Sequence durationInFrames={SCENE0_DURATION}>
        <Scene0 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={presentation}
        timing={timing}
      />
      {/* Scene 1 */}
      <TransitionSeries.Sequence durationInFrames={SCENE1_DURATION}>
        <Scene1 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={presentation}
        timing={timing}
      />
      {/* Scene 2 */}
      <TransitionSeries.Sequence durationInFrames={SCENE2_DURATION}>
        <Scene2 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={presentation}
        timing={timing}
      />
      {/* Scene 3 */}
      <TransitionSeries.Sequence durationInFrames={SCENE3_DURATION}>
        <Scene3 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={presentation}
        timing={timing}
      />
      {/* Scene 4 */}
      <TransitionSeries.Sequence durationInFrames={SCENE4_DURATION}>
        <Scene4 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={presentation}
        timing={timing}
      />
      {/* Scene 5 */}
      <TransitionSeries.Sequence durationInFrames={SCENE5_DURATION}>
        <Scene5 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={presentation}
        timing={timing}
      />
      {/* Scene 6 */}
      <TransitionSeries.Sequence durationInFrames={SCENE6_DURATION}>
        <Scene6 />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={presentation}
        timing={timing}
      />
      {/* Scene 7 */}
      <TransitionSeries.Sequence durationInFrames={SCENE7_DURATION}>
        <Scene7 />
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
