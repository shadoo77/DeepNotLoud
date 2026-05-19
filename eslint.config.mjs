import { config } from "@remotion/eslint-config-flat";

export default [
  ...config,
  {
    rules: {
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
    },
  },
];
