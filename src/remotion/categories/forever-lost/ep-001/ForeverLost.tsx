import { Audio } from "@remotion/media";
import { AbsoluteFill, staticFile, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene01Hook } from "./scenes/Scene01_Hook";
import { Scene02Depth } from "./scenes/Scene02_Depth";
import { Scene03Pressure } from "./scenes/Scene03_Pressure";
import { Scene04Scale } from "./scenes/Scene04_Scale";
import { Scene05Fragility } from "./scenes/Scene05_Fragility";
import { Scene06Plans } from "./scenes/Scene06_Plans";
import { Scene07Outro } from "./scenes/Scene07_Outro";

export const FPS = 30;
export const SCENE_DURATIONS_SECONDS = [26, 36, 40, 44, 44, 50, 50] as const;
export const TRANSITION_DURATION = 15;
export const TOTAL_DURATION = Math.floor(
  SCENE_DURATIONS_SECONDS.reduce((a, b) => a + b, 0) * FPS -
    (SCENE_DURATIONS_SECONDS.length - 1) * TRANSITION_DURATION,
);

const sceneComponents = [
  Scene01Hook,
  Scene02Depth,
  Scene03Pressure,
  Scene04Scale,
  Scene05Fragility,
  Scene06Plans,
  Scene07Outro,
];

const timing = linearTiming({ durationInFrames: TRANSITION_DURATION });
const presentation = fade();

export const ForeverLost = () => {
  const { fps } = useVideoConfig();

  const sceneDurations = sceneComponents.map((_, i) =>
    Math.floor(SCENE_DURATIONS_SECONDS[i] * fps),
  );

  const offsets: number[] = [];
  let cumulative = 0;
  for (let i = 0; i < sceneDurations.length; i++) {
    offsets.push(cumulative);
    cumulative += sceneDurations[i] - TRANSITION_DURATION;
  }

  return (
    <AbsoluteFill>
      <Audio
        src={staticFile("assets/forever-lost/ep-001/sfx/deep-rumble.wav")}
        volume={0.15}
        loop
      />

      <TransitionSeries>
        {sceneComponents.flatMap((Component, i) => {
          const seq = (
            <TransitionSeries.Sequence
              key={`s${i}`}
              durationInFrames={sceneDurations[i]}
            >
              <Component offsetFrames={offsets[i]} />
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
      </TransitionSeries>
    </AbsoluteFill>
  );
};
