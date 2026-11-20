import { AbsoluteFill } from "remotion";
import { Audio } from "@remotion/media";
import { staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SCENES, TOTAL_FRAMES, T, C, ASSET_PATH } from "./constants";
import { SHORTS_WAV } from "./vo-offsets";
import { S01Hook } from "./scenes/s01-hook/S01Hook";
import { S02Setup } from "./scenes/s02-setup/S02Setup";
import { S03Stats } from "./scenes/s03-stats/S03Stats";
import { S04Tent } from "./scenes/s04-tent/S04Tent";
import { S05Bodies } from "./scenes/s05-bodies/S05Bodies";
import { S06Unexplained } from "./scenes/s06-unexplained/S06Unexplained";
import { S07Closer } from "./scenes/s07-closer/S07Closer";
import BgmWithFade from "@/components/atoms/BgmWithFade";

export { TOTAL_FRAMES };

const timing = linearTiming({ durationInFrames: T.fade });
const presentation = fade();

export const ForeverLostEp4Shorts: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Audio src={staticFile(SHORTS_WAV)} volume={1} trimBefore={8} />

      <BgmWithFade
        totalFrames={TOTAL_FRAMES}
        srcPath={`${ASSET_PATH}/audio/bgm/ep004-shorts-bgm.mp3`}
        volume={0.15}
        fadeInFrames={21}
        loop={false}
      />

      <TransitionSeries>
        <TransitionSeries.Sequence
          durationInFrames={SCENES.s1_hook.durationInFrames}
          premountFor={30}
        >
          <S01Hook />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={presentation}
          timing={timing}
        />

        <TransitionSeries.Sequence
          durationInFrames={SCENES.s2_setup.durationInFrames}
          premountFor={30}
        >
          <S02Setup />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={presentation}
          timing={timing}
        />

        <TransitionSeries.Sequence
          durationInFrames={SCENES.s3_stats.durationInFrames}
          premountFor={30}
        >
          <S03Stats />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={presentation}
          timing={timing}
        />

        <TransitionSeries.Sequence
          durationInFrames={SCENES.s4_tent.durationInFrames}
          premountFor={30}
        >
          <S04Tent />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={presentation}
          timing={timing}
        />

        <TransitionSeries.Sequence
          durationInFrames={SCENES.s5_bodies.durationInFrames}
          premountFor={30}
        >
          <S05Bodies />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={presentation}
          timing={timing}
        />

        <TransitionSeries.Sequence
          durationInFrames={SCENES.s6_unexplained.durationInFrames}
          premountFor={30}
        >
          <S06Unexplained />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={presentation}
          timing={timing}
        />

        <TransitionSeries.Sequence
          durationInFrames={SCENES.s7_closer.durationInFrames}
          premountFor={30}
        >
          <S07Closer />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
