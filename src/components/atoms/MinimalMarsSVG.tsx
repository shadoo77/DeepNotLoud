import React from "react";
import { theme } from "../Theme";

// A minimal Mars planet SVG component using theme colors
type MinimalMarsSVGProps = {
  size?: number;
};

export const MinimalMarsSVG: React.FC<MinimalMarsSVGProps> = ({ size = 480 }) => (
  <svg
    width={size}
    height={size}
    viewBox={`0 0 ${size} ${size}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ display: "block" }}
    aria-label="Mars shape"
  >
    <circle
      cx={size / 2}
      cy={size / 2}
      r={size / 2 - size * 0.04}
      fill={theme.colors.deepSpacePurple}
      stroke={theme.colors.marsPlum}
      strokeWidth={size * 0.08}
    />
    {/* Accent highlight arc, kinetic accent */}
    <path
      d={`M${size * 0.7},${size * 0.22} A${size * 0.32},${size * 0.32} 0 0 1 ${size * 0.82},${size * 0.6}`}
      stroke={theme.colors.coralAccent}
      strokeWidth={size * 0.04}
      fill="none"
      strokeLinecap="round"
    />
  </svg>
);
