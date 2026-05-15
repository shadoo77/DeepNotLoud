import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  Sequence,
  Img,
  staticFile,
  interpolate,
} from "remotion";
import { Audio } from "@remotion/media";
import { Captions } from "@/components/atoms/Captions";
import { CountUp } from "@/components/atoms/CountUp";
import transcriptData from "./transcript_scene1.json";
import { BurjKhalifaSVG, EiffelTowerSVG } from "@/components/atoms/SvgIcons";

const ASSET = "assets/forever-lost/ep-002";

// Helper to find when a specific word happens in the Whisper JSON
const getWordFrame = (wordToFind: string, fps: number) => {
  const word = transcriptData.find((w) =>
    w.text.toLowerCase().includes(wordToFind.toLowerCase()),
  );
  return word ? Math.round((word.startMs / 1000) * fps) : 0;
};

export const Scene1_Scale: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // --- ANIMATIONS ---

  // 3D Perspective rotation for the wireframe
  const wireframeRotateY = interpolate(frame, [0, fps * 75], [5, -5]);
  const wireframeZoom = interpolate(frame, [0, fps * 75], [1, 1.1]);

  // Buildings dropping in (staggered spring)
  const dropIn = (delay: number) =>
    spring({ frame, fps, config: { damping: 12, stiffness: 100 }, delay });

  // Badge pop-in scale
  const badgeScale = (triggerFrame: number) =>
    spring({
      frame: frame - triggerFrame,
      fps,
      config: { damping: 10, stiffness: 200 },
    });

  // Find key frames from VO for visual triggers
  const frame3800 = getWordFrame("3,800", fps);
  const frame380atm = getWordFrame("380", fps); // "380 atmospheres"
  const frame385kg = getWordFrame("385", fps);

  const highlightedWords = ["3,800", "380", "385", "every single"];

  return (
    <AbsoluteFill style={{ backgroundColor: "var(--color-deepNavy)" }}>
      {/* ====== BACKGROUND LAYERS ====== */}
      <AbsoluteFill>
        <Img
          // Note the exact filename match here
          src={staticFile(`${ASSET}/images/img_depth_ocean_gradien.jpeg`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.6, // Keep it subtle so it doesn't overpower the data
          }}
        />
      </AbsoluteFill>

      {/* ====== SPLIT LAYOUT ====== */}
      <AbsoluteFill style={{ display: "flex", flexDirection: "row" }}>
        {/* --- LEFT SIDE: Blueprint --- */}
        <div
          style={{
            width: "50%",
            height: "100%",
            position: "relative",
            overflow: "hidden",
            // Add CSS perspective for 3D effect
            perspective: "1000px",
          }}
        >
          <Img
            src={staticFile(`${ASSET}/images/img_titanic_crosssection.jpeg`)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              opacity: 0.9,
              // 3D sinking & scanning animation
              transform: `
                translateY(${interpolate(frame, [0, fps * 75], [0, 50])}px) 
                scale(${wireframeZoom}) 
                rotateY(${wireframeRotateY}deg)
              `,
            }}
          />

          {/* Optional: Add a scanning line over the wireframe for extra sci-fi feel */}
          <div
            style={{
              position: "absolute",
              top: `${interpolate(frame, [0, fps * 5], [0, 100])}%`,
              left: 0,
              width: "100%",
              height: 2,
              backgroundColor: "var(--color-biolumTeal)",
              boxShadow: `0 0 15px 5px var(--color-biolumTeal)`,
              opacity: 0.8,
            }}
          />
        </div>

        {/* --- RIGHT SIDE: Coded Depth Ruler --- */}
        <div
          style={{
            width: "50%",
            height: "100%",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 80,
            paddingBottom: 100,
          }}
        >
          {/* The Main Ruler Line (Grows downward) */}
          <div
            style={{
              position: "absolute",
              top: 80,
              bottom: 100,
              width: 2,
              backgroundColor: "var(--color-surfaceWhite)",
              opacity: 0.2,
            }}
          >
            <div
              style={{
                width: "100%",
                height: `${interpolate(frame, [0, fps * 10], [0, 100])}%`,
                backgroundColor: "var(--color-biolumTeal)",
                opacity: 0.5,
                boxShadow: `0 0 10px var(--color-biolumTeal)`,
              }}
            />
          </div>

          {/* Depth Markers (500m intervals) */}
          {[500, 1000, 1500, 2000, 2500, 3000, 3500].map((depth) => {
            // Calculate when the ruler line reaches this depth
            const markerFrame = Math.round((depth / 3800) * fps * 10);
            const isVisible = frame >= markerFrame;

            return (
              <div
                key={depth}
                style={{
                  position: "absolute",
                  top: `${80 + (depth / 3800) * (1080 - 180)}px`,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  alignItems: "center",
                  opacity: isVisible ? 1 : 0,
                  transition: "opacity 0.3s",
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 2,
                    backgroundColor: "var(--color-surfaceWhite)",
                    opacity: 0.5,
                  }}
                />
                <span
                  style={{
                    marginLeft: 10,
                    fontFamily: "monospace",
                    color: "var(--color-steelGrey)",
                    fontSize: 14,
                    whiteSpace: "nowrap",
                  }}
                >
                  {depth}m
                </span>
              </div>
            );
          })}

          {/* The Hero CountUp (3800m) */}
          <div
            style={{
              position: "absolute",
              top: "10%",
              textAlign: "center",
              zIndex: 10,
            }}
          >
            <CountUp
              to={3800}
              durationInFrames={fps * 4}
              delay={frame3800}
              fontSize={100}
              suffix="m"
            />
            <div
              style={{
                color: "var(--color-steelGrey)",
                fontSize: 24,
                marginTop: 10,
              }}
            >
              Below Sea Level
            </div>
          </div>

          {/* --- THE BUILDINGS --- */}

          {/* Eiffel Tower Drop-in */}
          <div
            style={{
              position: "absolute",
              bottom: 100,
              left: "25%",
              height: "12%", // Scaled to ~330m proportionally
              width: 40,
              transform: `translateY(${interpolate(
                dropIn(getWordFrame("eiffel", fps)), // Triggers when VO says "Eiffel"
                [0, 1],
                [-500, 0],
              )}px)`,
              opacity: dropIn(getWordFrame("eiffel", fps)) > 0 ? 1 : 0,
            }}
          >
            <EiffelTowerSVG />
          </div>

          {/* Burj Khalifa Drop-in */}
          <div
            style={{
              position: "absolute",
              bottom: 100,
              left: "55%",
              height: "30%", // Scaled to ~828m proportionally
              width: 40,
              transform: `translateY(${interpolate(
                dropIn(getWordFrame("khalifa", fps)), // Triggers when VO says "Khalifa"
                [0, 1],
                [-600, 0],
              )}px)`,
              opacity: dropIn(getWordFrame("khalifa", fps)) > 0 ? 1 : 0,
            }}
          >
            <BurjKhalifaSVG />
          </div>
        </div>
      </AbsoluteFill>

      {/* ====== FLOATING DATA BADGES ====== */}

      {/* 380 Atmospheres Badge */}
      {frame380atm > 0 && (
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "5%",
            backgroundColor: "oklch(0.22 0.04 260 / 0.8)",
            backdropFilter: "blur(12px)",
            border: `1px solid var(--color-oceanBlue)`,
            borderRadius: 12,
            padding: 20,
            transform: `scale(${badgeScale(frame380atm)})`,
          }}
        >
          <div
            style={{
              color: "var(--color-biolumTeal)",
              fontSize: 48,
              fontFamily: "monospace",
              fontWeight: "bold",
            }}
          >
            380 ATM
          </div>
          <div style={{ color: "var(--color-surfaceWhite)", fontSize: 16 }}>
            Water Pressure
          </div>
        </div>
      )}

      {/* 385 kg/cm2 Badge */}
      {frame385kg > 0 && (
        <div
          style={{
            position: "absolute",
            bottom: "25%",
            left: "5%",
            backgroundColor: "oklch(0.22 0.04 260 / 0.8)",
            backdropFilter: "blur(12px)",
            border: `1px solid var(--color-rustOrange)`,
            borderRadius: 12,
            padding: 20,
            transform: `scale(${badgeScale(frame385kg)})`,
          }}
        >
          <div
            style={{
              color: "var(--color-rustOrange)",
              fontSize: 48,
              fontFamily: "monospace",
              fontWeight: "bold",
            }}
          >
            385 KG
          </div>
          <div style={{ color: "var(--color-surfaceWhite)", fontSize: 16 }}>
            Per Square Centimeter
          </div>
        </div>
      )}

      {/* ====== AUDIO LAYERS ====== */}
      <Audio
        src={staticFile(`${ASSET}/voices/bgm/bgm_scene1_drone.mp3`)}
        volume={0.2}
      />
      <Audio
        src={staticFile(`${ASSET}/voices/sfx/sfx_pressure_groan_2.wav`)}
        volume={0.15}
      />

      {/* Sonar Ping timed with CountUp milestones */}
      <Sequence from={fps * 1}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_sonar_ping.wav`)}
          volume={0.4}
        />
      </Sequence>
      <Sequence from={fps * 2}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_sonar_ping.wav`)}
          volume={0.4}
        />
      </Sequence>
      <Sequence from={fps * 3}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_sonar_ping.wav`)}
          volume={0.4}
        />
      </Sequence>
      <Sequence from={fps * 4}>
        <Audio
          src={staticFile(`${ASSET}/voices/sfx/sfx_sonar_ping.wav`)}
          volume={0.5}
        />
      </Sequence>

      {/* Voiceover */}
      <Audio
        src={staticFile(`${ASSET}/voices/vo/vo_scene1.wav`)}
        volume={0.8}
      />

      {/* ====== CAPTIONS ====== */}
      <Captions
        transcript={transcriptData}
        highlightedWords={highlightedWords}
        position="bottom-left"
        theme={theme}
      />
    </AbsoluteFill>
  );
};
