import { AbsoluteFill, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries } from "@remotion/transitions";
import { SCENES, TOTAL_FRAMES, C, ASSET_PATH } from "./constants";
import { Scene1Hook } from "./scenes/scene1-hook/Scene1Hook";

export { TOTAL_FRAMES };

export const ForeverLostEp3Shorts: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/bgm/ep003_bgm_shorts.mp3`)}
        volume={0.15}
        loop
      />

      <TransitionSeries>
        <TransitionSeries.Sequence
          durationInFrames={SCENES.s1_hook.durationInFrames}
        >
          <Scene1Hook />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
