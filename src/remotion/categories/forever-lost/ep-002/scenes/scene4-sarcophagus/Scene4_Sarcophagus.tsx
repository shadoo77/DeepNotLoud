import {
  AbsoluteFill,
  Img,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  staticFile,
} from "remotion";
import { Audio } from "@remotion/media";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";
import { getPhraseFrames } from "@/lib/utils";
import {
  DataTicker,
  LowerThird,
  ProgressBar,
  AnimatedBanner,
} from "../../components";
import { ASSET_PATH, C } from "../../constants";
import { TRASCRIPT_DATA, VO_START_FRAME } from "./constants";

export const Scene4Sarcophagus: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const frameRadiation = getPhraseFrames({
    phrase: "10000 roentgens per hour",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  }).from;

  const frameFatal = getPhraseFrames({
    phrase: "less than a minute",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  }).from;

  const frameElectronics = getPhraseFrames({
    phrase: "disables electronics within hours",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  }).from;

  const frameBillion = getPhraseFrames({
    phrase: "$1.5 billion",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  }).from;

  const frame100Years = getPhraseFrames({
    phrase: "100 years",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: VO_START_FRAME,
  }).from;

  const leftPanelWidthPct = interpolate(frame, [0, 45], [0, 35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const rightPanelWidthPct = interpolate(frame, [0, 45], [100, 65], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const leftPanelOpacity = interpolate(frame, [0, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const parallaxY = interpolate(frame, [0, 45], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const centerBillionsPop = spring({
    fps,
    frame: Math.max(0, frame - frameBillion),
    config: { damping: 14, stiffness: 180 },
  });

  const lifespanPop = spring({
    fps,
    frame: Math.max(0, frame - frame100Years),
    config: { damping: 14, stiffness: 180 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Sequence from={5} durationInFrames={12}>
        <Audio
          src={staticFile(`${ASSET_PATH}/audio/sfx/metal_groan.wav`)}
          volume={0.45}
        />
      </Sequence>

      <Audio
        src={staticFile(`${ASSET_PATH}/audio/sfx/radiation_hum.wav`)}
        volume={0.12}
        loop
      />
      <Audio src={staticFile(`${ASSET_PATH}/audio/vo/ep02L_s4.wav`)} />

      {/* Right image panel */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: `${rightPanelWidthPct}%`,
          height: "100%",
          transform: `translateY(${parallaxY}px)`,
        }}
      >
        <Img
          src={staticFile(`${ASSET_PATH}/images/ep02L_s4_sarcophagus.jpeg`)}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Left data panel */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: `${leftPanelWidthPct}%`,
          height: "100%",
          background:
            "linear-gradient(to right, rgba(0,0,0,0.88), rgba(0,0,0,0.72), rgba(0,0,0,0.45))",
          padding: "150px 34px 120px",
          opacity: leftPanelOpacity,
          transform: `translateX(${interpolate(frame, [0, 45], [-20, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}px)`,
        }}
      >
        <div className="rounded-xl border border-white/15 bg-black/25 p-5">
          <div className="font-inter text-sm tracking-[0.16em] text-white/70">
            CURRENT RADIATION INSIDE
          </div>
          <div className="mt-2 leading-none">
            <DataTicker
              to={10000}
              startFrame={frameRadiation}
              duration={55}
              suffix=" R/hr"
              fontSize={64}
              color={C.green}
            />
          </div>

          <div className="mt-7">
            <ProgressBar
              startFrame={frameFatal}
              duration={45}
              fillColor={C.red}
              width={520}
              label="FATAL TO HUMANS IN <60 SECONDS"
            />
          </div>
          <div className="mt-6">
            <ProgressBar
              startFrame={frameElectronics}
              duration={45}
              fillColor={C.green}
              width={520}
              label="DISABLES ELECTRONICS IN <HOURS>"
            />
          </div>
        </div>
      </div>

      <LowerThird
        title="NEW SAFE CONFINEMENT"
        subtitle="Commissioned 2016 · $1.5B USD"
        startFrame={30}
      />

      {/* Center callouts */}
      <div
        className="absolute top-[34%] left-1/2 -translate-x-1/2 rounded-lg border border-white/25 px-8 py-4"
        style={{
          backgroundColor: "rgba(17,17,17,0.74)",
          opacity: interpolate(
            frame,
            [frameBillion, frameBillion + 18],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
          transform: `translateX(-50%) scale(${centerBillionsPop})`,
        }}
      >
        <div
          className="font-bebas text-center text-white"
          style={{ fontSize: 120, lineHeight: 1 }}
        >
          $1.5 BILLION
        </div>
      </div>

      <div
        className="border-bloodRed absolute top-[49%] left-1/2 -translate-x-1/2 rounded-md border px-6 py-3"
        style={{
          backgroundColor: "rgba(17,17,17,0.78)",
          opacity: interpolate(
            frame,
            [frame100Years, frame100Years + 18],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
          transform: `translateX(-50%) scale(${lifespanPop})`,
        }}
      >
        <div
          className="font-bebas text-bloodRed text-center"
          style={{ fontSize: 72, lineHeight: 1 }}
        >
          100-YEAR LIFESPAN
        </div>
      </div>

      <YouTubeCaptions
        transcript={TRASCRIPT_DATA}
        highlightedWords={[
          "10000",
          "minute",
          "hours",
          "tomb",
          "2016",
          "100",
          "years",
        ]}
        position="bottom-center"
        startFrame={0}
        mode="sentence"
        showOverlay
      />

      <AnimatedBanner
        items={[
          "NO ROBOT CAN SURVIVE INSIDE",
          "10,000 RONTGEN/HOUR",
          "ELECTRONICS FAIL WITHIN HOURS",
        ]}
        bgColor={C.red}
        textColor={C.white}
        fontSize={18}
        position="bottom"
        speed={1.2}
      />
    </AbsoluteFill>
  );
};
