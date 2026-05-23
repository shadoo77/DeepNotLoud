import "./index.css";
import { Composition, Folder } from "remotion";
import {
  ForeverLost,
  TOTAL_DURATION,
} from "@/remotion/categories/forever-lost/ep-001/ForeverLost";
import {
  ForeverLostShorts,
  TOTAL_DURATION as SHORTS_TOTAL_DURATION,
} from "@/remotion/categories/forever-lost/ep-001-shorts/ForeverLostShorts";
import {
  ForeverLostEp2Shorts,
  TOTAL_FRAMES as EP2_TOTAL_FRAMES,
} from "@/remotion/categories/forever-lost/ep-002-shorts/ForeverLostEp2Shorts";

import TestEp02 from "@/remotion/categories/forever-lost/ep-002-shorts/TestEp02";
import {
  FPS,
  WIDTH,
  HEIGHT,
  SCENES,
} from "@/remotion/categories/forever-lost/ep-002-shorts/constants";

export function RemotionRoot() {
  return (
    <>
      <Folder name="Forever-Lost">
        <Composition
          id="ForeverLost"
          component={ForeverLost}
          durationInFrames={TOTAL_DURATION}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="ForeverLost-Ep1-Shorts"
          component={ForeverLostShorts}
          durationInFrames={SHORTS_TOTAL_DURATION}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="ForeverLost-Ep2-Shorts"
          component={ForeverLostEp2Shorts}
          durationInFrames={EP2_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
        <Composition
          id="Test-ep02"
          component={TestEp02}
          durationInFrames={SCENES.s3.durationInFrames}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      </Folder>
    </>
  );
}
