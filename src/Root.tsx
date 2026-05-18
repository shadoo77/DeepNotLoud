import "./index.css";
import { Composition, Folder } from "remotion";
import {
  ForeverLost,
  FPS,
  TOTAL_DURATION,
} from "@/remotion/categories/forever-lost/ep-001/ForeverLost";
import {
  ForeverLostEp2,
  TOTAL_DURATION as EP2_TOTAL_DURATION,
} from "@/remotion/categories/forever-lost/ep-002/ForeverLost";
import {
  ForeverLostShorts,
  TOTAL_DURATION as SHORTS_TOTAL_DURATION,
} from "@/remotion/categories/forever-lost/ep-002-shorts/ForeverLostShorts";

export function RemotionRoot() {
  return (
    <>
      <Folder name="Forever-Lost">
        <Composition
          id="ForeverLost"
          component={ForeverLost}
          durationInFrames={TOTAL_DURATION}
          fps={FPS}
          width={1280}
          height={720}
        />
        <Composition
          id="ForeverLost-Ep2"
          component={ForeverLostEp2}
          durationInFrames={EP2_TOTAL_DURATION}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="ForeverLost-Ep2-Shorts"
          component={ForeverLostShorts}
          durationInFrames={SHORTS_TOTAL_DURATION}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
    </>
  );
}
