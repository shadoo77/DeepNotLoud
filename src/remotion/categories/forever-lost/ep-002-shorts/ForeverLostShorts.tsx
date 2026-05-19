import { AbsoluteFill, Img, Sequence, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { ACT1_DURATION, ACT2_DURATION, ACT3_DURATION } from "./constants";
import { Act1_ImpossibleDepth } from "./acts/Act1_ImpossibleDepth";
import { Act2_ConsumingOcean } from "./acts/Act2_ConsumingOcean";
import { Act3_TheGrave } from "./acts/Act3_TheGrave";
import BgmWithFade from "./BgmWithFade";

export const TRANSITION_DURATION = 30;
export const BLACK_HOLD_FRAMES = 30;

const timing = linearTiming({ durationInFrames: TRANSITION_DURATION });
const presentation = fade();

const BlackFrame = () => (
  <AbsoluteFill className="bg-abyssBlack overflow-hidden" />
);

const TitanicNeverComingUp = () => (
  <AbsoluteFill>
    <Img
      src={staticFile(
        "assets/forever-lost/ep-002/images/short/Titanic... NEVER COMING UP-9:16.jpeg",
      )}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  </AbsoluteFill>
);

export const TOTAL_DURATION =
  ACT1_DURATION +
  ACT2_DURATION +
  ACT3_DURATION +
  6 +
  BLACK_HOLD_FRAMES -
  3 * TRANSITION_DURATION;

const totalFrames =
  6 +
  ACT1_DURATION +
  ACT2_DURATION +
  ACT3_DURATION +
  BLACK_HOLD_FRAMES -
  3 * TRANSITION_DURATION;

export const ForeverLostShorts = () => {
  return (
    <AbsoluteFill>
      <BgmWithFade totalFrames={totalFrames} />
      <TransitionSeries>
        {/* Combine Cold Open and Act 1 into one sequence */}
        <TransitionSeries.Sequence durationInFrames={6 + ACT1_DURATION}>
          <Sequence durationInFrames={6}>
            <TitanicNeverComingUp />
          </Sequence>
          <Sequence from={6} durationInFrames={ACT1_DURATION}>
            <Act1_ImpossibleDepth />
          </Sequence>
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
    </AbsoluteFill>
  );
};
