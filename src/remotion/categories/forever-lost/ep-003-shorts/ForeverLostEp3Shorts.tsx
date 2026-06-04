import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { SCENES, TOTAL_FRAMES, T, C, ASSET_PATH } from "./constants";
import { Scene1Hook } from "./scenes/scene1-hook/Scene1Hook";
import { Scene2Discovery } from "./scenes/scene2-discovery/Scene2Discovery";
import { Scene3Stats } from "./scenes/scene3-stats/Scene3Stats";
import BgmWithFade from "@/components/atoms/BgmWithFade";

export { TOTAL_FRAMES };

export const ForeverLostEp3Shorts: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <BgmWithFade
        totalFrames={TOTAL_FRAMES}
        srcPath={`${ASSET_PATH}/audio/bgm/ep003_bgm_shorts.mp3`}
        volume={0.15}
        fadeInFrames={21}
        loop={false}
      />

      <TransitionSeries>
        <TransitionSeries.Sequence
          durationInFrames={SCENES.s1_hook.durationInFrames}
        >
          <Scene1Hook />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T.fade })}
        />

        <TransitionSeries.Sequence
          durationInFrames={SCENES.s2_discovery.durationInFrames}
        >
          <Scene2Discovery />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: T.fade })}
        />

        <TransitionSeries.Sequence
          durationInFrames={SCENES.s3_stats.durationInFrames}
        >
          <Scene3Stats />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
