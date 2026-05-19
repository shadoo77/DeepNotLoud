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
  TOTAL_DURATION_OUT as EP2_TOTAL_DURATION,
} from "@/remotion/categories/forever-lost/ep-002/ForeverLostEp2";

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
          id="ForeverLost-Ep2"
          component={ForeverLostEp2}
          durationInFrames={EP2_TOTAL_DURATION}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
    </>
  );
}
