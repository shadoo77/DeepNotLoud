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
  ForeverLostEp2,
  TOTAL_FRAMES as EP2_LANDSCAPE_TOTAL_FRAMES,
} from "@/remotion/categories/forever-lost/ep-002/ForeverLostEp2";
import {
  ForeverLostEp2Shorts,
  TOTAL_FRAMES as EP2_SHORTS_TOTAL_FRAMES,
} from "@/remotion/categories/forever-lost/ep-002-shorts/ForeverLostEp2Shorts";
import {
  ForeverLostEp3,
  TOTAL_FRAMES as EP3_TOTAL_FRAMES,
} from "@/remotion/categories/forever-lost/ep-003/ForeverLostEp3";
import {
  ForeverLostEp3Shorts,
  TOTAL_FRAMES as EP3_SHORTS_TOTAL_FRAMES,
} from "@/remotion/categories/forever-lost/ep-003-shorts/ForeverLostEp3Shorts";

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
          id="ForeverLost-Ep2-Landscape"
          component={ForeverLostEp2}
          durationInFrames={EP2_LANDSCAPE_TOTAL_FRAMES}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="ForeverLost-Ep2-Shorts"
          component={ForeverLostEp2Shorts}
          durationInFrames={EP2_SHORTS_TOTAL_FRAMES}
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
        <Composition
          id="ForeverLost-Ep3-Landscape"
          component={ForeverLostEp3}
          durationInFrames={EP3_TOTAL_FRAMES}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="ForeverLost-Ep3-Shorts"
          component={ForeverLostEp3Shorts}
          durationInFrames={EP3_SHORTS_TOTAL_FRAMES}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
    </>
  );
}
