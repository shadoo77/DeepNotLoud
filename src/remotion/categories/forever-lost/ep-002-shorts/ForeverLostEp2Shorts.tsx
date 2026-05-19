import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import {
  ESTIMATED_DURATIONS,
  TRANSITION_DURATION,
  BLACK_HOLD_FRAMES,
  FPS,
} from "./constants";
import { Scene0, SCENE_DURATION as SCENE0_DURATION } from "./scenes/scene0";

const SCENE_DURATIONS = [
  SCENE0_DURATION,
  ...Object.values(ESTIMATED_DURATIONS)
    .slice(1)
    .map((s) => s * FPS),
];

const timing = linearTiming({ durationInFrames: TRANSITION_DURATION });
const presentation = fade();

const BlackFrame = () => (
  <AbsoluteFill className="bg-abyssBlack overflow-hidden" />
);

const ScenePlaceholder = ({ label }: { label: string }) => (
  <AbsoluteFill className="bg-abyssBlack items-center justify-center">
    <div className="font-inter text-biolumTeal text-4xl font-bold opacity-60">
      {label}
    </div>
  </AbsoluteFill>
);

const sceneLabels = [
  "April 26, 1986",
  "What the Core Became",
  "Physically Inaccessible",
  "The Cage Cannot Be Opened",
  "A 20,000-Year Grave",
];

const sceneComponents: (() => React.ReactNode)[] = [
  () => <Scene0 />,
  () => <ScenePlaceholder label={sceneLabels[0]} />,
  () => <ScenePlaceholder label={sceneLabels[1]} />,
  () => <ScenePlaceholder label={sceneLabels[2]} />,
  () => <ScenePlaceholder label={sceneLabels[3]} />,
  () => <ScenePlaceholder label={sceneLabels[4]} />,
];

export const ForeverLostEp2Shorts = () => {
  return (
    <TransitionSeries>
      {sceneComponents.map((Component, i) => {
        const seq = (
          <TransitionSeries.Sequence
            key={`s${i}`}
            durationInFrames={SCENE_DURATIONS[i]}
          >
            <Component />
          </TransitionSeries.Sequence>
        );
        if (i === sceneComponents.length - 1) {
          return [seq];
        }
        return [
          seq,
          <TransitionSeries.Transition
            key={`t${i}`}
            presentation={presentation}
            timing={timing}
          />,
        ];
      })}
      <TransitionSeries.Sequence
        durationInFrames={TRANSITION_DURATION + BLACK_HOLD_FRAMES}
      >
        <BlackFrame />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};

export const FPS_OUT = FPS;
export const TOTAL_DURATION_OUT =
  SCENE_DURATIONS.reduce((a, b) => a + b, 0) +
  BLACK_HOLD_FRAMES -
  6 * TRANSITION_DURATION;
