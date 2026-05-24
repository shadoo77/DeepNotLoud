import { AbsoluteFill, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import {
  TransitionSeries,
  linearTiming,
  type TransitionPresentation,
  type TransitionTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { T, BLACK_HOLD_FRAMES, ASSET_PATH } from "./constants";
import { Scene1, SCENE_DURATION as S1_DURATION } from "./scenes/scene1-hook";
import { Scene2, SCENE_DURATION as S2_DURATION } from "./scenes/scene2-stats";
import { Scene3, SCENE_DURATION as S3_DURATION } from "./scenes/scene3-corium";
import {
  Scene4,
  SCENE_DURATION as S4_DURATION,
} from "./scenes/scene4-sarcophagus";
import {
  Scene5,
  SCENE_DURATION as S5_DURATION,
} from "./scenes/scene5-visual-only";
import {
  Scene6,
  SCENE_DURATION as S6_DURATION,
} from "./scenes/scene6-exclusion";
import { Scene7, SCENE_DURATION as S7_DURATION } from "./scenes/scene7-closer";

const SCENE_DURATIONS = [
  S1_DURATION,
  S2_DURATION,
  S3_DURATION,
  S4_DURATION,
  S5_DURATION,
  S6_DURATION,
  S7_DURATION,
];

const TOTAL_RAW = SCENE_DURATIONS.reduce((a, b) => a + b, 0);
const TRANSITION_OVERLAP = 6 * T.fade;
export const TOTAL_FRAMES = TOTAL_RAW - TRANSITION_OVERLAP + BLACK_HOLD_FRAMES;

const BlackFrame = () => <AbsoluteFill className="bg-ash" />;

const sceneComponents = [
  () => <Scene1 />,
  () => <Scene2 />,
  () => <Scene3 />,
  () => <Scene4 />,
  () => <Scene5 />,
  () => <Scene6 />,
  () => <Scene7 />,
];

function getTransition(index: number): {
  presentation: TransitionPresentation<Record<string, unknown>>;
  timing: TransitionTiming;
} {
  if (index === 2)
    return {
      presentation: slide({ direction: "from-right" }),
      timing: linearTiming({ durationInFrames: T.slide }),
    };
  if (index === 3)
    return {
      presentation: wipe({ direction: "from-top" }),
      timing: linearTiming({ durationInFrames: T.wipe }),
    };
  return {
    presentation: fade(),
    timing: linearTiming({ durationInFrames: T.fade }),
  };
}

export const ForeverLostEp2Shorts = () => {
  return (
    <AbsoluteFill className="bg-ash">
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/bgm/ep02_bgm.mp3`)}
        volume={(f) => {
          const s1End = SCENE_DURATIONS[0];
          const s2End = s1End + SCENE_DURATIONS[1];
          const s3End = s2End + SCENE_DURATIONS[2];
          const s4End = s3End + SCENE_DURATIONS[3];
          const s5End = s4End + SCENE_DURATIONS[4];
          if (f < s1End) return 0.35;
          if (f < s2End)
            return 0.35 + ((f - s1End) / SCENE_DURATIONS[1]) * 0.35;
          if (f < s3End) return 0.7;
          if (f < s5End) return 0.25;
          return Math.max(0, 0.25 - ((f - s5End) / SCENE_DURATIONS[5]) * 0.25);
        }}
      />

      <TransitionSeries>
        {sceneComponents.map((Component, i) => {
          const seq = (
            <TransitionSeries.Sequence
              key={`s${i}`}
              durationInFrames={SCENE_DURATIONS[i]}
              premountFor={30}
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
              presentation={getTransition(i).presentation}
              timing={getTransition(i).timing}
            />,
          ];
        })}
        <TransitionSeries.Sequence
          durationInFrames={T.fade + BLACK_HOLD_FRAMES}
          key="black-hold"
        >
          <BlackFrame />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
