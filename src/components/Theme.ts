// Theme.ts — Centralized design tokens (OKLCH)

/**
 * Modern Mars Science Explainer Theme (OKLCH colors, typog, motion)
 */
export const theme = {
  colors: {
    deepSpacePurple: "oklch(33% 0.09 300)", // background/planets
    marsPlum:        "oklch(50% 0.12 320)", // accent
    boneWhite:       "oklch(98% 0.01 105)", // background/canvas
    slateGray:       "oklch(27% 0.02 270)", // text/shadows
    blueAccent:      "oklch(73% 0.19 257)", // data/highlight
    coralAccent:     "oklch(75% 0.17 22)",  // highlight/alert
  },
  typography: {
    fontFamily: `Inter, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif`,
    fontWeightBold: 700,
    fontWeightRegular: 400,
    baseSize: 48, // px
    headingSize: 96, // px
    smallSize: 28,
    lineHeight: 1.18
  },
  spacing: {
    xs: 16,
    sm: 32,
    md: 64,
    lg: 120,
    xl: 200,
  },
  motion: {
    duration: {
      short: 0.4,
      medium: 1.2,
      long: 2.0
    },
    easing: {
      inOut: "cubic-bezier(0.77,0,0.18,1)",
      in: "cubic-bezier(0.47,0,0.745,0.715)",
      out: "cubic-bezier(0.39,0.575,0.565,1)",
    }
  }
}
