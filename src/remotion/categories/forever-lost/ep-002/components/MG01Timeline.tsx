import React from "react";
import {
  AbsoluteFill,
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

// Data from the MD
const TIMELINE_EVENTS = [
  { year: "Apr 26 1986", event: ["Explosion"] },
  { year: "May 1986", event: ["First sarcophagus built"] },
  { year: "1990", event: ["Liquidator program ends"] },
  { year: "1991", event: ["USSR collapses,", "funding stops"] }, // Also broke this one for better spacing
  { year: "2000", event: ["Reactor finally shut down"] },
  { year: "2016", event: ["New Safe Confinement", "completed"] }, // And this one
  { year: "2065", event: ["NSC estimated", "lifespan ends"] }, // And this one
  { year: "24,000 AD", event: ["Plutonium-239", "half-life point"] }, // <--- BROKEN INTO TWO LINES
];

// SVG Dimensions for the line
const LINE_Y = 300;
const LINE_START_X = 120;
const LINE_END_X = 1800;
const TOTAL_LINE_LENGTH = LINE_END_X - LINE_START_X;

export const MG01Timeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 1. Panel slide up (Frame 0-20)
  const panelTranslateY = interpolate(frame, [0, 20], [1080, 0], {
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // 2. Title letter-by-letter (Frame 20-30)
  const titleProgress = interpolate(frame, [20, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleText = "CHERNOBYL: A TIMELINE".slice(
    0,
    Math.floor(titleProgress * "CHERNOBYL: A TIMELINE".length),
  );

  // 3. Timeline line draw progress (Frame 30-150, taking 120 frames)
  const lineProgress = interpolate(frame, [30, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.linear,
  });

  // Calculate the X position of the drawing line's tip
  const currentLineTipX = LINE_START_X + TOTAL_LINE_LENGTH * lineProgress;

  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>
      <Audio
        src={staticFile(`${ASSET_PATH}/audio/sfx/whoosh_data.wav`)}
        volume={0.5}
      />

      {/* Scrolling Red Banner at Bottom */}
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

      {/* Main Sliding Panel */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 44, // Leave space for banner
          background: C.panel,
          transform: `translateY(${panelTranslateY}px)`,
        }}
      >
        {/* Title */}
        <div
          className="font-bebas text-7xl"
          style={{
            position: "absolute",
            top: 60,
            left: 100,
            color: C.white,
            letterSpacing: 4,
          }}
        >
          {titleText}
        </div>

        {/* SVG Timeline Area */}
        <svg
          viewBox={`0 0 1920 600`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          {/* The Drawing Green Line */}
          <line
            x1={LINE_START_X}
            y1={300} // Centered vertically
            x2={currentLineTipX}
            y2={300}
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
                {/* Vertical Tick Mark */}
                <line
                  x1={eventX}
                  y1={LINE_Y}
                  x2={eventX}
                  y2={LINE_Y + 40 * tickPop * tickDirection}
                  stroke={C.white}
                  strokeWidth={2}
                />

                {/* Events positioned ABOVE the line */}
                {isEven && (
                  <>
                    {/* Event Label */}
                    <text
                      x={eventX}
                      y={LINE_Y - 80}
                      textAnchor="middle"
                      fill={isGlitchEvent ? C.red : C.white}
                      className="font-sans text-2xl font-bold"
                    >
                      {evt.event.map((line: string, idx: number) => (
                        <tspan
                          key={idx}
                          x={eventX}
                          dy={idx === 0 ? 0 : 24} // Moves next line down by 24px
                        >
                          {line}
                        </tspan>
                      ))}
                    </text>

                    {/* Date */}
                    <text
                      x={eventX}
                      y={LINE_Y - 110} // Moved up slightly to make room for 2 lines
                      textAnchor="middle"
                      fill={C.green}
                      className="font-mono text-xl"
                    >
                      {evt.year}
                    </text>
                  </>
                )}

                {/* Events positioned BELOW the line */}
                {!isEven && (
                  <>
                    {/* Date */}
                    <text
                      x={eventX}
                      y={LINE_Y + 75}
                      textAnchor="middle"
                      fill={C.green}
                      className="font-mono text-xl"
                    >
                      {evt.year}
                    </text>

                    {/* Event Label */}
                    <text
                      x={eventX}
                      y={LINE_Y + 100}
                      textAnchor="middle"
                      fill={isGlitchEvent ? C.red : C.white}
                      className="font-sans text-2xl font-bold"
                    >
                      {evt.event.map((line: string, idx: number) => (
                        <tspan
                          key={idx}
                          x={eventX}
                          dy={idx === 0 ? 0 : 24} // Moves next line down by 24px
                        >
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
