import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
  staticFile,
} from "remotion";
import { Audio } from "@remotion/media";
import { YouTubeCaptions } from "@/components/atoms/YouTubeCaptions";
import { getPhraseFrames } from "@/lib/utils";
import {
  AnimatedBanner,
  DataTicker,
  KineticText,
  LowerThird,
} from "../../components";
import { ASSET_PATH, C } from "../../constants";
import { TRASCRIPT_DATA } from "./constants";

const KINETIC_TEXT =
  "When reactor four exploded, it released four hundred times the radiation of the Hiroshima bomb. Two hundred tonnes of nuclear fuel remain inside, fused into the floor, the walls, and the basement. To attempt cleanup, the Soviet government deployed over six hundred thousand workers. They were called liquidators. Many of them were not told what they were walking into.";

const cards = [
  {
    key: "c1",
    target: 400,
    displaySuffix: "",
    label: "HIROSHIMA BASELINE",
    statLabel: "x400",
    color: C.green,
    phrase: "400",
  },
  {
    key: "c2",
    target: 200,
    displaySuffix: "t",
    label: "NUCLEAR FUEL INSIDE",
    statLabel: "200t",
    color: C.white,
    phrase: "200",
  },
  {
    key: "c3",
    target: 600,
    displaySuffix: "K+",
    label: "WORKERS DEPLOYED",
    statLabel: "600K+",
    color: C.red,
    phrase: "600000",
  },
] as const;

export const Scene2Stats: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const frame400 = getPhraseFrames({
    phrase: "400",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: 0,
  }).from;
  const frame200 = getPhraseFrames({
    phrase: "200",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: 0,
  }).from;
  const frame600 = getPhraseFrames({
    phrase: "600000",
    transcriptData: TRASCRIPT_DATA,
    fps,
    voiceOverStartFrame: 0,
  }).from;

  const triggerByPhrase = [frame400, frame200, frame600];
  const triggerByStagger = [0, 60, 120];

  const bgOpacity = 0.22;

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Audio src={staticFile(`${ASSET_PATH}/audio/vo/ep02L_s2.wav`)} />
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/sfx/geiger_loop.wav`)}
        volume={0.25}
        loop
      />

      {/* Subtle background texture */}
      <AbsoluteFill style={{ opacity: bgOpacity }}>
        <Img
          src={staticFile(`${ASSET_PATH}/images/ep02L_s2_texture.jpeg`)}
          className="h-full w-full object-cover"
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.16) 40%, rgba(0,0,0,0.08) 100%)",
        }}
      />

      <LowerThird
        title="RADIATION OUTPUT"
        subtitle="Unit 4 Explosion · April 26, 1986"
        startFrame={0}
      />

      {/* Left panel: 3 stat cards */}
      <div className="absolute top-0 left-0 h-full w-[40%] px-10 pt-36 pb-28">
        <div className="flex h-full flex-col justify-center gap-8">
          {cards.map((card, i) => {
            const triggerFrame =
              triggerByPhrase[i] > 0 ? triggerByPhrase[i] : triggerByStagger[i];
            const localFrame = Math.max(0, frame - triggerFrame);
            const cardOpacity = interpolate(localFrame, [0, 14], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const cardY = interpolate(localFrame, [0, 20], [40, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            });
            const pop = spring({
              fps,
              frame: localFrame,
              config: { damping: 14, stiffness: 200 },
            });

            return (
              <div
                key={card.key}
                className="rounded-xl border p-6"
                style={{
                  borderColor: card.color,
                  backgroundColor: "rgba(17,17,17,0.78)",
                  backdropFilter: "blur(8px)",
                  opacity: cardOpacity,
                  transform: `translateY(${cardY}px) scale(${interpolate(pop, [0, 1], [0.96, 1])})`,
                }}
              >
                <div className="mb-2 text-sm tracking-[0.16em] text-white/70">
                  {card.label}
                </div>
                <div className="leading-none">
                  <DataTicker
                    to={card.target}
                    startFrame={triggerFrame}
                    duration={36}
                    suffix={card.displaySuffix}
                    fontSize={78}
                    color={card.color}
                  />
                </div>
                <div
                  className="font-inter mt-2 text-3xl font-semibold"
                  style={{ color: card.color }}
                >
                  {card.statLabel}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right panel: kinetic VO text */}
      <div className="absolute top-0 right-0 h-full w-[60%] px-14 pt-36 pb-28">
        <div className="rounded-xl border border-white/20 bg-black/35 p-8 backdrop-blur-[2px]">
          <KineticText
            text={KINETIC_TEXT}
            startFrame={0}
            fontSize={28}
            color={C.white}
            staggerFrames={2}
          />
        </div>
      </div>

      <YouTubeCaptions
        transcript={TRASCRIPT_DATA}
        highlightedWords={["400", "200", "600000", "liquidators"]}
        position="bottom-center"
        startFrame={0}
        mode="sentence"
      />

      <AnimatedBanner
        items={[
          "HIROSHIMA × 400",
          "200T FUEL STILL INSIDE",
          "600,000 WORKERS DEPLOYED",
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
