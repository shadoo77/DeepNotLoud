import "./index.css";
import { Composition, Folder } from "remotion";
// import { ArchivedRemotionRoot } from "@/ArchivedRemotionRoot";
import {
  ForeverLostEp3,
  TOTAL_FRAMES as EP3_TOTAL_FRAMES,
} from "@/remotion/categories/forever-lost/ep-003/ForeverLostEp3";
import {
  ForeverLostEp3Shorts,
  TOTAL_FRAMES as EP3_SHORTS_TOTAL_FRAMES,
} from "@/remotion/categories/forever-lost/ep-003-shorts/ForeverLostEp3Shorts";

export function RemotionRoot() {
  return (
    <>
      <Folder name="Forever-Lost">
        {/* <ArchivedRemotionRoot /> */}
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
