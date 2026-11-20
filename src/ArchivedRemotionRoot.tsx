import { Composition } from "remotion";
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
  TransitionSeriesSanity,
  TOTAL_FRAMES as TRANSITION_SANITY_FRAMES,
} from "@/remotion/debug/TransitionSeriesSanity";

export function ArchivedRemotionRoot() {
  return (
    <>
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
        id="TransitionSeries-Sanity"
        component={TransitionSeriesSanity}
        durationInFrames={TRANSITION_SANITY_FRAMES}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
}
