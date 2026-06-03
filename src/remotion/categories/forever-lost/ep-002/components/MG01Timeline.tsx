import React from "react";
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
import { C, ASSET_PATH } from "../constants";
import { AnimatedBanner } from "../components/AnimatedBanner";

// ─── DATA ─────────────────────────────────────────────
const TIMELINE_EVENTS = [
  { year: "Apr 26 1986", event: ["Explosion"] },
  { year: "May 1986", event: ["First sarcophagus built"] },
  { year: "1990", event: ["Liquidator program ends"] },
  { year: "1991", event: ["USSR collapses,", "funding stops"] },
  { year: "2000", event: ["Reactor finally shut down"] },
  { year: "2016", event: ["New Safe Confinement", "completed"] },
  { year: "2065", event: ["NSC estimated", "lifespan ends"] },
  { year: "24,000 AD", event: ["Plutonium-239", "half-life point"] },
];

const LINE_Y = 420;
const LINE_START_X = 120;
const LINE_END_X = 1800;
const TOTAL_LINE_LENGTH = LINE_END_X - LINE_START_X;

// ─── COMPONENT ──────────────────────────────────────────
export const MG01Timeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // 1. Panel slide up (Frame 0–20)
  const panelTranslateY = interpolate(frame, [0, 20], [1080, 0], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // 2. Title letter-by-letter (Frame 20–30)
  const titleProgress = interpolate(frame, [20, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleText = "CHERNOBYL: A TIMELINE".slice(
    0,
    Math.floor(titleProgress * "CHERNOBYL: A TIMELINE".length),
  );

  // 3. Timeline line draw (Frame 30–150)
  const lineProgress = interpolate(frame, [30, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.linear,
  });
  const currentLineTipX = LINE_START_X + TOTAL_LINE_LENGTH * lineProgress;

  // 4. Bridge title fade (Frame 0–40)
  const bridgeOpacity = interpolate(frame, [0, 20, 35, 45], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade to black: last 30 frames
  const fadeToBlack = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      {/* ─── AUDIO BRIDGE ─── */}
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/sfx/whoosh_data.mp3`)}
        volume={0.5}
      />
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/sfx/geiger_loop.mp3`)}
        volume={0.08}
        loop
      />
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/sfx/radiation_hum.mp3`)}
        volume={0.12}
        loop
      />

      <AbsoluteFill style={{ backgroundColor: C.bg }}>
        {/* ... all your existing content ... */}

        {/* DISSOLVE TO BLACK — last 30 frames */}
        <AbsoluteFill
          style={{
            backgroundColor: C.bg,
            opacity: fadeToBlack,
            pointerEvents: "none",
            zIndex: 100,
          }}
        />
      </AbsoluteFill>

      {/* ─── VISUAL BRIDGE: Scene 1 image at 12% opacity ─── */}
      <AbsoluteFill style={{ opacity: 0.8 }}>
        <Img
          src={staticFile(`${ASSET_PATH}/images/ep02L_s1_aerial.jpeg`)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </AbsoluteFill>

      {/* ─── SCROLLING RED BANNER ─── */}
      <AnimatedBanner
        items={[
          "600,000 WORKERS",
          "$1.5 BILLION",
          "200 TONNES FUEL",
          "30KM EXCLUSION ZONE",
        ]}
        bgColor={C.red}
        position="bottom"
      />

      {/* ─── BRIDGE TITLE: Handoff text ─── */}
      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          textAlign: "center",
          opacity: bridgeOpacity,
          zIndex: 10,
        }}
      >
        <span
          className="font-bebas"
          style={{
            fontSize: 28,
            color: C.green,
            letterSpacing: 4,
          }}
        >
          THE AFTERMATH, YEAR BY YEAR
        </span>
      </div>

      {/* ─── MAIN SLIDING PANEL ─── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 44, // Space for banner
          background: "rgba(17,17,17,0.88)", // Slightly lighter to let image bleed
          transform: `translateY(${panelTranslateY}px)`,
        }}
      >
        {/* Title */}
        <div
          className="font-bebas"
          style={{
            position: "absolute",
            top: 60,
            left: 100,
            fontSize: 72,
            color: C.white,
            letterSpacing: 4,
          }}
        >
          {titleText}
        </div>

        {/* SVG Timeline */}
        <svg
          viewBox="0 0 1920 600"
          style={{
            position: "absolute",
            top: 120,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          {/* Drawing green line */}
          <line
            x1={LINE_START_X}
            y1={LINE_Y}
            x2={currentLineTipX}
            y2={LINE_Y}
            stroke={C.green}
            strokeWidth={4}
          />

          {TIMELINE_EVENTS.map((evt, i) => {
            const eventX =
              LINE_START_X +
              (i / (TIMELINE_EVENTS.length - 1)) * TOTAL_LINE_LENGTH;

            const eventStartFrame = 60 + i * 25;

            const tickPop = spring({
              fps,
              frame: frame - eventStartFrame,
              config: { damping: 12, stiffness: 200 },
              durationInFrames: 20,
            });

            const textOpacity = interpolate(
              frame,
              [eventStartFrame, eventStartFrame + 15],
              [0, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            );

            if (currentLineTipX < eventX) return null;

            const isGlitchEvent = evt.year === "24,000 AD" && frame >= 240;
            const glitchOpacity = isGlitchEvent
              ? Math.sin(frame * 0.5) * 0.3 + 0.7
              : 1;

            const isEven = i % 2 === 0;
            const tickDirection = isEven ? -1 : 1;

            return (
              <g key={i} opacity={textOpacity * glitchOpacity}>
                {/* Vertical tick */}
                <line
                  x1={eventX}
                  y1={LINE_Y}
                  x2={eventX}
                  y2={LINE_Y + 40 * tickPop * tickDirection}
                  stroke={C.white}
                  strokeWidth={2}
                />

                {/* ABOVE line */}
                {isEven && (
                  <>
                    <text
                      x={eventX}
                      y={LINE_Y - 80}
                      textAnchor="middle"
                      fill={isGlitchEvent ? C.red : C.white}
                      style={{
                        fontFamily: "Inter",
                        fontSize: 22,
                        fontWeight: 700,
                      }}
                    >
                      {evt.event.map((line, idx) => (
                        <tspan key={idx} x={eventX} dy={idx === 0 ? 0 : 26}>
                          {line}
                        </tspan>
                      ))}
                    </text>
                    <text
                      x={eventX}
                      y={LINE_Y - 115}
                      textAnchor="middle"
                      fill={C.green}
                      style={{ fontFamily: "JetBrains Mono", fontSize: 18 }}
                    >
                      {evt.year}
                    </text>
                  </>
                )}

                {/* BELOW line */}
                {!isEven && (
                  <>
                    <text
                      x={eventX}
                      y={LINE_Y + 80}
                      textAnchor="middle"
                      fill={C.green}
                      style={{ fontFamily: "JetBrains Mono", fontSize: 18 }}
                    >
                      {evt.year}
                    </text>
                    <text
                      x={eventX}
                      y={LINE_Y + 105}
                      textAnchor="middle"
                      fill={isGlitchEvent ? C.red : C.white}
                      style={{
                        fontFamily: "Inter",
                        fontSize: 22,
                        fontWeight: 700,
                      }}
                    >
                      {evt.event.map((line, idx) => (
                        <tspan key={idx} x={eventX} dy={idx === 0 ? 0 : 26}>
                          {line}
                        </tspan>
                      ))}
                    </text>
                  </>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
